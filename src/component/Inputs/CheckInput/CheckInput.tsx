
interface CheckInputProps {
    children: string,
    className?: string,
    id: string,
    name: string,
    onChange: ()=>void,
};

const CheckInput = ({ children, className, id, name, onChange }:CheckInputProps) => {

    return(
        <label
        htmlFor={ name }
        className={ className }>
            { children }
            <input
            type='checkbox'
            name={ name }
            id={ id }
            onChange={ onChange }
            />
        </label>
    )
};

export default CheckInput