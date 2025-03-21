const Fornecedor = require('../models/Fornecedor')

module.exports = { 
    async exibirLista(req, res) { 
        try { 
            // Busca todas as fornecedores no banco 
            const fornecedores = await Fornecedor.findAll(); 
            // Converte as instâncias do Sequelize em objetos puros 
            const fornecedoresJSON = fornecedores.map((fornecedor) => fornecedor.toJSON()); 
            // Renderiza a lista de fornecedores 
            res.render('listaFornecedores', { fornecedores: fornecedoresJSON }); 
        } catch (error) { 
            console.error("Erro ao listar fornecedores:", error); 
            res.status(500).send("Erro ao carregar as fornecedores."); 
        } 
    }, 
    exibirAdicionarFornecedor(req, res) { 
        res.render('adicionarFornecedor'); 
    }, 
 
    async adicionarFornecedor(req, res) { 
        try { 
            // Cria uma nova fornecedor no banco 
            await Fornecedor.create({ 
                descricao: req.body.descricao, 
                nome: req.body.nome
            }); 
            res.redirect('/'); 
        } catch (error) { 
            console.error("Erro ao adicionar fornecedor:", error); 
            res.status(500).send("Erro ao adicionar a fornecedor."); 
        } 
    }, 
 
    async exibirEdicao(req, res) { 
        try { 
            // Busca a fornecedor pelo ID 
            const fornecedor = await Fornecedor.findByPk(req.params.id); 
 
            // Verifica se a fornecedor existe 
            if (!fornecedor) { 
                return res.status(404).send("Fornecedor não encontrada."); 
            } 
 
            // Converte para JSON e envia para a view 
            const fornecedorJSON = fornecedor.toJSON(); 
            res.render('editaFornecedor', { fornecedor: fornecedorJSON }); 
        } catch (error) { 
            console.error("Erro ao carregar fornecedor para edição:", error); 
            res.status(500).send("Erro ao carregar fornecedor para edição."); 
        } 
    }, 
 
    async editarFornecedor(req, res) { 
        try { 
            const { id } = req.params; 
            // Atualiza a fornecedor no banco de dados 
            const [updatedRows] = await Fornecedor.update( 
                { 
                    descricao: req.body.descricao, 
                    nome: req.body.nome 
                }, 
                { where: { id } } 
            ); 
            // Verifica se alguma linha foi atualizada 
            if (updatedRows === 0) { 
                return res.status(404).send("Fornecedor não encontrado para edição.");
            } 
            res.redirect('/'); 
        } catch (error) { 
            console.error("Erro ao editar fornecedor:", error); 
            res.status(500).send("Erro ao editar o fornecedor."); 
        } 
    }, 
 
    async excluirFornecedor(req, res) { 
        try { 
            const { id } = req.params; 
            // Remove a fornecedor do banco de dados 
            const deletedRows = await Fornecedor.destroy({ where: { id } }); 
            if (deletedRows === 0) { 
                return res.status(404).send("Fornecedor não encontrada para exclusão."); 
            } 
            res.redirect('/'); 
        } catch (error) { 
            console.error("Erro ao excluir fornecedor:", error); 
            res.status(500).send("Erro ao excluir a fornecedor."); 
        } 
    } 
}; 