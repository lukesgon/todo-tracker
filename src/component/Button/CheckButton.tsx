import Button from "./Button";
import CheckIcon from "../Icon/CheckIcon";
import UncheckIcon from "../Icon/UncheckIcon";

interface CheckButtonProps {
    className?: string,
    id?: string,
    onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void,
    size?: number,
    status: string
}

const CheckButton = ({ className, id, onClick, size, status }:CheckButtonProps) => {
    return(
        <Button
        className={ className }
        id={ id }
        onClick={ onClick }>
            { (status === 'Complete')
            ? <CheckIcon 
            size={ size }/>
            : <UncheckIcon
            size={ size } /> }
            
        </Button>
    )
};

export default CheckButton;