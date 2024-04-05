import { useCallback, useEffect, useState } from "react";
import type { TaskType } from "./types";
import { getTasks, postTask, patchTask } from "./task-conroller";

export const useCountDown = () => {
    useEffect(() => {
        let timeout: number;

        const updateTime = () => {
            let hours = document.getElementById("hours");
            let minutes = document.getElementById("minutes");
            let seconds = document.getElementById("seconds");

            if (hours && minutes && seconds) {
                if (timeout) clearTimeout(timeout);

                const now = new Date();
                const hoursVal = now.getHours().toString().padStart(2, "0");
                const minutesVal = now.getMinutes().toString().padStart(2, "0");
                const secondsVal = now.getSeconds().toString().padStart(2, "0");

                hours.innerHTML = hoursVal;
                minutes.innerHTML = minutesVal;
                seconds.innerHTML = secondsVal;
                timeout = setTimeout(updateTime, 1000);
            }
        };

        updateTime();
        return () => clearTimeout(timeout);
    }, []);
};

export const useTasks = () => {
    const [tasks, setTasks] = useState<TaskType[]>([]);

    const refreshTasks = useCallback(() => {
        getTasks()
            .then((data) => setTasks(data))
            .catch((error) => console.log(error));
    }, []);

    const startTask = useCallback(
        ({ startTime }: { startTime: Date }) => {
            const newTask: TaskType = {
                startTime: startTime,
                endTime: null,
                elapsedTime: null,
            };
            postTask(newTask)
                .then((data) => refreshTasks())
                .catch((error) => console.log(error));
        },
        [tasks]
    );

    const endTask = ({
        startTime,
        endTime,
    }: {
        startTime: Date;
        endTime: Date;
    }) => {
        const updated: TaskType = {
            startTime: startTime,
            endTime: endTime,
            elapsedTime:
                new Date(endTime).getTime() - new Date(startTime).getTime(),
        };
        patchTask(updated)
            .then((data) => refreshTasks())
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        refreshTasks();
    }, []);

    return {
        state: {
            tasks,
        },
        funcs: {
            refreshTasks,
            startTask,
            endTask,
        },
    };
};
