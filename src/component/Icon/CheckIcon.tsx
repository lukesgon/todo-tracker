import { RiCheckboxFill } from "react-icons/ri";


interface CheckIconProps {
    size?: number;
}

const CheckIcon = ({ size }:CheckIconProps) => {
    return(
        <RiCheckboxFill
        size={ size }
        style={{fill:"inherit"}}/>
    )
};

export default CheckIcon;