// Array de códigos predefinidos
var codigos = ["222222", "111111", "000000"];

// Função para gerar um nome aleatório para o produto
function generateRandomProductName() {
    var randomProductNumber = Math.floor(Math.random() * 100) + 1;
    var randomProductName = "Produto " + randomProductNumber;
    document.getElementById("productName").value = randomProductName;
}

// Função para gerar um preço aleatório entre 1 e 100
function generateRandomPrice() {
    var randomPrice = Math.floor(Math.random() * 100) + 1;
    document.getElementById("productPrice").value = randomPrice;
}

// Função para gerar uma data aleatória dentro de um intervalo de tempo
function generateRandomDate() {
    var startDate = new Date(2020, 0, 1); // Início do intervalo (01/01/2020)
    var endDate = new Date(); // Fim do intervalo (data atual)
    var randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    var formattedDate = randomDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    document.getElementById("productDate").value = formattedDate;
}

// Função para gerar um código aleatório a partir da lista predefinida
function generateRandomCode() {
    var randomIndex = Math.floor(Math.random() * codigos.length);
    var randomCode = codigos[randomIndex];
    document.getElementById("productCode").value = randomCode;
}

// Função para selecionar aleatoriamente uma seção
function generateRandomSection() {

    $.ajax({
        url: 'http://localhost:3000/visualizarSessao',
        method: 'GET',
        success: function (response) {
            // Supondo que a resposta seja um array de objetos como [{ nome: "Tintas" }, { nome: "Pincéis" }, ...]
            var sections = response; // Adicione mais opções conforme necessário
            var randomIndex = Math.floor(Math.random() * sections.length);
            var randomSection = sections[randomIndex];
            document.getElementById("productSection").value = randomSection;
        },
        error: function () {
            console.log('Erro na chamada AJAX');
        }
    });
 
}

// Função para gerar todos os valores aleatórios
function generateRandomValues() {
    generateRandomPrice();
    generateRandomDate();
    generateRandomCode();
    generateRandomSection();
    generateRandomProductName()
}

