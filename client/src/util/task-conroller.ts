import type { TaskType } from "./types";

const task_list: TaskType[] = [];

export const getTasks: () => Promise<TaskType[]> = async () => {
    const data = await fetch("/api/tasks/").then((res) => res.json());
    if (!data.error) {
        try {
            const tasks: TaskType[] = data.tasks;
            return tasks;
        } catch (err) {
            return [];
        }
    }

    return [];
};

export const postTask: (newTask: TaskType) => Promise<TaskType[]> = async (
    newTask
) => {
    const data = await fetch("/api/tasks/", {
        body: JSON.stringify({ newTask: newTask }),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));

    console.log(data);

    if (!data.error) {
        try {
            const tasks: TaskType[] = data.tasks;
            return tasks;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    return [];
};
