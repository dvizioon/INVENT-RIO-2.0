
$.ajax({
    url: 'http://localhost:3000/visualizarSessao',
    method: 'GET',
    success: function (response) {
        // Supondo que a resposta seja um array de objetos como [{ nome: "Tintas" }, { nome: "Pincéis" }, ...]
        response.forEach(function (item) {

            console.log(item)
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


$("#cadastrarProdutos").click(function (event) {

    // Recuperar os valores dos campos do formulário usando jQuery
    var productName = $("#productName").val();
    var productPrice = $("#productPrice").val();
    var productCode = $("#productCode").val();
    var productDate = $("#productDate").val();
    var productSection = $("#productSection").val();

    // Verificar se todos os campos estão preenchidos
    if (productName === "" || productPrice === "" || productCode === "" || productDate === "" || productSection === "") {
        // Emitir um alerta para indicar que o produto foi cadastrado com sucesso
        Swal.fire({
            title: "Erro Campos Vazios!",
            icon: "error"
        });

    } else {
        // Emitir um alerta indicando que todos os campos devem ser preenchidos
        Swal.fire({
            title: "Produto Cadastrado!",
            icon: "success"
        });

        var dados = {
            productName: productName,
            productPrice: productPrice,
            productCode: productCode,
            productDate: productDate,
            productSection: productSection
        };

        $.ajax({
            url: 'http://localhost:3000/CriarProdutos', // Altere o caminho do arquivo PHP conforme necessário
            method: 'POST',
            data: dados,
            success: function (response) {
                console.log(response);
                // Faça algo com a resposta do servidor, se necessário
            },
            error: function () {
                console.log('Erro na chamada AJAX');
            }
        });
    }
});
