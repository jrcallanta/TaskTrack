import { useCallback, useEffect, useState } from "react";
import type { TaskType } from "./types";
import { getTasks, postTask } from "./task-conroller";

export const useTasks = () => {
    const [tasks, setTasks] = useState<TaskType[]>([]);

    const refreshTasks = useCallback(() => {
        getTasks()
            .then((data) => setTasks(data))
            .catch((error) => console.log(error));
    }, []);

    const insertTask = useCallback(
        ({
            startTime,
            endTime,
            title = "New Task",
        }: {
            startTime: Date;
            endTime: Date;
            title?: string;
        }) => {
            const newTask: TaskType = {
                startTime: startTime,
                endTime: endTime,
                elapsedTime: endTime.getTime() - startTime.getTime(),
            };

            postTask(newTask)
                .then((data) => refreshTasks())
                .catch((error) => console.log(error));
        },
        [tasks]
    );

    useEffect(() => {
        refreshTasks();
    }, []);

    return {
        state: {
            tasks,
        },
        funcs: {
            refreshTasks,
            insertTask,
        },
    };
};
