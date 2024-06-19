import Button from "./Button";
import CreateIcon from "../Icon/CreateIcon";

interface CreateButtonProps {
    className?: string,
    id?: string,
    onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void,
    size?: number,
    type?: string
}

const CreateButton = ({ className, id, onClick, size }:CreateButtonProps) => {
    return(
        <Button
        className={ className }
        id={ id }
        onClick={ onClick }>
            <CreateIcon
            size={ size }/>
        </Button>
    )
};

export default CreateButton;