if ($(".web-view-header").html() === "") {
    $(".web-view-header").html("Processando...")
}

function carregarcomponente(diretorio) {
    localStorage.setItem("Diretorio", diretorio)

    $.ajax({
        url: diretorio,
        method: 'GET',
        success: function (response) {

            var htmlRender = $.parseHTML(response);
            // Filtra os elementos para encontrar o título
            var title = $(htmlRender).filter('title').text();

            $(".web-view-header").html(title)
            $(".web-view-content").html(response)

            // console.log(response);
            // console.log(title); 
        },
        error: function () {
            console.log('Erro na chamada AJAX');
        }
    });
}

if ($(".web-view-content").html() === "") {
    const directory = localStorage.getItem("Diretorio")
    carregarcomponente(directory)
}
else {
    const directory = localStorage.getItem("Diretorio")
    carregarcomponente(directory)
}