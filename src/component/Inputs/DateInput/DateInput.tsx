interface DateInputProps {
    children: string,
    className?: string,
    id?: string,
    name: string,
    disabled: boolean,
    autoComplete: 'on' | 'off',
    placeholder: string,
    value?: string,
}

const DateInput = ({ children, className, id, name, disabled, autoComplete, placeholder, value }:DateInputProps) => {
    return(
        <label
        htmlFor={ name }
        className={ className }>

            { children }

            <input 
            type="date"
            name={ name }
            id={ id }
            disabled={ disabled }
            autoComplete={ autoComplete }
            placeholder={ placeholder }
            defaultValue={ value }
            />

        </label>
    )
};

export default DateInput;