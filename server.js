import express from 'express';
import session from 'express-session';
import authentication from './authentication.js';
import tasks from './tasks.js';

const app = express();

function isAuthenticated(request, response, next) {
    if (!request.session.email) {
        return response.sendStatus(401);
    }
    next();
}

app.use(session({ secret: "YdwhZjyZVVjRoq5ssn7Ktf2KPXhh7eAHfV3WfQvmZ", resave: false, saveUninitialized: true }));
app.use(express.json());
app.use('/', authentication);
app.use('/tasks', isAuthenticated, tasks);

const port = 3000;

app.listen(port, () => {
    console.log(`Book server on port ${port}`);
});