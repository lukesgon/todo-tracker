import { RiCheckboxBlankFill } from "react-icons/ri";


interface UncheckIconProps {
    size?: number;
}

const UncheckIcon = ({ size }:UncheckIconProps) => {
    return(
        <RiCheckboxBlankFill
        size={ size }
        style={{fill:"inherit"}}/>
    )
};

export default UncheckIcon;