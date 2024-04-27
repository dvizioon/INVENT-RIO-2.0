const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


function Servidor(port) {
    // Middleware que registra a data e hora de cada solicitação
    app.use((req, res, next) => {
        console.log('Time:', Date.now());
        next();
    });

    // Rota que responde a uma solicitação GET para a raiz
    app.get('/', (req, res) => {
        res.send(`
            <pre>
API DE DADOS PONTIGUAR

    Rotas:
         /CriarProdutos
         /CriarSecao
         /DelSecao/:secaoName
         /visualizarSessao
         /visualizarSessaoAdnFiles

         <span>Não Incluir JWT</span>
            </pre>
        `);
    });

    // app.post('/CriarProdutos', (req, res) => {
    //     // Acessando os dados do corpo da requisição
        
    //     var dados = {
    //         productName: req.body.productName,
    //         productPrice: req.body.productPrice,
    //         productCode: req.body.productCode,
    //         productDate: req.body.productDate,
    //         productSection: req.body.productSection
    //     };

    //     const pastaSections = './Sections';
    //     const procurarpasta = path.join(pastaSections, dados.productSection);
    //     // Aqui você pode adicionar lógica para lidar com os dados recebidos
    //     console.log(dados);
        
    //     if (!fs.existsSync(pastaSections)) {
    //         // Se não existir, criar a pasta 'Sections'
    //         fs.mkdirSync(pastaSections, { recursive: true });
    //         console.log('Pasta Sections criada.');
    //     }
    //     // Enviar uma resposta para o cliente
    //     res.send('Produto recebido!');
    // });

    app.post('/CriarProdutos', (req, res) => {
        // Acessando os dados do corpo da requisição
        var dados = {
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productCode: req.body.productCode,
            productDate: req.body.productDate,
            productSection: req.body.productSection
        };

        const pastaSections = './Sections';
        const procurarpasta = path.join(pastaSections, dados.productSection);

        // Verificar se a pasta 'Sections' existe
        if (!fs.existsSync(pastaSections)) {
            // Se não existir, criar a pasta 'Sections'
            fs.mkdirSync(pastaSections, { recursive: true });
            console.log('Pasta Sections criada.');
        }

        // Criar o nome do arquivo com o formato 'codigo_nome_data.json'
        const nomeArquivo = `${dados.productCode}.json`;
        const caminhoArquivo = path.join(procurarpasta, nomeArquivo);

        // Escrever as informações no arquivo .json
        fs.writeFileSync(caminhoArquivo, JSON.stringify(dados, null, 2), 'utf8');
        console.log(`Arquivo ${nomeArquivo} criado com sucesso.`);

        // Enviar uma resposta para o cliente
        res.send(`Produto ${dados.productName} recebido e arquivo criado!`);
    });

    app.post('/CriarSecao', (req, res) => {
        const pastaSections = './Sections';
        const secaoName = req.body.productSecao;
        const pastaNovaSecao = path.join(pastaSections, secaoName);

        // Verificar se a pasta 'Sections' existe
        if (!fs.existsSync(pastaSections)) {
            // Se não existir, criar a pasta 'Sections'
            fs.mkdirSync(pastaSections, { recursive: true });
            console.log('Pasta Sections criada.');
        }

        // Verificar se a subpasta já existe
        if (!fs.existsSync(pastaNovaSecao)) {
            // Se não existir, criar a subpasta com o nome da seção
            fs.mkdirSync(pastaNovaSecao, { recursive: true });
            console.log(`Pasta ${secaoName} criada dentro de Sections.`);
            res.send('Secao Criada!');
        } else {
            console.log(`A pasta ${secaoName} já existe dentro de Sections.`);
            res.send('Secao já existe.');
        }
    });

    app.delete('/DelSecao/:secaoName', (req, res) => {
        const pastaSections = './Sections';
        const secaoName = req.params.secaoName;
        const pastaSecao = path.join(pastaSections, secaoName);

        // Verificar se a subpasta existe
        if (fs.existsSync(pastaSecao)) {
            // Se existir, deletar a subpasta
            fs.rmdirSync(pastaSecao, { recursive: true });
            console.log(`Pasta ${secaoName} deletada de Sections.`);
            res.send(`Secao ${secaoName} deletada com sucesso!`);
        } else {
            console.log(`A pasta ${secaoName} não existe dentro de Sections.`);
            res.status(404).send('Secao não encontrada.');
        }
    });

    app.get('/visualizarSessao', (req, res) => {
        const pasta = './Sections';
        fs.readdir(pasta, { withFileTypes: true }, (err, itens) => {
            if (err) {
                console.log(err)
                return res.status(500).send('Erro ao listar itens da pasta');
            }
            const diretorios = itens
                .filter(item => item.isDirectory())
                .map(diretorio => diretorio.name);
            res.status(200).json(diretorios);
        });
    });


    app.get('/visualizarSessaoAdnFiles', (req, res) => {
        const pasta = './Sections';
        let promessas = [];

        // Lê o diretório principal
        fs.readdir(pasta, { withFileTypes: true }, (err, pastas) => {
            if (err) {
                return res.status(500).send('Erro ao listar pastas');
            }

            // Filtra apenas subdiretórios
            let subpastas = pastas.filter(dirent => dirent.isDirectory());

            // Processa cada subpasta
            subpastas.forEach(subpasta => {
                let caminhoSubpasta = path.join(pasta, subpasta.name);

                // Cria uma promessa para cada subpasta
                let promessa = new Promise((resolve, reject) => {
                    // Lê cada subpasta
                    fs.readdir(caminhoSubpasta, { withFileTypes: true }, (err, arquivos) => {
                        if (err) {
                            reject(`Erro ao listar arquivos da subpasta ${subpasta.name}`);
                        }

                        let listaDeArquivos = arquivos
                            .filter(arquivo => arquivo.isFile())
                            .map(arquivo => {
                                let caminhoArquivo = path.join(caminhoSubpasta, arquivo.name);
                                let conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf8');
                                return {
                                    nome: arquivo.name,
                                    conteudo: conteudoArquivo,
                                    sessaoArquivo: subpasta.name
                                };
                            });
                        resolve(listaDeArquivos);
                    });
                });
                promessas.push(promessa);
            });

            // Espera todas as promessas serem resolvidas
            Promise.all(promessas)
                .then(listasDeArquivos => {
                    // Concatena todas as listas de arquivos em uma única lista
                    let todosArquivos = [].concat.apply([], listasDeArquivos);
                    res.json(todosArquivos);
                })
                .catch(erro => {
                    res.status(500).send(erro);
                });
        });
    });

    

    app.listen(port, () => {
        console.log('Servidor rodando na porta ', port);
    });
}

module.exports = Servidor;
