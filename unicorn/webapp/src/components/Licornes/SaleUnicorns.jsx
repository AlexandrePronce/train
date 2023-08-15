import React, { useState, useContext } from 'react';
import { Context } from "contexts/unicornsContext";
const SaleUnicorns =()=>{
    const { addNewUnicorn } = useContext(Context);
    
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [color, setColor] = useState("");

    const handleName = (e) => {
        setName(e.target.value);
      };
      const handlePrice = (e) => {
        setPrice(e.target.value);
      };
      const handleStock= (e) => {
        setStock(e.target.value);
      };
      const handleColor= (e) => {
        setColor(e.target.value);
      };
      const add=()=>{
        const newUnicorn = {
            name: name,
            price: price,
            stock: stock,
            color :color
          }
          addNewUnicorn(newUnicorn)
        setName('')
        setPrice('')
        setStock('')
        setColor('')
      }
    return(
        <div>
            <h1> Vendez votre licorne</h1>
            <form>
            <p>nom : <input value={name} onChange={handleName} /></p>
            <p>prix : <input value={price} onChange={handlePrice} /></p>
            <p>stock: <input value={stock} onChange={handleStock} /></p>
            <p>color: <input value={color} onChange={handleColor} /></p>
            <button onClick={add}>Ajouter</button>
            </form>
        </div>
    )

}

export default SaleUnicorns