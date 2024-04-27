$.ajax({
    url: 'http://localhost:3000/visualizarSessao',
    method: 'GET',
    success: function (response) {
        // Supondo que a resposta seja um array de objetos como [{ nome: "Tintas" }, { nome: "Pincéis" }, ...]
        response.forEach(function (item) {

            // console.log(item)
            // Criar um novo elemento option para cada item
            var novaOption = $('<option></option>').val(item).text(item);
            // Adicionar a nova option ao select
            $('#productSection').append(novaOption);
        });
    },
    error: function () {
        console.log('Erro na chamada AJAX');
    }
});


$("#pesquisarProdutos").click(function (event) {
    var secaoSelection = $("#productSection").val();

    $.ajax({
        url: 'http://localhost:3000/visualizarSessaoAdnFiles',
        method: 'GET',
        data: { productSection: secaoSelection }, // Envia a seção como parâmetro de consulta
        success: function (response) {
            // Limpa a lista anterior
            $(".lista-de-produtos").empty();

            // Itera sobre a resposta e adiciona apenas os itens correspondentes à seção selecionada
            response.forEach(function (item) {
                console.log(item)
                if (item.sessaoArquivo === secaoSelection) {
                    // Cria um elemento para cada produto correspondente
                    // console.log(item.conteudo)
                    var dadosProduto = JSON.parse(item.conteudo);

                    var produtoElemento = $('<div></div>').text(dadosProduto.productName + ' - ' + dadosProduto.productPrice);
                    $(".lista-de-produtos").append(produtoElemento);
                }
            });
        },
        error: function () {
            console.log('Erro na chamada AJAX');
        }
    });
});
