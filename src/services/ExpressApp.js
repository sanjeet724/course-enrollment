const express = require('express');
const Server = require('./Server');

class ExpressApp {
    constructor() {
        // create the server and open the db connection
        this.server = new Server();
        this.server.connect();

        // start the rest API
        this.app = express();
        this.app.use(express.json()); // middleware
        const port = process.env.PORT || 8080;
        this.app.listen(port, () => console.log(`Listening on port ${port}...`));
        // allow CORS to test on localhost
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

    start() {
        // get the instructors
        this.app.get('/api/instructors', (req, res) => {
            const sql = 'select * from instructors';
            return this.server.executeQuery(sql).
                then(succ => {
                    console.log("Data received from dB");
                    res.send(succ);
                }).
                catch(err => {
                    res.status(400).send(err.code);
                });
        });

        // get an instructor by their name
        this.app.get('/api/instructors/:name', (req, res) => {
            const query = req.params.name;
            const sql = `select * from instructors where lower(instructors.name) like '%${query}%'`;
            return this.server.executeQuery(sql).
                then(succ => {
                    res.send(succ);
                }).
                catch(err => {
                    res.status(400).send(err.code);
                });
        });

        // get the students
        this.app.get('/api/students', (req, res) => {
            const sql = 'select * from students';
            return this.server.executeQuery(sql).
                then(succ => {
                    console.log("Data received from dB");
                    res.send(succ);
                }).
                catch(err => {
                    res.status(400).send(err.code);
                });
        });

        // get a student by their name
        this.app.get('/api/students/:name', (req, res) => {
            const query = req.params.name;
            const sql = `select * from students where lower(students.name) like '%${query}%'`;
            return this.server.executeQuery(sql).
                then(succ => {
                    res.send(succ);
                }).
                catch(err => {
                    res.status(400).send(err.code);
                });
        });
    }
}

module.exports = ExpressApp;