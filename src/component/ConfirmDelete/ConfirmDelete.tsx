import Button from "../Button/Button";
import TrashIcon from "../Icon/TrashIcon";
import CloseIcon from "../Icon/CloseIcon";
import './ConfirmDelete.css'

interface ConfirmDeleteProps {
    onDelete: ()=> void,
    onCancel: ()=> void,

    className?: string,
    id?: string,
}

const ConfirmDelete = ({ onDelete, onCancel, className, id }:ConfirmDeleteProps) => {

    function handleDelete() {
        onDelete();
    };

    function handleCancel() {
        onCancel();
    };

    return(
        <section
        className={ className }
        id={ id }>
            <article>
                <h3>Are you sure?</h3>
                <section>
                    <Button
                    className="std-button"
                    onClick={ handleCancel }>
                        <CloseIcon
                        size={20}/>No
                    </Button>
                    <Button
                    className="std-button"
                    onClick={ handleDelete }>
                        <TrashIcon
                        size={20}/>Yes
                    </Button>
                </section>
            </article>
        </section>
    )
};

export default ConfirmDelete;