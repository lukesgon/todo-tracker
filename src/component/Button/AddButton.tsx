import Button from "./Button";
import AddIcon from "../Icon/AddIcon";

interface AddButtonProps {
    className?: string,
    id?: string,
    onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void,
    size?: number,
}

const AddButton = ({ className, id, onClick, size }:AddButtonProps) => {
    return(
        <Button
        className={ className }
        id={ id }
        onClick={ onClick }>
            <AddIcon 
            size={ size }/>
        </Button>
    )
};

export default AddButton;