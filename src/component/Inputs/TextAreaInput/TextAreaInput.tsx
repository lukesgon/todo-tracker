interface TextAreaInputProps {
    children: string,
    className?: string,
    id?: string,
    name: string,
    disabled: boolean,
    autoComplete: 'on' | 'off',
    placeholder: string,
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined,
    nowValue?: string | undefined,
}

const TextAreaInput = ({ children, className, id, name, disabled, autoComplete, placeholder, value, onChange, nowValue }:TextAreaInputProps) => {
    return(
        <label
        htmlFor={ name }
        className={ className }>

            { children }

            <textarea
            name={ name }
            id={ id }
            disabled={ disabled }
            autoComplete={ autoComplete }
            placeholder={ placeholder }
            defaultValue={ value }
            onChange={ onChange }
            value={ nowValue }
            />
        </label>
    )
};

export default TextAreaInput;