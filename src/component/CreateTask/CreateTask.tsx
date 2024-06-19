import { useEffect, useState } from "react"
import TaskProps from "../Props/TaskProps"
import CloseButton from "../Button/CloseButton"
import ProjectProps from "../Props/ProjectProps"
import TextInput from "../Inputs/TextInput/TextInput"
import TextAreaInput from "../Inputs/TextAreaInput/TextAreaInput"
import DateInput from "../Inputs/DateInput/DateInput"
import CreateButton from "../Button/CreateButton"
import './CreateTask.css'

interface CreateTaskProps {
    className?: string,
    id?: string,
    project: ProjectProps
    onCreate: (obj:TaskProps)=> void,
    onClose: ()=> void,
};

const CreateTask = ({ className, id, project, onCreate, onClose }:CreateTaskProps)=> {
    
    const [taskDetails, setTaskDetails] = useState<TaskProps>();
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(()=> {
        if(taskDetails) {
            onCreate(taskDetails);
        };
    },[isUpdate]);

    function handleCreate(event:React.FormEvent) {
        event.preventDefault();

        const nameElement = document.getElementById('create-task-name') as HTMLInputElement;
        const descriptionElement = document.getElementById('create-task-description') as HTMLTextAreaElement;
        const dateElement = document.getElementById('create-task-date') as HTMLInputElement;

        if (nameElement.value && dateElement.value) {
            const newTask:TaskProps = {
                id: new Date().getTime(),
                name: nameElement.value,
                description: descriptionElement.value,
                project: project.name,
                projectId: project.id,
                date: dateElement.value,
                totalTime: 0,
                status: 'Not Started'
            };

            setTaskDetails(newTask);
            alert('Task created successfully.')
            update();

            nameElement.value = '';
            descriptionElement.value = '';

        } else {
            alert('The task needs a name and a date.')
        };
    };

    function update() {
        setIsUpdate(!isUpdate);
    };

    return(
        <section
        className={ className }
        id={ id }>
            <article>
                <section className="create-task-header">
                    <h3>Create New Task</h3>
                    <CloseButton
                    className="std-button"
                    onClick={ onClose } />
                </section>
                <form onSubmit={ handleCreate }>
                    <fieldset>
                        <legend>
                            Main Info
                        </legend>
                            <TextInput
                            name='create-task-name'
                            id='create-task-name'
                            disabled={false}
                            autoComplete="off"
                            placeholder="Ex: Task A..."
                            >
                                Name:
                            </TextInput>
                            
                            <TextAreaInput
                            name='create-task-description'
                            id='create-task-description'
                            disabled={false}
                            autoComplete="off"
                            placeholder="Ex: This is a description..."
                            >
                                Description:
                            </TextAreaInput>

                            <DateInput
                            name='create-task-date'
                            id='create-task-date'
                            disabled={false}
                            autoComplete="off"
                            placeholder=""
                            value={new Date().toISOString().split('T')[0]}>
                                Date:
                            </DateInput>
                    </fieldset>
                    <CreateButton
                    className="std-button"
                    size={15}/>
                </form>
            </article>
        </section>
    )
};
export default CreateTask;