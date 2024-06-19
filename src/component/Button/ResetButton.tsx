import Button from "./Button";
import ResetIcon from "../Icon/ResetIcon";

interface ResetButtonProps {
    className?: string,
    id?: string,
    onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void,
    size?: number,
}

const ResetButton = ({ className, id, onClick, size }:ResetButtonProps) => {
    return(
        <Button
        className={ className }
        id={ id }
        onClick={ onClick }>
            <ResetIcon 
            size={ size }/>
        </Button>
    )
};

export default ResetButton;