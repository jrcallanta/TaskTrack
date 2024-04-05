import { useCallback, useEffect, useReducer, useState } from "react";
import TimerButton from "./TimerButton";

interface Props {
    className?: string;
    recordTaskTime: (args: { startTime: Date; endTime: Date }) => void;
}

enum TaskState {
    "RUNNING",
    "STOPPED",
}

const Timer: React.FC<Props> = ({ className, recordTaskTime }) => {
    const [taskState, setTaskState] = useState(TaskState.STOPPED);
    const [taskStartTime, setTaskStartTime] = useState<Date | null>(null);

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

    const handleStartNext = useCallback(() => {
        switch (taskState) {
            case TaskState.STOPPED: {
                setTaskStartTime(new Date());
                setTaskState(TaskState.RUNNING);
                return;
            }

            case TaskState.RUNNING: {
                if (taskStartTime) {
                    recordTaskTime({
                        startTime: taskStartTime,
                        endTime: new Date(),
                    });
                    setTaskStartTime(new Date());
                }
                return;
            }

            default: {
                return;
            }
        }
    }, [taskState, taskStartTime]);

    const handleStop = useCallback(() => {
        if (taskState != TaskState.STOPPED) {
            if (taskStartTime) {
                recordTaskTime({
                    startTime: taskStartTime,
                    endTime: new Date(),
                });
            }

            setTaskStartTime(null);
            setTaskState(TaskState.STOPPED);
        }
    }, [taskState, taskStartTime]);

    return (
        <div
            className={
                "min-h-fit h-full w-full flex flex-col flex-gap justify-center items-center bg-grey-light" +
                `${className ? " " + className : ""}`
            }
        >
            <div className='grow p-4 w-full overflow-hidden flex justify-center items-center bg-grey-dark'>
                <h1
                    className={
                        "m-auto h-fit w-full flex justify-around items-center text-[6rem] lg:text-[8rem] font-urbanist transition-all " +
                        `${
                            taskState == TaskState.RUNNING
                                ? "text-neutral-200"
                                : "text-neutral-600"
                        }`
                    }
                >
                    <span id='hours' className='flex-1 text-center'></span> :
                    <span id='minutes' className='flex-1 text-center'></span> :
                    <span id='seconds' className='flex-1 text-center'></span>
                </h1>
            </div>

            <div
                id='timer-actions'
                className='h-fit w-full flex flex-gap text-grey-light text-xl lg:text-2xl '
            >
                <TimerButton onClick={handleStartNext}>
                    {taskState != TaskState.RUNNING ? "start" : "next"}
                </TimerButton>
                <TimerButton onClick={handleStop}>stop</TimerButton>
            </div>
        </div>
    );
};

export default Timer;
