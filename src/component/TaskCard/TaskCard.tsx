import { useEffect, useState } from "react";
import TaskProps from "../Props/TaskProps";
import SettingsButton from "../Button/SettingsButton";
import { createPortal } from "react-dom";
import TaskEditor from "../TaskEditor/TaskEditor";
import StopWatch from "../StopWatch/StopWatch";
import './TaskCard.css'

interface TaskCardProps {
    className?: string,
    id?: string,
    details: TaskProps,
    onChange: (object:TaskProps)=> void,
};

const TaskCard = ({ className, id, details, onChange }:TaskCardProps)=> {
    const [isUpdate, setIsUpdate] = useState(false);
    const [taskDetails, setTaskDetails] = useState<TaskProps>(details);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=> {
        onChange(taskDetails);
    },[isUpdate])

    function updateDetails(obj:TaskProps) {
        setTaskDetails(obj);
        update();
    }; // Atualiza os detalhes da Task.

    function update() {
        setIsUpdate(!isUpdate);
    };

    function handleSettings() {
        setIsOpen(true);
    };

    function handleCloseSettings() {
        setIsOpen(false);
    };

    function deleteTask() {
        setTaskDetails(prevState => (
            {
                ...prevState,
                status: 'Deleted'
            }
        ))
    };

    function handleDeleteTask() {
        deleteTask();
        handleCloseSettings();
        update();
    };

    function completeTask() {
        if(taskDetails.status !== 'Complete') {
            setTaskDetails(prevState => (
                {
                    ...prevState,
                    status:'Complete'
                }
            ))
            update();
        } else if(taskDetails.status === 'Complete' && taskDetails.totalTime > 0) {
            setTaskDetails(prevState => (
                {
                    ...prevState,
                    status:'Started'
                }
            ))
            update();
        } else if (taskDetails.status === 'Complete' && taskDetails.totalTime === 0) {
            setTaskDetails(prevState => (
                {
                    ...prevState,
                    status:'Not Started'
                }
            ))
            update();
        }
    };

    return(
        <>
            <article
            className={ className }
            id={ id }>
                <h3 className='task-name'>{ taskDetails.name }</h3>
                <section className="task-buttons">
                    <section>
                        <SettingsButton
                        size={ 10 }
                        className={(details.status === 'Complete')?'std-button-complete':"std-button"}
                        onClick={ handleSettings } />
                    </section>
                    <StopWatch
                    className={(taskDetails.status === 'Complete')?'stopwatch-complete':"stopwatch"}
                    status={ taskDetails.status }
                    onCheck={ completeTask }
                    details={ taskDetails }
                    onChange={ updateDetails }
                    onSettings={ isOpen }/>

                </section>
            </article>

            { isOpen && createPortal(
                <TaskEditor
                className="task-editor"
                details={ taskDetails }
                onChange={ updateDetails }
                onClose={ handleCloseSettings }
                onDelete={ handleDeleteTask } />,
                document.body
            )}
        </>
    );
};

export default TaskCard;