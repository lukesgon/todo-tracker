import ProjectProps from "../Props/ProjectProps"
import TextAreaInput from "../Inputs/TextAreaInput/TextAreaInput"
import TextInput from "../Inputs/TextInput/TextInput"
import NumberInput from "../Inputs/NumberInput/NumberInput"
import EditButton from "../Button/EditButton"
import CloseButton from "../Button/CloseButton"
import { useEffect, useState } from "react"
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete"
import { createPortal } from "react-dom"
import DelButton from "../Button/DelButton"
import SaveButton from "../Button/SaveButton"
import './ProjectEditor.css'

interface ProjectEditorProps {
    className?: string,
    id?: string,
    onClose: ()=> void,
    onChange: (obj:ProjectProps)=> void,
    onDelete: ()=> void,
    details: ProjectProps,
};

const ProjectEditor = ({ className, id, onChange, onClose, onDelete, details }:ProjectEditorProps)=> {
    const [projectDetails, setProjectDetails] = useState<ProjectProps>(details);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    useEffect(()=> {
        onChange(projectDetails)
    },[isUpdate]);

    function handleEdit() {
        setIsEdit(true);
    };
    
    function handleCancelEdit() {
        setIsEdit(false);
    };

    function handleSave(event:React.FormEvent) {
        event.preventDefault();

        const nameElement = document.getElementById('project-editor-name') as HTMLInputElement;
        const descriptionElement = document.getElementById('project-editor-description') as HTMLTextAreaElement;

        if(nameElement.value !== '' && nameElement.value !== undefined && nameElement.value !== null) {
                    setProjectDetails(prevState => (
                        {
                            ...prevState,
                            name: nameElement.value,
                            description: descriptionElement.value,
                        }
                    ));
            
                    setIsEdit(false)
                    update();
        } else {
            alert('The project needs a name!')
        };
    };

    function update() {
        setIsUpdate(!isUpdate);
    };

    function handleDelete() {
        setIsDelete(true);
    };
    
    function handleCloseDelete() {
        setIsDelete(false);
    };

    return(
        <>
            <section
            className={ className }
            id={ id }>
                <article>
                    <section className="project-editor-header">
                        <section className="project-editor-header-section">
                            <h3 className='project-editor-title'>Project Settings</h3>
                            <EditButton
                            className={isEdit ?'std-button-active':"std-button"}
                            isEdit={ isEdit }
                            onClick={ isEdit ?handleCancelEdit :handleEdit }/>
                            <DelButton
                            className="std-button"
                            onClick={ handleDelete } />
                        </section>

                        <CloseButton
                        className="std-button"
                        onClick={onClose}/>
                    </section>

                    <form
                    className="project-editor-form"
                    onSubmit={ handleSave }>
                        <section>
                            <fieldset>
                                <legend>Main Info</legend>
                                <section>

                                    <NumberInput
                                    className="project-editor-input"
                                    name='project-editor-id'
                                    id='project-editor-id'
                                    disabled={ true }
                                    autoComplete="off"
                                    placeholder=""
                                    value={ Number(projectDetails.id) }>
                                        Id:
                                    </NumberInput>

                                    <TextInput
                                    className={isEdit ?'project-editor-input-active' :"project-editor-input"}
                                    name='project-editor-name'
                                    id='project-editor-name'
                                    disabled={ !isEdit }
                                    autoComplete="off"
                                    placeholder="Ex: Project A"
                                    value={ isEdit ?undefined :projectDetails.name }>
                                        Name:
                                    </TextInput>
                                </section>
                                
                                <TextAreaInput
                                className={isEdit ?'project-editor-input-active' :"project-editor-input"}
                                name='project-editor-description'
                                id='project-editor-description'
                                disabled={ !isEdit }
                                autoComplete="off"
                                placeholder="Ex: This is a description..."
                                value={ isEdit ?undefined :projectDetails.description }>
                                    Description:
                                </TextAreaInput>
                            </fieldset>

                            <fieldset>
                                <legend>Time</legend>
                                <TextInput
                                className="project-editor-input project-editor-time"
                                name='project-editor-days'
                                id='project-editor-days'
                                disabled={ true }
                                autoComplete="off"
                                placeholder=""
                                value={ String(Math.floor((projectDetails.totalTime / 1000) / 86400)).padStart(2, '0') }>
                                    Days:
                                </TextInput>
                                <TextInput
                                className="project-editor-input project-editor-time"
                                name='project-editor-hours'
                                id='project-editor-hours'
                                disabled={ true }
                                autoComplete="off"
                                placeholder=""
                                value={ String(Math.floor(((projectDetails.totalTime / 1000) % 86400)/3600)).padStart(2, '0') }>
                                    Hours:
                                </TextInput>
                                <TextInput
                                className="project-editor-input project-editor-time"
                                name='project-editor-minutes'
                                id='project-editor-minutes'
                                disabled={ true }
                                autoComplete="off"
                                placeholder=""
                                value={ String(Math.floor(((projectDetails.totalTime / 1000) % 3600)/60)).padStart(2, '0') }>
                                    Minutes:
                                </TextInput>
                                <TextInput
                                className="project-editor-input project-editor-time"
                                name='project-editor-seconds'
                                id='project-editor-hours'
                                disabled={ true }
                                autoComplete="off"
                                placeholder=""
                                value={ String(Math.floor((projectDetails.totalTime / 1000) % 60)).padStart(2, '0') }>
                                    Seconds:
                                </TextInput>
                            </fieldset>

                        </section>

                        <SaveButton
                        className={isEdit ?"std-button" :'std-button-disabled'}
                        disabled={!isEdit} />
                    </form>
                </article>
            </section>

            { isDelete && createPortal(
                <ConfirmDelete
                className="confirm-delete"
                onDelete={ onDelete }
                onCancel={ handleCloseDelete }/>, document.body
            )}
        </>
    )
};

export default ProjectEditor;