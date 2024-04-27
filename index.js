const { app, BrowserWindow, Menu } = require('electron');
const Servidor = require('./Middleware/Servidor')

const criarGerenciador = () => {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        resizable: false,
        darkTheme:false,
        title: "Pontiguar 🧮",
        icon: __dirname + '/Assets/Icon.ico',
    });

    // Desabilitar o menu padrão
    win.setMenu(null);

    // Criar um novo menu personalizado
    const template = [
        {
            label: 'Opções do Inventário',
            submenu: [
                {
                    label: 'Sobre',
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Sair',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    // Injetar CSS personalizado no menu
    win.webContents.on('dom-ready', () => {
        win.webContents.insertCSS(`
            .menubar {
                background-color: #f0f0f0; /* Cor de fundo */
                color: #333; /* Cor do texto */
            }
            .menu {
                background-color: #f0f0f0; /* Cor de fundo */
                color: #333; /* Cor do texto */
            }
            .menu > .menu-item {
                background-color: #f0f0f0; /* Cor de fundo */
                color: #333; /* Cor do texto */
            }
        `);
    });

    win.loadFile('./Pages/Gerenciador.html');

};

app.whenReady().then(() => {
    criarGerenciador()
    Servidor(3000)
});
