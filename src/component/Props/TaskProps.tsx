
export default interface TaskProps {
    id: number,
    name: string,
    description: string,
    projectId: number | null,
    project: string,
    date: string,
    totalTime: number,
    status: 'Not Started' | 'Started' | 'Complete' | 'Deleted',
};