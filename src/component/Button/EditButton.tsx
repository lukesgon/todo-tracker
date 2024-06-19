import Button from "./Button";
import EditIcon from "../Icon/EditIcon";
import UneditIcon from "../Icon/UneditIcon";

interface EditButtonProps {
    isEdit: boolean,
    className?: string,
    id?: string,
    onClick: ()=> void,
}

const EditButton = ({ isEdit, className, id, onClick }:EditButtonProps) => {
    return(
        <Button 
        className={ className }
        id={ id }
        onClick={ onClick }>
            { isEdit
            ?<UneditIcon />
            :<EditIcon />
            }
        </Button>
    )
};

export default EditButton;