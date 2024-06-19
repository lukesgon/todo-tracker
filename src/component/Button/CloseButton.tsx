import CloseIcon from "../Icon/CloseIcon";
import Button from "./Button";

interface CloseButtonProps {
    className?: string,
    id?: string,
    onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void,
    size?: number,
}

const CloseButton = ({ className, id, onClick, size }:CloseButtonProps) => {
    return(
        <Button
        className={ className }
        id={ id }
        onClick={ onClick }>
            <CloseIcon 
            size={ size }/>
        </Button>
    )
};

export default CloseButton;