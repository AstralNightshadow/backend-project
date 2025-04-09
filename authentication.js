import express from 'express';
const router = express.Router();

// http://localhost:3000/login
router.post('/login', (request, response) => {
    if (request.body.email === "zli@example.com" && request.body.password === "m295") {
        request.session.email = request.body.email;
        return response.sendStatus(201);
    }
    return response.sendStatus(401);
});

// http://localhost:3000/verify
router.get('/verify', (request, response) => {
    if (request.session.email) {
        return response.send(`Logged in as: ${request.session.email}.`);
    }
    return response.send("Not logged in.")
});

router.delete('/logout', (request, response) => {
    request.session.destroy();
    response.sendStatus(204);
});

export default router;