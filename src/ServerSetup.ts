import { Rollbar } from './services/Rollbar';
import { SimpleTxtLogger } from 'simple-txt-logger';
import { HelperService } from './services/HelperService';
import { Database } from './services/Database';
import express, { Express, Router } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import SocketIOServer from "socket.io";
import session from "express-session";
import cookieParser from "cookie-parser";

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

    protected io: SocketIOServer.Server;
    private sessionMiddleware: express.RequestHandler;

    static appName = 'Chatroom';
    private port: string;
    private hostname: string;
    private server: http.Server;
    protected router: Router;
    private app: Express;
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

        this.router = express.Router();
        this.app = express();
        this.server = new http.Server(this.app);
        this.io = SocketIOServer(this.server, {'path': '/chat'}); // send to io class?
        this.db = new Database(this.txtLogger, this.rollbarLogger);

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

        this.serverConfig();
        this.serverStart();
    }

    private serverConfig(): void {
        // Express middleware private session data/setup.
        this.app.use(this.sessionMiddleware);
        this.io.use((socket, next) => {
            this.sessionMiddleware(socket.request, socket.request.res, next);
        });

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

    // Accessor needed for testing only. So property 'this.app' can remain private.
    public appAccessor(app = this.app): Express {
        return app;
    }
}