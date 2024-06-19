import './Calculator.css';
import ProjectProps from '../Props/ProjectProps';
import { useEffect, useState } from 'react';
import { ReactElement } from 'react';
import NumberInput from '../Inputs/NumberInput/NumberInput';
import TextInput from '../Inputs/TextInput/TextInput';
import Button from '../Button/Button';

interface CalculatorProps {
    id?: string,
    className?: string,
};

const Calculator = ({ id, className }:CalculatorProps)=> {
    const [projectList, setProjectList] = useState<ProjectProps[]>();
    const [projectComponent, setProjectComponent] = useState<ReactElement[]>();
    const [projectTimeObj, setProjectTimeObj] = useState<{days:number, hours:number, minutes:number, seconds:number}|null>(null);
    const [result, setResult] = useState('0.00');
    const [forceRender, setForceRender] = useState(0);

    useEffect(()=> {
        updateList();
    },[]);

    useEffect(()=> {
        displayList();
    },[projectList])

    function updateList() {
        const pjListString = localStorage.getItem('projects');

        if(pjListString) {
            const projects = JSON.parse(pjListString);

            setProjectList(projects);
        }
    };

    function newRender() {
        setForceRender(prevState => prevState +1);
    }

    function displayList() {
        const projectOptions = projectList?.map(project => (
            <option
            value={project.id}
            key={project.id}
            >
                {project.name}
            </option>
        ));
        setProjectComponent(projectOptions);
    };

    function createTimeObj(obj:string) {
        const project = projectList?.filter(pj => {
            if(String(pj.id) === obj) {
                return pj
            }
        });

        if(project?.length){
            const totalSeconds = Math.floor(project[0].totalTime / 1000);
            const days = Math.floor(totalSeconds/86400);
            const hours = Math.floor((totalSeconds%86400)/3600);
            const minutes = Math.floor((totalSeconds%3600)/60);
            const seconds = Math.floor(totalSeconds%60);
    
            setProjectTimeObj(
                {
                    days: days,
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds,
                })
        } else {
            setProjectTimeObj(
                {
                    days:0,
                    hours:0,
                    minutes:0,
                    seconds:0,
                }
            )
        };

    };

    function update(){
        updateList();
        newRender();
    };

    function handleCalculate(e:React.FormEvent) {
        e.preventDefault();

        const dayElement = document.getElementById('calculator-day') as HTMLInputElement;
        const hourElement = document.getElementById('calculator-hour') as HTMLInputElement;
        const minuteElement = document.getElementById('calculator-minute') as HTMLInputElement;
        const secondElement = document.getElementById('calculator-second') as HTMLInputElement;
        const priceElement = document.getElementById('hour-value') as HTMLInputElement;

        const priceValue = priceElement.value;
        const filterNumber = Number(priceValue) + 1 - 1;

        if(!isNaN(filterNumber)) {
            const totalSeconds = (Number(dayElement.value) * 86400) + (Number(hourElement.value) * 3600) + (Number(minuteElement.value) * 60) + Number(secondElement.value);

            const result = (totalSeconds * filterNumber)/3600;

            setResult(String(result.toFixed(2)));
        } else {
            alert('The input values need to be numbers!')
            priceElement.value = String(0);
        }
    };

    return(
        <article
        id={ id }
        className={ className }>
            <section>
                <h3>
                    Budget Calculator
                </h3>
            </section>
            <section>
                <form onSubmit={handleCalculate}>
                    <label 
                    htmlFor="select-calculator"
                    className='calculator-select'>
                        Select your project: 
                        <select
                        className='calculator-select-project'
                        name="select-calculator"
                        id="select-calculator"
                        onClick={update}
                        onChange={()=>createTimeObj((document.getElementById('select-calculator') as HTMLSelectElement).value)}>
                            <option value="none">Custom</option>
                            { projectComponent }
                        </select>
                    </label>

                    <section className='calculator-time-section'>
                        <NumberInput
                        key={`day-${forceRender}`}
                        className='calculator-time-input'
                        name='calculator-day'
                        id='calculator-day'
                        disabled={false}
                        autoComplete='off'
                        placeholder='dd'
                        value={(projectTimeObj) ?String(projectTimeObj.days).padStart(2, '0') :'00'}>
                            d
                        </NumberInput>
                        
                        <NumberInput
                        key={`hour-${forceRender}`}
                        className='calculator-time-input'
                        name='calculator-hour'
                        id='calculator-hour'
                        disabled={false}
                        autoComplete='off'
                        placeholder='00'
                        value={(projectTimeObj) ?String(projectTimeObj.hours).padStart(2, '0') :'00'}>
                            :
                        </NumberInput>
                        
                        <NumberInput
                        key={`minute-${forceRender}`}
                        className='calculator-time-input'
                        name='calculator-minute'
                        id='calculator-minute'
                        disabled={false}
                        autoComplete='off'
                        placeholder='00'
                        value={(projectTimeObj) ?String(projectTimeObj.minutes).padStart(2, '0') :'00'}>
                            :
                        </NumberInput>
                        
                        <NumberInput
                        key={`second-${forceRender}`}
                        className='calculator-time-input'
                        name='calculator-second'
                        id='calculator-second'
                        disabled={false}
                        autoComplete='off'
                        placeholder='00'
                        value={(projectTimeObj) ?String(projectTimeObj.seconds).padStart(2, '0') :'00'}>
                        </NumberInput>
                        <TextInput
                        className='calculator-value'
                        name='hour-value'
                        id='hour-value'
                        autoComplete='off'
                        disabled={false}
                        placeholder='0.00'
                        value=''>
                            $
                        </TextInput>
                    </section>

                    <Button className='donate-button'>Calculate</Button>
                </form>
            </section>
            <p>Result: ${result}</p>
        </article>
    )
};

export default Calculator;