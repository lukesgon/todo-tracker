import { IoIosPause } from "react-icons/io";

interface PauseIconProps {
    size?: number,
};

const PauseIcon = ({ size }:PauseIconProps) => {
    return (
        <IoIosPause
        size={ size }
        style={{fill:"inherit"}}
        />
    )
};

export default PauseIcon;
