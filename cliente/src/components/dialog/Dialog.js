import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Axios from 'axios'

export default function FormDialog(props) {

  const idgames = props.idgames

  const [editName, setEditName] = useState({
    name: props.name,
  });
  const [editCost, setEditCost] = useState({
    cost: props.cost,
  });
  const [editCategory, setEditCategory] = useState({
    category: props.category,
  });

  const handleEditGame = () => {
    Axios.put("http://localhost:3001/edit", {
      idgames: props.idgames,
      name: editName.name,
      cost: editCost.cost,
      category: editCategory.category,
    });
    console.log("idgames: ", props.idgames);
    console.log("editName: ", editName);
    console.log("editCost: ", editCost);
    console.log("editCategory: ", editCategory);
    handleClose();
  };

  async function handleDeletGame() {
    await Axios.delete(`http://localhost:3001/delete/${idgames}`)
    .then(response => console.log("Axios.delete response: ", response))
    .catch(err => console.log("Axios.delete err: ", err));
  }

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handlChangeValuesName = (value) => {
    console.log("editName: ", editName);
    setEditName(prevState => {
      return { ...prevState, name: value.target.value }
    });
    console.log("editName: ", editName);
  }

  const handlChangeValuesCost = (value) => {
    console.log("editCost: ", editCost);
    setEditCost(prevState => {
      return { ...prevState, cost: Number(value.target.value) }
    });
    console.log("editCost: ", editCost);
  }

  const handlChangeValuesCategory = (value) => {
    console.log("editCategory: ", editCategory);
    setEditCategory(prevState => {
      return { ...prevState, category: value.target.value }
    });
    console.log("editCategory: ", editCategory);
  }

  return (
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome do jogo"
            defaultValue={props.name}
            onChange={handlChangeValuesName}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="cost"
            label="Preço"
            defaultValue={props.cost}
            onChange={handlChangeValuesCost}
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Categoria"
            defaultValue={props.category}
            onChange={handlChangeValuesCategory}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleDeletGame}>
            Excluir
          </Button>
          <Button onClick={handleEditGame}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

  );
}