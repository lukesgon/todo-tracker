import { ReactElement, useEffect, useState } from "react";
import AddButton from "../Button/AddButton";
import ProjectProps from "../Props/ProjectProps";
import ProjectCard from "../ProjectCard/ProjectCard";
import { createPortal } from "react-dom";
import CreateProject from "../CreateProject/CreateProject";
import './Display.css';

interface DisplayProps {
    className?: string,
    id?: string,
    date: string | null,
}

const Display = ({ className, id, date }: DisplayProps) => {
    const [dateRef, setDateRef] = useState<string | null>(null);
    const [projectList, setProjectList] = useState<ProjectProps[]>([]);
    const [projectComponent, setProjectComponent] = useState<ReactElement[]>([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [isCreate, setIsCreate] = useState(false);

    useEffect(() => {
        setDateRef(date);
    }, [date]);

    useEffect(() => {
        const stringLocalStorageList = localStorage.getItem('projects');
        if (stringLocalStorageList) {
            const localStorageList = JSON.parse(stringLocalStorageList);
            setProjectList(localStorageList);
        }
        update();
    }, []);

    useEffect(() => {
        if (projectList.length) {
            const stringProjectList = JSON.stringify(projectList);
            localStorage.setItem('projects', stringProjectList);
        } else if (projectList.length === 0) {
            localStorage.removeItem('projects');
        }
        displayComponents();
    }, [isUpdated, dateRef]);

    function displayComponents() {
        if (projectList) {
            const component = projectList.map((project) => (
                <ProjectCard
                    className="project-card"
                    date={dateRef}
                    onChange={updateProjects}
                    details={project}
                    key={project.id}
                />
            ));
            setProjectComponent(component);
        }
    }

    function updateProjects(project: ProjectProps) {
        if (project) {
            const newProjectList = projectList.filter((pj: ProjectProps) => pj.id !== project.id && pj.id !== null);
            if (project.status !== 'Deleted') {
                newProjectList.push(project);
            }
            if (newProjectList.length) {
                newProjectList.sort((a: ProjectProps, b: ProjectProps) => a.id! - b.id!);
            }

            newProjectList.sort((a, b)=> b.id-a.id)

            setProjectList(newProjectList);
            update();
        }
    }

    function handleCreateProject() {
        setIsCreate(true);
    }

    function closeCreateProject() {
        setIsCreate(false);
        update();
    }

    function update() {
        setIsUpdated(!isUpdated);
    }

    return (
        <>
            <article className={className} id={id}>
                <section className='general-header'>
                    <h2 className='general-title'>TODO Tracker</h2>
                    <section>
                        <AddButton
                        onClick={handleCreateProject}
                        className="std-button"
                        size={18}/>
                    </section>
                </section>
                <section className="projects-display">
                    { (projectList.length)?projectComponent :'Nothing to do...' }
                </section>
            </article>

            {isCreate && createPortal(
                <CreateProject
                className="create-project"
                onClose={ closeCreateProject }
                onCreate={ updateProjects } />, document.body
            )}
        </>
    )
}

export default Display;
