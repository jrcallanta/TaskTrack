// export interface TaskType {
//     id: string;
//     title: string | "Task";
//     startTime: Date;
//     endTime: Date;
//     elapsedTime: number;
// }

let task_id = 0;
const task_list = [];

/**
 * Get all tasks.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
 */
export const getTasks = (req, res, next) => {
    try {
        console.log("GET TASKS");
        return res.status(200).send({
            message: "ok",
            tasks: task_list,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Internal Server Error",
        });
    }
};

/**
 * Create a new task.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
 */
export const postTask = (req, res, next) => {
    try {
        console.log("POST TASK");

        if (!req.body.newTask) {
            return res.status(400).send({
                message: "Missing task data",
            });
        }

        const { newTask } = req.body;
        newTask.id = task_id++;
        if (!newTask.title) newTask.title = `Task ${newTask.id}`;

        task_list.push(newTask);

        return res.status(201).send({
            message: "ok",
            tasks: task_list,
            newTask: newTask,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Internal Server Error",
        });
    }
};

/**
 * Update an existing task.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
 */
export const patchTask = (req, res, next) => {
    try {
        console.log("PATCH TASK");

        if (!req.body.updatedTask) {
            return res.status(400).send({
                message: "Missing task data",
            });
        }

        const { updatedTask } = req.body;
        const ind = task_list.findIndex(
            (task) => task.startTime == updatedTask.startTime
        );

        if (ind === -1) {
            return res.status(404).send({
                message: "Task not found",
            });
        }

        task_list.splice(ind, 1, { ...task_list[ind], ...updatedTask });
        return res.status(200).send({
            message: "ok",
            tasks: task_list,
            updatedTask: updatedTask,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Internal Server Error",
        });
    }
};

/**
 * Delete a task by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
 */
export const deleteTask = (req, res, next) => {
    try {
        console.log("DELETE TASK");

        const { taskId } = req.params;
        const ind = task_list.findIndex((task) => task.id == taskId);

        if (ind === -1) {
            return res.status(404).send({
                message: "Task not found",
            });
        }

        task_list.splice(ind, 1);
        return res.status(200).send({
            message: "ok",
            tasks: task_list,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Internal Server Error",
        });
    }
};
