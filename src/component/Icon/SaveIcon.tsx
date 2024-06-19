import { FaSave } from "react-icons/fa";

interface SaveIconProps {
    size?: number;
}

const SaveIcon = ({ size }:SaveIconProps) => {
    return(
        <FaSave
        size={ size }
        style={{fill:"inherit"}}/>
    )
};

export default SaveIcon;