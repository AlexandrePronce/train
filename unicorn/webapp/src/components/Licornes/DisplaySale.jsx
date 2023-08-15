import { Context } from "contexts/unicornsContext"
import React, {  useContext } from "react";
const DisplaySale = ({sale})=>{

    const{deleteSale} = useContext(Context) ;
    const handleButton=()=>{
        deleteSale(sale.id)

    }
 return(
    <div>
    <p>{sale.buyer}</p>
    <p> {sale.date}</p>
    <p>{sale.quantity}</p>
    <button  onClick={handleButton}>supprimer cette vente</button>
    </div>
 )
}
export default DisplaySale