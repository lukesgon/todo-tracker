import SettingsIcon from "../Icon/SettingsIcon";
import Button from "./Button";

interface SettingsButtonProps {
    className?: string,
    id?: string,
    onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void,
    size?: number,
}

const SettingsButton = ({ className, id, onClick, size }:SettingsButtonProps) => {
    return(
        <Button
        className={ className }
        id={ id }
        onClick={ onClick }>
            <SettingsIcon 
            size={ size }/>
        </Button>
    )
};

export default SettingsButton;