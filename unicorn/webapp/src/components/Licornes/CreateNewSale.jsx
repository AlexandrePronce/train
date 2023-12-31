import React, { useState, useContext } from 'react';
import { Context } from "contexts/unicornsContext";
const CreateNewSale = ({id})=>{
    const { addNewSale } = useContext(Context);
    const [name, setName] = useState("");
    const [quantity, setquantity] = useState("");
    const handleName = (e) => {
        setName(e.target.value);
      };
      const handleQuantity = (e) => {
        setquantity(e.target.value);
      };
      const add=()=>{
        const newSale = {
            buyer: name,
            date: Date.now(),
            quantity: quantity,
            unicorn :id
          }
        addNewSale(newSale)
        setName('')
        setquantity('')
      }
return(
    <div>
        <h2>ajouter une vente</h2>
        <form>
            <p>nom : <input value={name} onChange={handleName} /></p>
            <p>quantitée : <input value={quantity} onChange={handleQuantity} /></p>
        
            <button onClick={add}>Ajouter</button>
        </form>
    </div>
)
}
export default CreateNewSale