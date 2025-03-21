const Produto = require('../models/Produto')

module.exports = { 
    async exibirLista(req, res) { 
        try { 
            // Busca todas as produtos no banco 
            const produtos = await Produto.findAll(); 
            // Converte as instâncias do Sequelize em objetos puros 
            const produtosJSON = produtos.map((produto) => produto.toJSON()); 
            // Renderiza a lista de produtos 
            res.render('listaProdutos', { produtos: produtosJSON }); 
        } catch (error) { 
            console.error("Erro ao listar produtos:", error); 
            res.status(500).send("Erro ao carregar as produtos."); 
        } 
    }, 
    exibirAdicionarProduto(req, res) { 
        res.render('adicionarProduto'); 
    }, 
 
    async adicionarProduto(req, res) { 
        try { 
            // Cria uma nova produto no banco 
            await Produto.create({ 
                descricao: req.body.descricao, 
                imagem: req.body.imagem,
                preco: req.body.preco,
                titulo: req.body.titulo
            }); 
            res.redirect('/'); 
        } catch (error) { 
            console.error("Erro ao adicionar produto:", error); 
            res.status(500).send("Erro ao adicionar a produto."); 
        } 
    }, 
 
    async exibirEdicao(req, res) { 
        try { 
            // Busca a produto pelo ID 
            const produto = await Produto.findByPk(req.params.id); 
 
            // Verifica se a produto existe 
            if (!produto) { 
                return res.status(404).send("Produto não encontrada."); 
            } 
 
            // Converte para JSON e envia para a view 
            const produtoJSON = produto.toJSON(); 
            res.render('editaProduto', { produto: produtoJSON }); 
        } catch (error) { 
            console.error("Erro ao carregar produto para edição:", error); 
            res.status(500).send("Erro ao carregar produto para edição."); 
        } 
    }, 
 
    async editarProduto(req, res) { 
        try { 
            const { id } = req.params; 
            // Atualiza a produto no banco de dados 
            const [updatedRows] = await Produto.update( 
                { 
                    descricao: req.body.descricao, 
                    imagem: req.body.imagem,
                    preco: req.body.preco,
                    titulo: req.body.titulo 
                }, 
                { where: { id } } 
            ); 
            // Verifica se alguma linha foi atualizada 
            if (updatedRows === 0) { 
                return res.status(404).send("Produto não encontrada para edição.");
            } 
            res.redirect('/'); 
        } catch (error) { 
            console.error("Erro ao editar produto:", error); 
            res.status(500).send("Erro ao editar a produto."); 
        } 
    }, 
 
    async excluirProduto(req, res) { 
        try { 
            const { id } = req.params; 
            // Remove a produto do banco de dados 
            const deletedRows = await Produto.destroy({ where: { id } }); 
            if (deletedRows === 0) { 
                return res.status(404).send("Produto não encontrada para exclusão."); 
            } 
            res.redirect('/'); 
        } catch (error) { 
            console.error("Erro ao excluir produto:", error); 
            res.status(500).send("Erro ao excluir a produto."); 
        } 
    } 
}; 