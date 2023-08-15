import { Context } from "contexts/unicornsContext"
import React, { useState, useContext ,useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  List} from 'antd';
const AllUnicorns =()=>{
    const { unicorns } = useContext(Context);
  const [color, setColor] = useState('');
  const [unicornToShow, setUnicornToShow] = useState([]);

  useEffect(() => {
    setUnicornToShow(unicorns); // Initialize with all unicorns
  }, [unicorns]);

  const handleColor = (e) => {
    setColor(e.target.value);
  };

  const add = () => {
    if (color !== '') {
      setUnicornToShow(unicorns.filter((s) => s.color === color));
    } else {
      setUnicornToShow(unicorns);
    }
    setColor('');
  };
    return(
        <div>
            <h1> Voici toutes les licornes disponibles</h1>
            <form>
            <p>rechercher une couleur: <input value={color} onChange={handleColor} /></p>
            <button type="button" onClick={add}>Ajouter</button>
            </form>

                {unicornToShow.map(unicorn => 
                <List.Item key={unicorn.id}>
                <Link to={`/SaleUnicorns/${unicorn.id}`}>{unicorn.name} au prix de : {unicorn.price}  </Link>
                </List.Item>
                

                )}
        </div>
    )

} 

export default AllUnicorns