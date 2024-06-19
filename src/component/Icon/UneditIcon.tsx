import { MdEditOff } from "react-icons/md";



interface UneditIconProps {
    size?: number;
}

const UneditIcon = ({ size }:UneditIconProps) => {
    return(
        <MdEditOff
        size={ size }
        style={{fill:"inherit"}}/>
    )
};

export default UneditIcon;