import { MdEdit } from "react-icons/md";



interface EditIconProps {
    size?: number;
}

const EditIcon = ({ size }:EditIconProps) => {
    return(
        <MdEdit
        size={ size }
        style={{fill:"inherit"}}/>
    )
};

export default EditIcon;