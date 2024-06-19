import CloseButton from "../Button/CloseButton";
import './Kofi.css'

interface KofiProps {
    className?: string,
    id?: string,
    onClose: ()=> void,
}

const Kofi = ({ className, id, onClose }:KofiProps)=> {
    return(
        <section className={ className }
        id={ id }>
            <section>
                <section>
                    <CloseButton
                    className="std-button"
                    onClick={ onClose }/>
                </section>
                <iframe id='kofiframe' src='https://ko-fi.com/lukesgon/?hidefeed=true&widget=true&embed=true&preview=true' style={{border:'none', width:'100%',padding:'4px', }} height='650px' title='lukesgon'></iframe>
            </section>
        </section>
    )
};

export default Kofi;