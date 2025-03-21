const { DataTypes } = require('sequelize'); 
const sequelize = require('./index'); 
const Produto = sequelize.define('Produto', { 
imagem: { 
    type: DataTypes.STRING, 
    allowNull: false, 
},
titulo: { 
    type: DataTypes.STRING, 
    allowNull: false, 
},
descricao: { 
    type: DataTypes.STRING, 
    allowNull: false, 
},
preco: { 
    type: DataTypes.STRING, 
    allowNull: false, 
}
}); 
Produto.sync({ alter: true }) // Sincroniza a tabela no banco de dados 
.then(() => console.log("Tabela Produto sincronizada!")) 
.catch((err) => console.error("Erro ao sincronizar tabela:", err)); 
module.exports = Produto;