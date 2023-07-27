import React, { useEffect, useState } from "react";
import Axios from "axios";

import Card from "./components/cards/Card";

import './App.css';

function App() {
  const [values, setValues] = useState();
  const [listGames, setListGames] = useState();
  console.log('listGames: ', listGames);
  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    //console.log(values);
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then((response)=>{
      //console.log('Response: ',response);
    }).catch((err)=>{
      //console.log(err);
    });
  };

  useEffect(()=>{
    Axios.get("http://localhost:3001/getCards").then((response)=>{
      //console.log(response);
      setListGames(response.data);
    });
  }, []);

  return (
    <div className="app--container">
      <div className="register--container" >
        <h1 className="register--title">Scrim Shop</h1>
        <input 
          type="text" 
          name="name" 
          placeholder="Nome do Jogo" 
          className="register--input"
          onChange={handleChangeValues}
        />
        <input 
          type="number" 
          name="cost" 
          placeholder="preço" 
          className="register--input"
          onChange={handleChangeValues}
        />
        <input 
          type="text" 
          name="category" 
          placeholder="Categoria" 
          className="register--input"
          onChange={handleChangeValues}
        />
        <button 
          className="register--button"
          onClick={()=> handleClickButton()}
        >
          Cadastrar
        </button>
      </div>
      
      { typeof listGames !== "undefined" && 
        listGames.map((value)=>{
          return (
            <Card 
              key={value.idgames} 
              listCard={listGames}
              setListCard={setListGames}
              idgames={value.idgames}
              name={value.name}
              cost={value.cost}
              category={value.category}
            ></Card>
          )
        })
      }

    </div>
  );
}

export default App;

