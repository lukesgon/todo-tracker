import { IoIosCloseCircle } from "react-icons/io";



interface CloseIconProps {
    size?: number;
}

const CloseIcon = ({ size }:CloseIconProps) => {
    return(
        <IoIosCloseCircle
        size={ size }
        style={{fill:"inherit"}}/>
    )
};

export default CloseIcon;