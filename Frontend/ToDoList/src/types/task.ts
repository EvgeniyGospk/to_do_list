export interface Task {
    id: string;
    title: string;
    description: string;
    audioTrack?: string;
    completed: boolean;
}