const { DataTypes } = require('sequelize'); 
const sequelize = require('./index'); 
const Fornecedor = sequelize.define('Fornecedor', { 
    nome: { 
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    descricao: { 
        type: DataTypes.STRING, 
        allowNull: false, 
    }
}); 
Fornecedor.sync({ alter: true }) // Sincroniza a tabela no banco de dados 
.then(() => console.log("Tabela Fornecedor sincronizada!")) 
.catch((err) => console.error("Erro ao sincronizar tabela:", err)); 

module.exports = Fornecedor;