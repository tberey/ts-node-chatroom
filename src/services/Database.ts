import { Rollbar } from './Rollbar';
import { SimpleTxtLogger } from 'simple-txt-logger';
import { HelperService } from './HelperService';
import mysql, { Pool, Query } from 'mysql';

export interface QueryReturnData extends Object {
    "Ticker_Symbol": string,
    "Tally": number
}

export class Database {

    public dbConnection: Pool;
    private dbTable: string;

    private txtLogger: SimpleTxtLogger;
    private rollbarLogger: Rollbar;

    static dbTxtLogger = new SimpleTxtLogger(HelperService.newDateTime(), 'Database', 'MySQL DB');

    constructor(txtLogger: SimpleTxtLogger, rollbarLogger: Rollbar) {
        this.txtLogger = txtLogger;
        this.rollbarLogger = rollbarLogger;

        this.dbTable = process.env['DB_TABLE'] || 'Error: Missing Table in .env';
        this.dbConnection = mysql.createPool({
            connectionLimit: 10,
            'host': process.env['DB_HOST'],
            'user': process.env['DB_USER'],
            'password': process.env['DB_PASSWORD'],
            'database': process.env['DB_NAME']
        });
        
        this.txtLogger.writeToLogFile('Configured Database.');
    }

    public close(): void {
        this.dbConnection.end((err) => {
            if (err) {
                this.rollbarLogger.rollbarError(err);
                this.txtLogger.writeToLogFile(`Error reported to Rollbar: ${err}`);
            }
        });
        this.txtLogger.writeToLogFile('Database Disconnected.');
    }

    public login(username: string): Query | number {
        const query = `SELECT * FROM ${this.dbTable} WHERE username = '${username}'`;

        return this.dbConnection.query(query, (err, results): number | Query => {

            if (err) {
                this.rollbarLogger.rollbarError(err);
                this.txtLogger.writeToLogFile(`Error reported to Rollbar: ${err}`);
                const statusCode = 500;
                return statusCode;
            }

            this.txtLogger.writeToLogFile(`DB Results: ${results}`);
            return results;
        });
    }
}