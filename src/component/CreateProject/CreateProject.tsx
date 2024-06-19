import ProjectProps from "../Props/ProjectProps"
import { useEffect, useState } from "react"
import TextInput from "../Inputs/TextInput/TextInput"
import TextAreaInput from "../Inputs/TextAreaInput/TextAreaInput"

import CreateButton from "../Button/CreateButton"
import './CreateProject.css'
import CloseButton from "../Button/CloseButton"

interface CreateProjectProps {
    className?: string,
    id?: string,
    onCreate: (obj:ProjectProps)=> void,
    onClose: ()=> void,
};

const CreateProject = ({ className, id, onCreate, onClose }:CreateProjectProps)=> {
    const [projectDetails, setProjectDetails] = useState<ProjectProps>();
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(()=> {
        console.log(projectDetails)
        if(projectDetails){
            onCreate(projectDetails);
            onClose();
        };
    },[isUpdate, projectDetails])

    function createNewProject(event:React.FormEvent) {
        event.preventDefault();

        const nameElement = document.getElementById('create-project-name') as HTMLInputElement;
        const descriptionElement = document.getElementById('create-project-description') as HTMLTextAreaElement;

        if (nameElement.value !== '' && nameElement.value !== null) {
            const newProject:ProjectProps = {
                id: new Date().getTime(),
                name: nameElement.value,
                description: descriptionElement.value,
                taskList: [],
                totalTime: 0,
                status: 'Not Started'
            };
    
            setProjectDetails(newProject);
            update();
        } else {
            alert('The project needs a name!');
        };
    };

    function update() {
        setIsUpdate(!isUpdate);
    }

    return(
        <section
        className={ className }
        id={ id }>
            <article>
                <section className='create-project-header'>
                    <h3>Create New Project</h3>
                    <CloseButton
                    className="std-button"
                    size={ 15 }
                    onClick={ onClose }/>
                </section>
                <form onSubmit={ createNewProject }>
                    <fieldset>
                        <legend>Main Info</legend>
                        <TextInput
                        name='create-project-name'
                        id='create-project-name'
                        disabled={ false }
                        autoComplete="off"
                        placeholder="Ex: Project A...">
                            Name:
                        </TextInput>
                        
                        <TextAreaInput
                        name='create-project-description'
                        id='create-project-description'
                        disabled={ false }
                        autoComplete="off"
                        placeholder="Ex: This is a description...">
                            Description:
                        </TextAreaInput>
                    </fieldset>
                    <CreateButton
                    className="std-button"
                    size={ 15 }
                    type='submit' />
                </form>
            </article>
        </section>
    );
};

export default CreateProject;