import { useEffect, useState } from "react"
import TaskProps from "../Props/TaskProps"
import TextInput from "../Inputs/TextInput/TextInput"
import NumberInput from "../Inputs/NumberInput/NumberInput"
import TextAreaInput from "../Inputs/TextAreaInput/TextAreaInput"
import DateInput from "../Inputs/DateInput/DateInput"
import EditButton from "../Button/EditButton"
import CloseButton from "../Button/CloseButton"
import { createPortal } from "react-dom"
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete"
import DelButton from "../Button/DelButton"
import SaveButton from "../Button/SaveButton"
import './TaskEditor.css'

interface TaskEditorProps {
    className?: string,
    id?: string,
    details: TaskProps,
    onChange: (object:TaskProps)=> void,
    onClose: ()=> void,
    onDelete: ()=> void,
};

const TaskEditor = ({ className, id, details, onChange, onClose, onDelete }:TaskEditorProps)=> {
    const [taskDetails, setTaskDetails] = useState(details);
    const [timeDetails, setTimeDetails] = useState(convertToTime(taskDetails.totalTime));
    const [isUpdate, setIsUpdate] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    useEffect(()=> {
        onChange(taskDetails);
    },[isUpdate])

    function convertToTime(ms: number) {
        const totalSeconds = Math.floor(ms / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return (
            {
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds
            }
        );
    }; //Retorna um objeto contendo a formatação em dias, horas, minutos e segundos do tempo total decorrido.

    function convertToNumber(obj:{days:number, hours:number, minutes:number, seconds:number}){
        const totalMs = (obj.days * 86400 * 1000) + (obj.hours * 3600 * 1000) + (obj.minutes * 60 * 1000) + (obj.seconds * 1000);
        return totalMs;
    }; //Recebe um objeto contendo a quantidade de dias, horas, minutos e segundos e retorna o total em milissegundos.

    function handleEdit() {
        setIsEdit(true);
    }; //Libera a edição dos itens alteráveis.

    function cancelEdit() {
        setIsEdit(false)
    }; //Bloqueia a edição dos itens alteráveis.

    function captValues(event:React.FormEvent) {
        event.preventDefault();

        const nameElement = document.getElementById('task-editor-name') as HTMLInputElement;
        const descriptionElement = document.getElementById('task-editor-description') as HTMLTextAreaElement;
        const dateElement = document.getElementById('task-editor-date') as HTMLInputElement;
        const daysElement = document.getElementById('task-editor-days') as HTMLInputElement;
        const hoursElement = document.getElementById('task-editor-hours') as HTMLInputElement;
        const minutesElement = document.getElementById('task-editor-minutes') as HTMLInputElement;
        const secondsElement = document.getElementById('task-editor-seconds') as HTMLInputElement;
        const statusElement = document.getElementById('task-editor-status') as HTMLInputElement;

        
        if (nameElement.value !== '' && nameElement.value !== undefined && nameElement.value !== null && dateElement.value !== '' && dateElement.value !== undefined && dateElement.value !== null) {
            const newTimeObj = {
                days: Number(daysElement.value),
                hours: Number(hoursElement.value),
                minutes: Number(minutesElement.value),
                seconds: Number(secondsElement.value),
            };
    
            const newTimeValue = convertToNumber(newTimeObj);
            const newStatus = (newTimeValue > 0) ? 'Started' : 'Not Started';
    
            setTaskDetails(prevState => (
                {
                    ...prevState,
                    name: nameElement.value,
                    description: descriptionElement.value,
                    date: dateElement.value,
                    totalTime: newTimeValue,
                    status: newStatus,
                }
            ));
    
            setTimeDetails(newTimeObj);
    
            cancelEdit();
            update();

            statusElement.value = (newTimeValue > 0)? 'Started' : 'Not Started'
        } else {
            alert('The task needs a name and a date.');
        };

    }; //Captura os dados do formulário e atualiza a taskDetails dentro do taskEditor.

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
                    <section className="task-editor-header">
                        <section className='task-editor-header-section'>
                            <h3>Task Editor</h3>
                            {
                                (taskDetails.status === 'Complete')
                                ?''
                                :<EditButton
                                className={isEdit ?'std-button-active':"std-button"}
                                isEdit={ isEdit }
                                onClick={ isEdit ? cancelEdit : handleEdit }
                                />
                            }
                            <DelButton
                            className="std-button"
                            onClick={ handleDelete }/>
                        </section>
                        <CloseButton
                        className="std-button"
                        onClick={ onClose } />
                    </section>
                    <section>
                        <form
                        className="task-editor-form"
                        onSubmit={ captValues }>
                            <section>

                                <fieldset>
                                    <legend>Main</legend>
                                    <section>
                                        <TextInput
                                        className="task-editor-input"
                                        name='task-editor-id'
                                        id='task-editor-id'
                                        disabled={ true }
                                        autoComplete="off"
                                        placeholder=""
                                        value={taskDetails.id}>
                                            Id:
                                        </TextInput>

                                        <TextInput
                                        className={isEdit ?'task-editor-input-active' :"task-editor-input"}
                                        name='task-editor-name'
                                        id='task-editor-name'
                                        disabled={ !isEdit }
                                        autoComplete="off"
                                        placeholder=""
                                        value={taskDetails.name}>
                                            Name:
                                        </TextInput>

                                    </section>

                                    <TextAreaInput
                                    className={isEdit ?'task-editor-input-active' :"task-editor-input"}
                                    name='task-editor-description'
                                    id='task-editor-description'
                                    disabled={ !isEdit }
                                    autoComplete="off"
                                    placeholder="Ex: This is a description..."
                                    value={ isEdit ?undefined :taskDetails.description }>
                                        Description:
                                    </TextAreaInput>
                                </fieldset>

                                <fieldset>
                                    <legend>Other</legend>
                                    <DateInput
                                    className={isEdit ?' task-editor-time task-editor-input-active' :"task-editor-input task-editor-time"}
                                    name='task-editor-date'
                                    id='task-editor-date'
                                    disabled={ !isEdit }
                                    autoComplete="off"
                                    placeholder=""
                                    value={taskDetails.date}>
                                        Date:
                                    </DateInput>

                                    <NumberInput
                                    className={isEdit ?' task-editor-time task-editor-input-active' :"task-editor-input task-editor-time"}
                                    name='task-editor-days'
                                    id='task-editor-days'
                                    disabled={ !isEdit }
                                    autoComplete="off"
                                    placeholder=""
                                    value={String(timeDetails.days).padStart(2, '0')}>
                                        Days:
                                    </NumberInput>

                                    <NumberInput
                                    className={isEdit ?' task-editor-time task-editor-input-active' :"task-editor-input task-editor-time"}
                                    name='task-editor-hours'
                                    id='task-editor-hours'
                                    disabled={ !isEdit }
                                    autoComplete="off"
                                    placeholder=""
                                    value={String(timeDetails.hours).padStart(2, '0')}>
                                        Hours:
                                    </NumberInput>

                                    <NumberInput
                                    className={isEdit ?' task-editor-time task-editor-input-active' :"task-editor-input task-editor-time"}
                                    name='task-editor-minutes'
                                    id='task-editor-minutes'
                                    disabled={ !isEdit }
                                    autoComplete="off"
                                    placeholder=""
                                    value={String(timeDetails.minutes).padStart(2, '0')}>
                                        Minutes:
                                    </NumberInput>

                                    <NumberInput
                                    className={isEdit ?' task-editor-time task-editor-input-active' :"task-editor-input task-editor-time"}
                                    name='task-editor-seconds'
                                    id='task-editor-seconds'
                                    disabled={ !isEdit }
                                    autoComplete="off"
                                    placeholder=""
                                    value={String(timeDetails.seconds).padStart(2, '0')}>
                                        Seconds:
                                    </NumberInput>

                                    <TextInput
                                    className="task-editor-input"
                                    name='task-editor-status'
                                    id='task-editor-status'
                                    disabled={ true }
                                    autoComplete="off"
                                    placeholder=""
                                    value={taskDetails.status}>
                                        Status:
                                    </TextInput>

                                </fieldset>
                            </section>
                            <SaveButton
                            className={isEdit ?"std-button" :'std-button-disabled'}
                            disabled={!isEdit} />
                        </form>
                    </section>
                </article>
            </section>
            { isDelete && createPortal(
                <ConfirmDelete
                className="confirm-delete"
                onDelete={ onDelete }
                onCancel={ handleCloseDelete }/>, document.body
            )}
        </>
    );
};

export default TaskEditor;