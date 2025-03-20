export interface ITask {
    id: number;
    title: string;
    description?: string;
    audioTrack?: string;
    isCompleted: boolean;
    userId: number;
}