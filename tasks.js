import express from 'express';
const router = express.Router();

let nextTaskId = 1;
let tasks = [];

router.get('/', (_request, response) => {
    response.send(tasks);
});

router.get(`/:id`, (request, response) => {
    const task = tasks.find((t) => t.id === request.params.id);
    response.send(task);
});

router.post('/', (request, response) => {
    const isValid = request.body.title && request.body.description && request.body.done && request.body.dueDate;
    if (!isValid) {
        return response.send(422);
    }
    const newTask = {
        id: nextTaskId++, // Assign current ID, then increment
        timeCreated: Date.now(),
        ...request.body
    };
    tasks = [...tasks, newTask];
    response.status(201).send(newTask);
});


router.patch(`/:id`, (request, response) => {
    if (!tasks.find((t) => t.id === request.params.id)) {
        return response.send(404);
    }
    tasks = tasks.map((t) => {
        if (t.id === request.params.id) {
            return { ...t, ...request.body };
        } else {
            return t;
        }
    });
    response.send(tasks);
});


router.delete(`/:id`, (request, response) => {
    tasks = tasks.filter((b) => b.id !== request.params.id);
    response.send(204);
});


export default router;