import type { TaskType } from "./types";

const SAMPLE_TASKS = [
    "Irure occaecat dolore id dolor.",
    "Cupidatat id dolore proident quis et consectetur",
    "Occaecat cillum non consectetur laborum amet sunt qui minim velit",
    "Labore eiusmod ullamco consectetur officia",
    "Veniam do aliqua est pariatur aute tempor",
    "Nisi non do cupidatat sit pariatur",
    "Excepteur ipsum in laborum ea proident velit anim",
];

export const genTaskSample: () => TaskType = () => {
    const start = new Date();
    const end = new Date();
    end.setTime(start.getTime() + 1000 * 60 * 60);

    return {
        id: "0",
        title: SAMPLE_TASKS[Math.floor(Math.random() * SAMPLE_TASKS.length)],
        startTime: start,
        endTime: end,
        elapsedTime: end.getTime() - start.getTime(),
    };
};

export const convert = (timeInMs: number) => {
    const MS_TO_HRS = 1000 * 60 * 60;

    let mins = Math.ceil((timeInMs % MS_TO_HRS) / (1000 * 60));
    let hours = Math.floor(timeInMs / MS_TO_HRS);

    // This is possible due to Math.ceil(mins)
    if (mins == 60) {
        mins = 0;
        hours += 1;
    }

    return [hours, mins];
};
