import { Rollbar } from './services/Rollbar';
import { SimpleTxtLogger } from 'simple-txt-logger';
import { HelperService } from './services/HelperService';
import { Database } from './services/Database';
import express, { Express, Router, RequestHandler } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import session from "express-session";
import cookieParser from "cookie-parser";
import { SocketsServer } from './SocketsServer';

declare module 'express-session' {
    interface SessionData {
        //username: { [key: string]: any };
        username: string | null;
        password: string | null;
        uid: string | null;
        loggedin: boolean;
    }
}

export class ServerSetup {

    static appName = 'Chatroom';
    private port: string;
    private hostname: string;

    private sessionMiddleware: RequestHandler;
    private server: http.Server;
    protected router: Router;
    private app: Express;
    private socketServer: SocketsServer
    protected db: Database;

    protected txtLogger: SimpleTxtLogger;
    protected rollbarLogger: Rollbar;

    protected constructor(port = '3030', hostname = '127.0.0.1') {
        dotenv.config();

        this.port = process.env['PORT'] || port;
        this.hostname = process.env['HOSTNAME'] || hostname;

        this.txtLogger = new SimpleTxtLogger(HelperService.newDateTime(), 'Server', ServerSetup.appName);
        this.rollbarLogger = new Rollbar(this.txtLogger, ServerSetup.appName);

        this.txtLogger.writeToLogFile('...::SERVER-SIDE APPLICATION STARTING::...');

        this.sessionMiddleware = session({
            //store: new FileStore(), //store some session data in a db?
            cookie: {
                maxAge: 36000000,
                httpOnly: false
              },
            secret: process.env['SESSION_SECRET'] || 'Error: No session secret set in .env file.',
            saveUninitialized: true,
            resave: true
        });

        this.router = express.Router();
        this.app = express();
        this.server = new http.Server(this.app);
        this.socketServer = new SocketsServer(this.server, this.sessionMiddleware);
        this.db = new Database(this.txtLogger, this.rollbarLogger);

        this.serverConfig();
        this.serverStart();
    }

    private serverConfig(): void {
        this.app.use(this.sessionMiddleware);

        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(express.static('public'));
        this.app.set('view engine', 'ejs');
        this.app.use("/", this.router);

        this.txtLogger.writeToLogFile('Configured Server.');
    }

    private serverStart(): void {
        this.server.listen(parseInt(this.port), this.hostname, () => this.txtLogger.writeToLogFile(`Started HTTP Server: http://${this.hostname}:${this.port}`));
    }

    public closeSocketServer(): void {
        this.socketServer.close();
    }

    // Accessor needed for testing only. So property 'this.app' can remain private.
    public appAccessor(app = this.app): Express {
        return app;
    }
}