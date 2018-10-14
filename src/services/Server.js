const mysql = require('mysql');

class Server {
    constructor() {
        this.dbConnection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'registrar',
            password: 'password123',
        });
    }

    connect() {
        this.dbConnection.connect(err => {
            if (err) {
                console.log('Error connecting to Db');
                return;
            }
            console.log('Connection established');
        });
    }

    executeQuery(sql) {
        return new Promise((resolve, reject) => {
            this.dbConnection.query(sql, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    end() {
        this.dbConnection.end(err => {
            // The connection is terminated gracefully
            // Ensures all previously enqueued queries are still
            // before sending a COM_QUIT packet to the MySQL server.
        });
    }
}

module.exports = Server;