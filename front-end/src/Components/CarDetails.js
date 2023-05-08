import { Ferrari } from './Card/Assets';


export const CarDetails = (props) => {

    return (

        <div>
            <input type="checkbox" id={props.nft.id} className="modal-toggle" />

            <div className="modal">
                
                <div className="modal-box bg-[#656C6D] shadow-xl w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">{props.nft.id}#  {props.nft.marque} - {props.nft.modele}</h3>
                    <p className="py-4">{props.nft.puissance}ch - {props.nft.vitesseMax}km/h - {props.nft.price / 10 ** 18}</p>
                    <p className="py-4">owner: {props.nft.owner}</p>
                    <figure><img src={Ferrari} alt="NFW" /></figure>
                    <div className="modal-action">
                        <label htmlFor={props.nft.id} className="btn btn-primary">Exit</label>
                    </div>
                </div>

            </div>

        </div>
    )
}