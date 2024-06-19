import { IoIosSettings } from "react-icons/io";

interface SettingsIconProps {
    size?: number;
}

const SettingsIcon = ({ size }:SettingsIconProps) => {
    return(
        <IoIosSettings
        size={ size }
        style={ {fill:"inherit"} }/>
    )
};

export default SettingsIcon;