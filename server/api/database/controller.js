// export interface TaskType {
//     id: string;
//     title: string | "Task";
//     startTime: Date;
//     endTime: Date;
//     elapsedTime: number;
// }

const task_list = [];

export const getTasks = (req, res, next) => {
    console.log("GET TASKS");

    return res.status(200).send({
        message: "ok",
        tasks: task_list,
    });
};

export const postTask = (req, res, next) => {
    console.log("POST TASKS");

    const { newTask } = req.body;
    if (!newTask.id) newTask.id = task_list.length;
    if (!newTask.title) newTask.title = `Task ${newTask.id}`;

    task_list.push(newTask);

    return res.status(200).send({
        message: "ok",
        tasks: task_list,
        newTask: newTask,
    });
};
