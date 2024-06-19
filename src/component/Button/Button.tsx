import './Button.css'

interface ButtonProps {
    className?: string,
    id?: string,
    type?: 'submit' | 'reset' | 'button',
    children: React.ReactNode,
    onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void,
    onSubtmit?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    disabled?: boolean
}

const Button = ({ className, id , type, children, disabled, onClick }:ButtonProps) => {
    return(

        <button
        className={ className }
        id={ id }
        type={ type }
        disabled={ disabled }
        onClick={ onClick }>

            { children }

        </button>

    )
};

export default Button;