
interface NumberInputProps {
    children?: string,
    className?: string,
    id?: string,
    name: string,
    disabled: boolean,
    autoComplete: 'on' | 'off',
    placeholder: string,
    value: string | number,
    step?: string
}

const NumberInput = ({ children, className, id, name, disabled, autoComplete, placeholder, value }:NumberInputProps) => {
    return(
        <label
        htmlFor={ name }
        className={ className }>

            { children }

            <input 
            type="number"
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

export default NumberInput;