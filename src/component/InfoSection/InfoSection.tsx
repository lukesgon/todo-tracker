import './InfoSection.css'
import { ReactElement } from 'react';
import Button from '../Button/Button'
import { useState } from 'react';
import qrImg from '../../img/qrpix.png'
import { createPortal } from 'react-dom';
import Kofi from '../Kofi/Kofi';
import Calculator from '../Calculator/Calculator';

interface InfoSectionProps {
    id?: string,
    className?: string
}

const InfoSection = ({ className, id }:InfoSectionProps)=> {
    const [component, setComponent] = useState<ReactElement>(project);
    const [section,  setSection] = useState('project');

    const [isOpen, setIsOpen] = useState(false);

    function project() {
        return(
            <article className='project-info'>
                <h3>About the Project</h3>
                <section className='donate-section'>
                    <section>
                        <p>
                            This is a project for free use! We do not charge any amount for its use, but if you would like to contribute to future updates of its functions, please consider a contribution of any value through the QR Code, the pix key: <a className='pix-link' target='_blank' href="https://nubank.com.br/cobrar/49csb/6671bdfe-1af5-4291-a0c3-6f285a686eb3">lucasdasgoncalves@gmail.com</a>, or through the  donate button.
                        </p>
                    </section>
                    <figure
                    className='qr-pix-section'>
                        <img
                        src={ qrImg }
                        alt="QR pix"
                        className='qr-pix-img'
                        />
                    </figure>
                    <Button className='donate-button' onClick={()=> setIsOpen(true)}>Donate</Button>
                </section>
                <p>This task manager stands out for allowing users to track the time dedicated to each task through an integrated timer. The tool is designed to enhance productivity and help in time organization, making it ideal for freelancers, students, and professionals looking to optimize their work routines.</p>
                <h4>Key Features</h4>
                <ul>
                    <li>
                        <strong>Project Creation:</strong> Start by defining a main project or task, which will serve as an umbrella for related tasks
                    </li>
                    <li>
                    <strong>Task Management:</strong> Easily create, edit, delete, and mark tasks as completed.
                    </li>
                    <li>
                        <strong>Flexibility:</strong> Return completed tasks to the active list if necessary.
                    </li>
                    <li>
                        <strong>Time Tracking:</strong> View the total time dedicated to a project by adding up the time from all tasks, both completed and ongoing.
                    </li>
                    <li>
                        <strong>Multitasking:</strong> Time multiple tasks simultaneously, even across different projects.
                    </li>
                    <li>
                        <strong>Privacy:</strong> All data is stored locally in the user’s browser, ensuring privacy and security.
                    </li>
                </ul>
                <p>In addition, the manager is developing a new feature: a price calculator based on hours worked, designed especially to assist freelancers in pricing their projects.</p>
                <p>With this tool, you will have total control over your activities and be able to maximize your efficiency in managing your time and projects.</p>
                <p>A special thank you to the developers of the react-calendar library, available at <a className='pix-link'href="https://www.npmjs.com/package/react-calendar">this link</a>.</p>
            </article>
        )
    };

    function toUse() {
        return(
            <article className='project-info'>
                <h3>User Manual - TODO Tracker</h3>

                <h4>Introduction</h4>
                <p>TODO Tracker is a project management tool that helps you organize and track your tasks. This manual will guide you through the various functionalities of the application.</p>

                <h4>General Display</h4>

                <h4>Create Project Button</h4>
                <p><strong>Function:</strong> Opens a window prompting for the project's name and description.</p>
                <p><strong>Requirements:</strong> Only the project name is mandatory. The description is optional.</p>
                <p><strong>Limitations:</strong> There is no limit to the name's length, but it will be partially displayed if necessary.</p>

                <h4>Display (List of Created Projects)</h4>
                <p><strong>Representation:</strong> Projects are displayed as cards in the order of creation, with the most recent at the top.</p>
                <p><strong>Actions:</strong> Projects cannot be selected, but can be edited via the edit button or a new task can be created via the task creation button.</p>

                <h4>Project Creation</h4>
                <p><strong>Fields:</strong> Name (mandatory) and description (optional).</p>
                <p><strong>Note:</strong> If the name is not provided, the creation will not be completed.</p>

                <h4>Project</h4>
                <p><strong>Edit Project Button:</strong> Allows the user to change the project's name and description, view the total elapsed time of tasks, and access the project deletion button.</p>
                <p><strong>Create Task Button:</strong> Name and Date fields are required. If the date is not specified, it will default to the creation date of the task.</p>

                <h4>Project Editing</h4>
                <p><strong>Functions:</strong> Change the project's name and description, view the total time of tasks.</p>
                <p><strong>Requirements:</strong> Name is mandatory; description is optional. The edit will not be saved without a name.</p>

                <h4>Delete Project Button</h4>
                <p><strong>Confirmation:</strong> A confirmation window appears before deleting the project.</p>
                <p><strong>Consequence:</strong> All tasks associated with the project will be deleted.</p>

                <h4>Task</h4>
                <p><strong>Edit Task Button:</strong> Allows changes to name, description, date, and elapsed time. Name and date are mandatory fields.</p>
                <p><strong>Timer:</strong> Includes play, pause, and check buttons (to mark the task as completed). The user can pause and restart the timer manually.</p>

                <h4>Task Editing</h4>
                <p><strong>Functions:</strong> Reset the timer, change the name, description, and date.</p>
                <p><strong>Requirements:</strong> Name and date are mandatory. The timer must have a numerical value.</p>

                <h4>Calendar</h4>

                <h6>Calendar Reset Button</h6>
                <p><strong>Function:</strong> Returns to the initial screen showing the current month and highlighting the current day.</p>
                <p><strong>Consequence:</strong> Disables task filtering and lists all tasks for each project.</p>

                <h4>Show Current Date</h4>
                <p><strong>Highlight:</strong> The current date is highlighted in light gray.</p>

                <h4>Select a Day</h4>
                <p><strong>Function:</strong> Filters and shows only the tasks registered on the selected day for each project.</p>

                <h4>ToolBox</h4>

                <h4>Project Section</h4>
                <p><strong>Content:</strong> Information about the TODO Tracker and a donation incentive.</p>

                <h4>Manual Section</h4>
                <p><strong>Content:</strong> Detailed information on using each tool within the TODO Tracker.</p>

                <h4>Author Section</h4>
                <p><strong>Content:</strong> Information about the author, including contact links.</p>

                <h4>Calculator Section</h4>
                <p><strong>Function:</strong> Estimates the total price of a project based on the elapsed time or a generic time provided by the user.</p>

                <h4>Feedback Section</h4>
                <p><strong>Function:</strong> Redirects to a Google form for sending suggestions and feedback.</p>

                <h4>Conclusion</h4>
                <p>This manual covers the essential functionalities of TODO Tracker. If you have additional questions, please refer to the Manual section within the app or contact us through the links provided in the Author section.</p>
            </article>
        )
    };

    function author() {
        return(
        <article className='project-info'>
            <section>
                <h3>TODO Tracker WebApp</h3>
                <p>developed by Lucas da Silva Gonçalves</p>
            </section>
            <section>
                <h4>Contact</h4>
                <p>
                    <a className='pix-link' href="https://github.com/lukesgon" target="_blank">GitHub</a>
                </p>
                <p>
                    <a className='pix-link' href="https://www.linkedin.com/in/lucasdasgoncalves" target="_blank">LinkedIn</a>
                </p>
                <p>
                    <a className='pix-link' href="mailto:lucasdasgoncalves@gmail.com">Send Email</a>
                </p>
                <p>
                    <a className='pix-link' href="https://lukesgon.github.io/portfolio" target="_blank">Portfolio</a>
                </p>
                <p>
                    <a className='pix-link' href="https://forms.gle/TyeV1dfBgdRbaEGM6" target="_blank">Feedback</a>
                </p>
            </section>
        </article>

        )
    };

    function calculator() {
        return(
            <Calculator
            className='calculator'/>
        )
    }

    function handleProject() {
        setSection('project');
        setComponent(project);
    };
    
    function handleToUse() {
        setSection('to-use');
        setComponent(toUse);
    };
    
    function handleAuthor() {
        setSection('author');
        setComponent(author);
    };

    function handleCalculator() {
        setSection('calculator');
        setComponent(calculator);
    };

    return(
        <>
            <section
            className={ className }
            id={ id }>
                <section
                className='info-button-section'>
                    <Button
                    className={(section === 'project')?'std-button-active info-button' :'std-button info-button'}
                    onClick={ handleProject }>Project</Button>
                    <Button
                    className={(section === 'to-use')?'std-button-active info-button' :'std-button info-button'}
                    onClick={ handleToUse }>To Use</Button>
                    <Button
                    className={(section === 'calculator')?'std-button-active info-button' :'std-button info-button'}
                    onClick={ handleCalculator }>Calculator</Button>
                    <Button
                    className={(section === 'author')?'std-button-active info-button' :'std-button info-button'}
                    onClick={ handleAuthor }>Author</Button>

                </section>
                <section className='info-content-section'>
                    { component }
                </section>
            </section>
        { isOpen && createPortal(
            <Kofi
            className='kofi-portal'
            onClose={()=> setIsOpen(false)} />, document.body)}
        </>
    )
};

export default InfoSection;