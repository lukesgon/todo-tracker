import { FaPlay } from "react-icons/fa6";

interface PlayIconProps {
    size?: number;
}

const PlayIcon = ({ size }:PlayIconProps) => {
    return(
        <FaPlay
        size={ size }
        style={{fill:"inherit"}}/>
    )
};

export default PlayIcon;