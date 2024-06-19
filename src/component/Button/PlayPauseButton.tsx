import Button from "./Button";
import PauseIcon from "../Icon/PauseIcon";
import PlayIcon from "../Icon/PlayIcon";


interface PlayPauseButtonProps {
    className?: string,
    id?: string,
    isPlaying: boolean,
    onPlay: (event?: React.MouseEvent<HTMLButtonElement>) => void,
    onPause: (event?: React.MouseEvent<HTMLButtonElement>) => void,
    size?: number
};

const PlayPauseButton = ({ className, id, isPlaying, onPause, onPlay, size }:PlayPauseButtonProps) => {
    return(
        <Button
        className={ className }
        id={ id }
        onClick={
            isPlaying
            ?onPause
            :onPlay}>
            { isPlaying
                ?<PauseIcon size={ size } />
                :<PlayIcon size={ size } />
            }
        </Button>
    )
};

export default PlayPauseButton;