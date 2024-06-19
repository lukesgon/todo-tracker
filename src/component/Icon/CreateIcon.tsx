import { CgPlayListAdd } from "react-icons/cg";

interface CreateIconProps {
    size?: number;
}

const CreateIcon = ({ size }:CreateIconProps) => {
    return(
        <CgPlayListAdd
        size={ size }
        style={{fill:"inherit"}}/>
    )
};

export default CreateIcon;