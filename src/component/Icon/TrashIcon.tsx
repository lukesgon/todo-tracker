import { FaTrashCan } from "react-icons/fa6";

interface TrashIconProps {
    size?: number;
}

const TrashIcon = ({ size }:TrashIconProps) => {
    return(
        <FaTrashCan
        size={ size }
        style={{fill:"inherit"}}/>
    )
};

export default TrashIcon;