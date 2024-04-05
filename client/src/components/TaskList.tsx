import { useEffect, useState } from "react";
import type { TaskType } from "../util/types";
import { convert } from "../util/tools";
interface Options {
    showTaskNumber: boolean | false;
}

interface Props {
    tasks: TaskType[];
    options?: Options;
    className?: string;
}

const TaskList: React.FC<Props> = ({ tasks, options, className }) => {
    const MIN_CONV = 1000 * 60 * 60;

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        setSelectedIndex(tasks.length - 1);
    }, [tasks]);

    return (
        <div
            className={
                "w-full overflow-auto bg-grey-dark pb-16" +
                `${className ? " " + className : ""}`
            }
        >
            <table
                className={
                    "relative w-full table-auto cursor-pointer" +
                    " [&_:is(th,td)]:px-4 [&_:is(th,td)]:text-left [&_:is(th,td)]:whitespace-nowrap"
                }
            >
                <thead className='sticky top-0 bg-grey-dark [&_th]:py-4'>
                    <tr
                        className={`
                        text-grey-light text-xs lg:text-base font-extrabold 
                        bg-grey-light bg-opacity-0 even:bg-opacity-[.08] 
                        hover:bg-opacity-20 hover:text-white`}
                    >
                        {options?.showTaskNumber && (
                            <th className='w-fit'>#</th>
                        )}
                        <th className='w-1/2'>Task</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Elasped Time</th>
                    </tr>
                </thead>
                <tbody className='overflow-y-auto bg-grey-dark [&_td]:py-2 [&_td]:text-ellipsis '>
                    {tasks.map(
                        ({ startTime, endTime, elapsedTime, title, id }, i) => {
                            let elapsed = "N/A",
                                end = "N/A",
                                start = new Date(startTime).toLocaleTimeString(
                                    "en-us",
                                    {
                                        timeStyle: "medium",
                                    }
                                );

                            if (elapsedTime && endTime) {
                                const [hrs, mins] = convert(elapsedTime);

                                end = new Date(endTime).toLocaleTimeString(
                                    "en-us",
                                    { timeStyle: "medium" }
                                );
                                elapsed = `${hrs} hr`;
                                if (mins) elapsed += ` ${mins} m`;
                            }

                            return (
                                <tr
                                    key={id || i}
                                    onClick={() => setSelectedIndex(i)}
                                    className={`
                                text-grey-light text-xs lg:text-base font-normal 
                                bg-grey-light bg-opacity-0 even:bg-opacity-[.08] 
                                hover:bg-opacity-20 hover:text-white 
                                ${
                                    selectedIndex == i
                                        ? "bg-opacity-20 text-white"
                                        : ""
                                }`}
                                >
                                    {options?.showTaskNumber && (
                                        <td>{i + 1}</td>
                                    )}
                                    <td className='max-w-12 overflow-hidden'>
                                        {title}
                                    </td>
                                    <td>{start}</td>
                                    <td>{end}</td>
                                    <td>{elapsed}</td>
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
