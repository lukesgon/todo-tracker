import Button from "./Button";
import SaveIcon from "../Icon/SaveIcon";

interface SaveButtonProps {
    className?: string,
    id?: string,
    onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void,
    size?: number,
    disabled: boolean
}

const SaveButton = ({ className, id, onClick, size, disabled }:SaveButtonProps) => {
    return(
        <Button
        className={ className }
        id={ id }
        onClick={ onClick }
        disabled={ disabled }>
            <SaveIcon 
            size={ size }/>
        </Button>
    )
};

export default SaveButton;