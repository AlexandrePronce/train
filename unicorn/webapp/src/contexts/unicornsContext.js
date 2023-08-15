import React, { useState, useEffect } from "react";
import unicornsAPI from "services/unicornsApi";
import salesAPI from "services/salesApi";


const Context = React.createContext(null);

const ProviderWrapper = ({ children }) => {
  const [unicorns, setUnicorns] = useState([]);
  const[sales,setsales] =useState([]);
 

  const initialLoadAction = () => {
    unicornsAPI.getAll().then((ac) => {
        setUnicorns(ac);
    });
    salesAPI.getAll().then((ac) => {
      setsales(ac);
    });
  };
  useEffect(initialLoadAction, []);

  const getUnicornWithSales =(id)=>{
    return sales.filter((sale) => sale.unicorn === id)
  } ;
  const deleteSale=(id)=>{
    salesAPI.deleteOneById(id).then((r) => console.log(r));
    setsales(sales.filter((s) => s.id !== id));
  }
  const addNewSale = async (ns) => {
    try {
      const newSale = await salesAPI.createSale(ns);
      setsales([...sales, newSale]); // Mettre à jour l'état avec la nouvelle vente
    } catch (error) {
      console.error("Erreur lors de l'ajout de la vente :", error);
    }
  };
  const addNewUnicorn = async (ns) => {
    try {
      const newUnicorn = await unicornsAPI.createUnicorn(ns);
      setUnicorns([...unicorns, newUnicorn]); // Mettre à jour l'état avec la nouvelle vente
    } catch (error) {
      console.error("Erreur lors de l'ajout de la vente :", error);
    }
  };

  const exposedValue = {
    unicorns,
    sales,
    getUnicornWithSales,
    deleteSale,
    addNewSale,
    addNewUnicorn
  };


  return <Context.Provider value={exposedValue}>{children}</Context.Provider>;
};

export { Context, ProviderWrapper };