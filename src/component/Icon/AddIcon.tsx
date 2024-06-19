import { IoIosAddCircle } from "react-icons/io";


interface AddIconProps {
    size?: number;
}

const AddIcon = ({ size }:AddIconProps) => {
    return(
        <IoIosAddCircle
        size={ size }
        style={{fill:"inherit"}}/>
    )
};

export default AddIcon;