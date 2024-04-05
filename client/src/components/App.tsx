import React from "react";
import Timer from "./Timer";
import TaskList from "./TaskList";
import { useTasks } from "../util/custom-hooks.ts";

interface Props {}

const App: React.FC<Props> = () => {
    const {
        state: { tasks },
        funcs: { startTask, endTask },
    } = useTasks();

    return (
        <div className='h-screen w-screen flex-gap grid grid-cols-5 grid-rows-2 bg-grey-light font-poppins'>
            <div className='row-start-1 col-span-2 bg-grey-dark'></div>
            <Timer
                className='col-start-3 col-end-6'
                onStartTask={startTask}
                onStopTask={endTask}
            />
            <TaskList
                className='col-start-1 col-span-full'
                tasks={tasks}
                options={{ showTaskNumber: true }}
            />
        </div>
    );
};

export default App;
