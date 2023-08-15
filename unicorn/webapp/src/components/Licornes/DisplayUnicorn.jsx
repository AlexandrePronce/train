import { Context } from "contexts/unicornsContext"
import React, {  useContext } from "react";
import { Link } from 'react-router-dom';
import {  List} from 'antd';
import DisplaySale from "./DisplaySale";
import CreateNewSale from "./CreateNewSale";
const DisplayUnicorn =({uni})=>{
    const{getUnicornWithSales} = useContext(Context) ;
    if (!uni) {
        return (
            <div>
                <h1>Unicorn not found</h1>
            </div>
        );
    }
  
    const sale = getUnicornWithSales(uni.id)
    return(
        <div>
            <h1>voici les informations disponible sur cette licorne</h1>
            <p> nom : {uni.name}</p>
            <p> prix : {uni.price}</p>
            <p> stock : {uni.stock}</p>
            <p> couleur : {uni.color}</p>
            <div>
                <h1>ventes de ce type de licorne</h1>
                {sale.map(sale => 
                <DisplaySale sale={sale}  key={sale.id}/>)}
            </div>
            <CreateNewSale id ={uni.id}/>
        </div>
    )

}

export default DisplayUnicorn