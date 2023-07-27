const express = require("express");
const app = express();
const Sequelize = require('sequelize');
const mysql = require("mysql");
const cors = require("cors")

const port = 3001

const sequelize = new Sequelize('crudgames', 'root', '4uJx68#w', {
  host: "localhost",
  dialect: "mysql",

})

sequelize.authenticate().then(()=>{
  console.log("Conectado com sucesso");
}).catch((erro)=>{
  console.log("Falha ao se conectar: ", erro);
});

const Game = sequelize.define('games', {
  idgames: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  }
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res)=>{
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;

  Game.create({
    name: name,
    cost: cost,
    category: category,
  })
});

app.get("/getCards", async (req, res)=>{
  const games = await Game.findAll();
  res.send(JSON.stringify(games, null, 2));
});

app.put("/edit", (req, res) => {
  const { idgames } = req.body;
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;

  console.log("idgames: ", idgames);
  console.log("name: ", name);
  console.log("cost: ", cost);
  console.log("category: ", category);

  Game.update({
    name: name,
    cost: cost,
    category: category,
  },
  {
    where: { idgames: idgames }
  }).then(result => {
    console.log("Resultado do Update: ", result); 
  }).catch(err => {
    console.log("Erro no Update: ", err);
  });
});

app.delete("/delete/:idgames", (req, res)=>{
  const {idgames} = req.params;
  Game.destroy({
    where: {
      idgames: idgames
    }
  }).then(response => console.log(`Sucesso /delete/${idgames}`, response))
  .catch(err => console.log(`Erro /delete/${idgames}`, err))
});

app.listen(port, () => {
  console.log(`Rodando servidor na porta ${port} `);
});