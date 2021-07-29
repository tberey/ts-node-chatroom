import { Rollbar } from './services/Rollbar';
import { SimpleTxtLogger } from 'simple-txt-logger';
import { HelperService } from './services/HelperService';
import express, { Express, Router } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import mysql, { Pool } from 'mysql';
import SocketIOServer from "socket.io";
import session from "express-session";

export class ServerSetup {

    protected io:SocketIOServer.Server;
    private sessionMiddleware:express.RequestHandler;

    static appName = 'Chatroom';
    private port: string;
    private hostname: string;
    private server: http.Server;
    protected router: Router;
    private app: Express;

    protected txtLogger: SimpleTxtLogger;
    protected rollbarLogger: Rollbar;

    protected dbConnection: Pool;
    //private dbTable: string;

    protected constructor(port = '3030', hostname = '127.0.0.1') {
        dotenv.config();

        this.port = process.env['PORT'] || port;
        this.hostname = process.env['HOSTNAME'] || hostname;

        this.txtLogger = new SimpleTxtLogger(HelperService.newDateTime(), 'Server', ServerSetup.appName);
        this.rollbarLogger = new Rollbar(this.txtLogger, ServerSetup.appName);

        this.txtLogger.writeToLogFile('...::SERVER-SIDE APPLICATION STARTING::...');

        this.router = express.Router();
        this.app = express();
        this.server = new http.Server(this.app);
        this.io = SocketIOServer(this.server, {'path': '/chat'}); // send to io class?

        //this.dbTable = process.env['DB_TABLE'] || 'Error: Missing Table in .env';
        this.dbConnection = mysql.createPool({
            connectionLimit: 10,
            'host': process.env['DB_HOST'],
            'user': process.env['DB_USER'],
            'password': process.env['DB_PASSWORD'],
            'database': process.env['DB_NAME']
        });

        this.sessionMiddleware = session({
            //store: new FileStore(),
            cookie: {
                maxAge: 36000000,
                httpOnly: false
              },
            secret: process.env['SESSION_SECRET'] || 'Error: No session secret set in .env file.',
            saveUninitialized: true,
            resave: true
        });

        this.serverConfig();
        this.serverStart();
    }

    private serverConfig(): void {
        // Express middleware private session data/setup.
        this.io.use((socket, next) => {
            this.sessionMiddleware(socket.request, socket.request.res, next);
        });
        this.app.use(this.sessionMiddleware);

        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.set('view engine', 'ejs');
        this.app.use("/", this.router);
        this.txtLogger.writeToLogFile('Configured Server.');
    }

    private serverStart(): void {
        this.server.listen(parseInt(this.port), this.hostname, () => this.txtLogger.writeToLogFile(`Started HTTP Server: http://${this.hostname}:${this.port}`));
    }

    // Accessor needed for testing only. So property 'this.app' can remain private.
    public appAccessor(app = this.app): Express {
        return app;
    }

    protected dbclose(): void {
        this.dbConnection.end((err) => {
            if (err) {
                this.rollbarLogger.rollbarError(err);
                this.txtLogger.writeToLogFile(`Error reported to Rollbar: ${err}`);
            }
        });
        this.txtLogger.writeToLogFile('Database Disconnected.');
    }
}