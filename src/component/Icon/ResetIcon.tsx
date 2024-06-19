import { GrUpdate } from "react-icons/gr";

interface ResetIconProps {
    size?: number;
}

const ResetIcon = ({ size }:ResetIconProps) => {
    return(
        <GrUpdate
        size={ size }
        style={{fill:"inherit"}}/>
    )
};

export default ResetIcon;