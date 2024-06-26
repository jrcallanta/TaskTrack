export interface TaskType {
    id?: string;
    title?: string;
    startTime: Date;
    endTime: Date | null;
    elapsedTime: number | null;
}
