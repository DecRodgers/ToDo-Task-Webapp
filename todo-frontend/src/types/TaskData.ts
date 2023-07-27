export interface TaskData {
    id?: number;    //nullable as backend handles id generation
    name: string;
    priority: number;
    status: string;
}