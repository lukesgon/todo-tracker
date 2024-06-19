import TaskProps from "./TaskProps"

export default interface ProjectProps {
    id: number,
    name: string,
    description: string,
    taskList: TaskProps[],
    totalTime: number,
    status: 'Not Started' | 'Started' | 'Complete' | 'Deleted'
};