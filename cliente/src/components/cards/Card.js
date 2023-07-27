import React from "react"; 

import FormDialog from "../dialog/Dialog";

import "./card.css"

export default function Card(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickCard = () => {
    setOpen(true)
  }

  return (
    <>
    <FormDialog 
      open={open} 
      setOpen={setOpen} 
      name={props.name} 
      category={props.category} 
      cost={props.cost} 
      listCard={props.listCard}
      setListCard={props.setListCard}
      idgames={props.idgames}
    />
    <div className="card-container" onClick={()=> handleClickCard()}>
      <h1 className="card--title">{ props.name }</h1>
      <p className="card--category">{ props.category }</p>
      <p className="card--dost">R${ props.cost }</p>
    </div>
    </>
  );
};