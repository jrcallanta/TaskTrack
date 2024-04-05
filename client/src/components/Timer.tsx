import { useCallback, useEffect, useReducer, useState } from "react";
import TimerButton from "./TimerButton";
import { useCountDown } from "../util/custom-hooks";

interface Props {
    className?: string;
    onStartTask: (args: { startTime: Date; endTime: Date | null }) => void;
    onStopTask: (args: { startTime: Date; endTime: Date }) => void;
}

enum TaskState {
    "RUNNING",
    "STOPPED",
}

type ReducerState = {
    taskStartTime: Date | null;
    taskState: TaskState;
};

const Timer: React.FC<Props> = ({ className, onStartTask, onStopTask }) => {
    useCountDown();

    const [state, dispatch] = useReducer(
        (prev: ReducerState, action: { type: string }): ReducerState => {
            switch (action.type) {
                case "START_TASK": {
                    const start = new Date();
                    onStartTask({ startTime: start, endTime: null });
                    return {
                        taskStartTime: start,
                        taskState: TaskState.RUNNING,
                    };
                }
                case "STOP_TASK": {
                    if (prev.taskStartTime) {
                        const end = new Date();
                        onStopTask({
                            startTime: prev.taskStartTime,
                            endTime: end,
                        });
                        return {
                            taskStartTime: null,
                            taskState: TaskState.STOPPED,
                        };
                    }
                }
                case "START_NEXT_TASK": {
                    if (prev.taskStartTime) {
                        const end = new Date();
                        onStopTask({
                            startTime: prev.taskStartTime,
                            endTime: end,
                        });
                        onStartTask({ startTime: end, endTime: null });
                        return {
                            taskStartTime: end,
                            taskState: TaskState.RUNNING,
                        };
                    }
                }
                default: {
                }
            }

            return { ...state };
        },
        {
            taskStartTime: null,
            taskState: TaskState.STOPPED,
        }
    );

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
                            state.taskState == TaskState.RUNNING
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
                <TimerButton
                    onClick={
                        state.taskState == TaskState.STOPPED
                            ? () => dispatch({ type: "START_TASK" })
                            : () => dispatch({ type: "START_NEXT_TASK" })
                    }
                >
                    {state.taskState != TaskState.RUNNING ? "start" : "next"}
                </TimerButton>
                <TimerButton onClick={() => dispatch({ type: "STOP_TASK" })}>
                    stop
                </TimerButton>
            </div>
        </div>
    );
};

export default Timer;
