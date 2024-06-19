
interface TextInputProps {
    children: string,
    className?: string,
    id?: string,
    name: string,
    disabled: boolean,
    autoComplete: 'on' | 'off',
    placeholder: string,
    value?: undefined | number | string | null,
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined,
    nowValue?: string | undefined,
}

const TextInput = ({ children, className, id, name, disabled, autoComplete, placeholder, value, onChange, nowValue }:TextInputProps) => {
    return(
        <label
        htmlFor={ name }
        className={ className }>

            { children }

            <input 
            type="text"
            name={ name }
            id={ id }
            disabled={ disabled }
            autoComplete={ autoComplete }
            placeholder={ placeholder }
            defaultValue={ value! }
            value={ nowValue }
            onChange={onChange}
            />
        </label>
    )
};

export default TextInput;