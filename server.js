const express = require('express'); 
const exphbs = require('express-handlebars'); 
const bodyParser = require('body-parser'); 
const path = require('path'); 
const pC = require('./controllers/produtoController'); 

const fC = require('./controllers/fornecedorController');

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
app.get('/', pC.exibirLista); 
app.get('/produtos/adicionar', pC.exibirAdicionarProduto); 
app.post('/produtos', pC.adicionarProduto); 
app.get('/produtos/:id/editar', pC.exibirEdicao); 
app.post('/produtos/:id/editar', pC.editarProduto); 
app.get('/produtos/:id/excluir', pC.excluirProduto); 

//---------------------------

app.get('/fornecedores', fC.exibirLista); 
app.get('/fornecedores/adicionar', fC.exibirAdicionarFornecedor); 
app.post('/fornecedores', fC.adicionarFornecedor); 
app.get('/fornecedores/:id/editar', fC.exibirEdicao); 
app.post('/fornecedores/:id/editar', fC.editarFornecedor); 
app.get('/fornecedores/:id/excluir', fC.excluirFornecedor); 

// Servidor 
const PORT = 8081; 
app.listen(PORT, () => { 
    console.log(`Servidor rodando em http://localhost:${PORT}`); 
});