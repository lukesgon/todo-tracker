import TrashIcon from "../Icon/TrashIcon";
import Button from "./Button";

interface DelButtonProps {
    className?: string,
    id?: string,
    onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void,
    size?: number,
}

const DelButton = ({ className, id, onClick, size }:DelButtonProps) => {
    return(
        <Button
        className={ className }
        id={ id }
        onClick={ onClick }>
            <TrashIcon 
            size={ size }/>
        </Button>
    )
};

export default DelButton;