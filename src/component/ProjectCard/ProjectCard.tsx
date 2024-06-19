import { ReactElement, useEffect, useState } from "react";
import ProjectProps from "../Props/ProjectProps";
import TaskCard from "../TaskCard/TaskCard";
import TaskProps from "../Props/TaskProps";
import SettingsButton from "../Button/SettingsButton";
import { createPortal } from "react-dom";
import ProjectEditor from "../ProjectEditor/ProjectEditor";
import AddButton from "../Button/AddButton";
import CreateTask from "../CreateTask/CreateTask";
import './ProjectCard.css';

interface ProjectCardProps {
    className?: string,
    id?: string,
    details: ProjectProps,
    onChange: (object:ProjectProps)=> void,
    date: string | null,
};

const ProjectCard = ({ className, id, details, onChange, date }:ProjectCardProps)=> {
    const [dateRef, setDateRef] = useState(date);
    const [projectDetails, setProjectDetails] = useState(details);
    const [taskComponent, setTaskComponent] = useState<ReactElement[]>([]);
    const [completeTaskList, setCompleteTaskList] = useState<TaskProps[]>();
    const [completeTaskComponent, setCompleteTaskComponent] = useState<ReactElement[]>([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isCreate, setIsCreate] = useState(false);

    useEffect(()=> {
        setProjectDetails(prevState => (
            {
                ...prevState,
                totalTime: calculateTime(),
            }
        ))
    },[])

    useEffect(()=> {
        setDateRef(date);
    },[date]);

    useEffect(()=> {
        setProjectDetails(prevState => (
            {
                ...prevState,
                totalTime: calculateTime(),
            }
        ))
    },[projectDetails.taskList])

    useEffect(()=> {
        onChange(projectDetails);
        if(dateRef === null) {
            const filterTaskList = projectDetails.taskList.filter(task => {
                if(task.status !== 'Complete') {
                    return task;
                }
            })
            displayTasks(filterTaskList);
        } else {
            const filterTaskList = projectDetails.taskList.filter(task => {
                if(task.status !== 'Complete' && task.date === dateRef) {
                    return task;
                }
            })
            displayTasks(filterTaskList);
        };
    },[projectDetails, projectDetails.status, isUpdate, dateRef]); //Sempre que o projeto sofre alguma alteração na lista de tasks, o projeto é lançado para o display e a lista de componentes de taskCard é atualizada na renderização.

    useEffect(()=> {
        filterCompleteTask();
    },[projectDetails.taskList]);

    useEffect(()=> {
        if(completeTaskList){
            displayCompleteTasks(completeTaskList);
        };
    },[completeTaskList]);

    function displayTasks(list:TaskProps[]) {
        if (list) {         
            const component = list.map((task) => (
                <TaskCard
                    className="task-card"
                    onChange={ updateTaskDetails }
                    details={ task }
                    key={ task.id }
                />
            ));
            setTaskComponent(component);
        };
    };

    function updateTaskDetails(object:TaskProps) {
        if(object) {
            const newTaskList = projectDetails.taskList.filter((task:TaskProps)=> {
                if(task.id !== object.id && task.id !== null) {
                    return task;
                };
            });

            if(object.status !== 'Deleted'){
                newTaskList.push(object);
            };

            if(newTaskList.length) {
                newTaskList.sort((a:TaskProps, b:TaskProps)=> a.id! - b.id!)
            };

            setProjectDetails(prevState => (
                {
                    ...prevState,
                    taskList: newTaskList
                }
            ))
            update();
        };
        update();
    };

    function updateProjectDetails(object:ProjectProps) {
        setProjectDetails(object);
        update();
    };

    function update() {
        setIsUpdate(!isUpdate);
    };

    function handleEdit() {
        setIsOpen(true);
    };

    function handleCloseEdit() {
        setIsOpen(false);
    };

    function handleCreateTask() {
        setIsCreate(true);
    };

    function handleCloseCreateTask() {
        setIsCreate(false);
    };

    function handleDeleteProject() {
        setProjectDetails(prevState => (
            {
                ...prevState,
                status: 'Deleted',
            }
        ))
        update();
    };

    function calculateTime() {
        let totalTime = 0;
        projectDetails.taskList.forEach(task=> {
            totalTime += task.totalTime;
        });
        return totalTime;
    };

    function filterCompleteTask() {
        const newList = projectDetails.taskList.filter(task => {
            if(task.status === 'Complete') {
                return task;
            }
        });

        setCompleteTaskList(newList);
    };

    function displayCompleteTasks(list:TaskProps[]) {
        if (list) {         
            const component = list.map((task) => (
                <TaskCard
                    className="task-card-complete"
                    onChange={ updateTaskDetails }
                    details={ task }
                    key={ task.id }
                />
            ));
            setCompleteTaskComponent(component);
        };
    };

    return(
        <>
            <article
            className={ className }
            id={ id }>
                <section className="project-header">
                    <h2 className="project-name">{ projectDetails.name }</h2>
                    <section className="project-buttons">
                        <SettingsButton
                        className="std-button"
                        onClick={handleEdit} />
                        <AddButton
                        className="std-button"
                        onClick={ handleCreateTask } />
                    </section>
                </section>
                <section className="project-task-display">
                    { taskComponent }
                </section>

                {completeTaskList?.length
                ?<section className="project-complete-task-display">
                <hr />
                {    completeTaskComponent }
                </section>
                :''}

            </article>

            { isOpen && createPortal(
                <ProjectEditor
                className="project-editor"
                onChange={ updateProjectDetails }
                onClose={ handleCloseEdit }
                onDelete={ handleDeleteProject }
                details={ projectDetails } />, document.body
            )}

            { isCreate && createPortal(
                <CreateTask
                className="create-task"
                project={ projectDetails }
                onClose={ handleCloseCreateTask }
                onCreate={ updateTaskDetails }/>, document.body
            )}
        </>
    )
};

export default ProjectCard;