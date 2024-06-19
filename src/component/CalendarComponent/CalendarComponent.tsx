import Calendar from "react-calendar";
import './Calendar.css'
import { useEffect, useState } from "react";
import ResetButton from "../Button/ResetButton";

type valuePiece = Date | null;
type value = valuePiece | [valuePiece, valuePiece];

interface CalendarComponentProps {
    className?: string,
    id?: string,
    onChange: (object:string|null)=> void,
};

const CalendarComponent = ({ className, id, onChange }:CalendarComponentProps)=> {
    const [key, setKey] = useState(Date.now());
    const [value, setValue] = useState<value>();
    const [normalDate, setNormalDate] = useState<string | null>(null);
    
    useEffect(()=> {
        if(value) {
            convertDate();
        };
    },[value]);

    useEffect(()=> {
        if(normalDate || normalDate === null) {
            onChange(normalDate);
        };
    },[normalDate])
    
    function resetDate() {
        setValue(null);
        setNormalDate(null);
        setKey(Date.now());
    };

    function convertDate() {
        const oldDate = String(value);
        if(oldDate) {
            const newDate = new Date(oldDate);
            const formatedDate = newDate.toISOString().split('T')[0];
            setNormalDate(formatedDate);
        };
    };

    return(
        <section
        className={ className }
        id={ id }>
            <section className="calendar-header">
                <h2>Calendar</h2>
                <ResetButton
                className="std-button"
                onClick={ resetDate } />
            </section>
            <Calendar
            locale="en-US"
            key={ key }
            onChange={ setValue }
            value={ value }/>
        </section>
    );
};


export default CalendarComponent;