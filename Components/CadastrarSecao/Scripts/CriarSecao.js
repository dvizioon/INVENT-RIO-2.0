$.ajax({
    url: 'http://localhost:3000/visualizarSessao',
    method: 'GET',
    success: function (response) {
        // Criar um novo card com a resposta do servidor
        response.forEach(element => {
            var dataHoje = new Date().toLocaleDateString('pt-BR');
            var cardHtml = `<div class="card" data-id="${element}">
    <div class="card-header">${element}</div>
    <div class="card-body">
        <p>Data: ${dataHoje}</p>
        <button class="delete-btn" onclick="deleteSecao('${element}')"><i class="fas fa-trash-alt"></i></button>
    </div>
</div>`;
            // Adicionar o card na div .pastas
            $('.pastas').append(cardHtml);
        });
    },
    error: function () {
        console.log('Erro na chamada AJAX');
    }
});



function deleteSecao(idSession) {
  
    Swal.fire({
        title: `Risco Dados não podem ser Restaurado`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Deletar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: `seção ${idSession} Deletada`,
                icon: "success"
            });

            $.ajax({
                url: 'http://localhost:3000/DelSecao/' + idSession,
                method: 'DELETE',
                success: function (response) {
                    $(`.card[data-id='${idSession}']`).remove();
                },
                error: function () {
                    console.log('Erro na chamada AJAX');
                }
            });
        }
    });
    
}

$("#cadastrarSecao").click(function (event) {
    // Recuperar os valores dos campos do formulário usando jQuery
    var productName = $("#productSecao").val();

    // Verificar se todos os campos estão preenchidos
    if (productName === "") {
        // Emitir um alerta para indicar que todos os campos devem ser preenchidos
        Swal.fire({
            title: "Erro Campos Vazios!",
            icon: "error"
        });
    } else {
        // Emitir um alerta indicando que todos os campos devem ser preenchidos
        window.location.reload()

        var dados = {
            productSecao: productName,
        };

        $.ajax({
            url: 'http://localhost:3000/CriarSecao',
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
