import { useEffect, useRef, useState } from "react";
import TaskProps from "../Props/TaskProps";
import PlayPauseButton from "../Button/PlayPauseButton";
import CheckButton from "../Button/CheckButton";
import './StopWatch.css';

interface StopWatchProps {
    details: TaskProps,
    onChange: (object:TaskProps)=> void,
    onSettings: boolean,
    onCheck: ()=> void,
    status: string,
    className?: string,
    id?: string,
};

const StopWatch = ({ details, onChange, onSettings, onCheck, status, className, id }:StopWatchProps)=> {
    const timeInterval = useRef<number>();
    const [taskDetails, setTaskDetails] = useState(details);
    const [isPlay, setIsPlay] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [lastTime, setLastTime] = useState<number>();
    const [displayTime, setDisplayTime] = useState(display());

    useEffect(()=> {
        if(onSettings === false) {
            setTaskDetails(details)
            update();
        };
    },[onSettings])

    useEffect(()=>{
        if(isPlay && onSettings === false) {
            timeInterval.current = setInterval(()=> {
                timeCounter();
            },1000)
        } else {
            pauseCounter();
            clearInterval(timeInterval.current);
        };

        return ()=> {
            clearInterval(timeInterval.current);
        };
    },[isPlay, isUpdate]);

    useEffect(()=> {
        setDisplayTime(display())
    },[isUpdate])

    useEffect(()=> {
        onChange(taskDetails)
    },[displayTime])

    function playCounter() {
        setIsPlay(true);
        setLastTime(new Date().getTime());
    };

    function pauseCounter() {
        setIsPlay(false);
    };

    function update() {
        setIsUpdate(!isUpdate);
    };

    function timeCounter() {
        const newTime = new Date().getTime();
        if(lastTime) {
            const tick = newTime - lastTime;
            const newStatus = (tick > 0)?'Started' :'Not Started'
            setTaskDetails(prevState => (
                {
                    ...prevState,
                    totalTime: prevState.totalTime + tick,
                    status: newStatus
                }
            ));
            setLastTime(newTime);
            update();
        };
    };


    function display() {
        const totalSeconds = Math.floor(taskDetails.totalTime / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
    
        const time = {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    
        return time;
    };
    
    return(
        <article
        className={ className }
        id={ id }>
            {(status !== 'Complete')
            ?<>
                <PlayPauseButton
                size={10}
                className={isPlay ?'std-button-play':"std-button"}
                isPlaying={ isPlay }
                onPause={ pauseCounter }
                onPlay={ playCounter }/>
                <section className={isPlay?'stopwatch-counter-play' :(details.status === 'Started')?'stopwatch-counter-started':'stopwatch-counter-pause'}>
                {(displayTime.days > 9)?displayTime.days:String(displayTime.days).padStart(2, '0')}d-{(displayTime.hours > 9)?displayTime.hours:String(displayTime.hours).padStart(2, '0')}:{(displayTime.minutes > 9)?displayTime.minutes:String(displayTime.minutes).padStart(2, '0')}:{(displayTime.seconds > 9)?displayTime.seconds:String(displayTime.seconds).padStart(2, '0')}
                </section>
            </>
            :''
            }


            <CheckButton
            size={ 10 }
            className={(details.status === 'Complete')?'std-button-complete':"std-button-uncheck"}
            status={ status }
            onClick={ onCheck } />
        </article>
    )
};

export default StopWatch;