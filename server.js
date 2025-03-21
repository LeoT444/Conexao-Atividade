const express = require('express'); 
const exphbs = require('express-handlebars'); 
const bodyParser = require('body-parser'); 
const path = require('path'); 
const produtosController = require('./controllers/produtoController'); 
const app = express(); 
// Configuração do Handlebars 
app.engine( 
    'handlebars', 
    exphbs.engine({ 
        defaultLayout: 'layout', 
        layoutsDir: path.join(__dirname, 'views'), 
        partialsDir: path.join(__dirname, 'views/partials') 
    }) 
); 
app.set('view engine', 'handlebars'); 
// Middlewares 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public'))); 
// Rotas 
app.get('/', produtosController.exibirLista); 
app.get('/produtos/adicionar', produtosController.exibirAdicionarProduto); 
app.post('/produtos', produtosController.adicionarProduto); 
app.get('/produtos/:id/editar', produtosController.exibirEdicao); 
app.post('/produtos/:id/editar', produtosController.editarProduto); 
app.get('/produtos/:id/excluir', produtosController.excluirProduto); 
// Servidor 
const PORT = 8081; 
app.listen(PORT, () => { 
    console.log(`Servidor rodando em http://localhost:${PORT}`); 
});