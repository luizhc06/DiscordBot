require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Partials, Events } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');
const colors = require('colors'); // Opcional: para cores no console

// --- CONFIGURAÇÃO INICIAL ---
const PREFIX = '|';
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
client.commands = new Collection();

// --- SISTEMA DE LOGS ---
const log = (message, type = 'info') => {
    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}`;
    
    // Cores no console (opcional)
    const coloredLog = {
        'INFO': colors.gray(logMessage),
        'SUCCESS': colors.green(logMessage),
        'WARN': colors.yellow(logMessage),
        'ERROR': colors.red(logMessage),
    }[type.toUpperCase()] || logMessage;

    console.log(coloredLog);
    fs.appendFileSync('logs.txt', logMessage + '\n'); // Salva em arquivo
};

// --- CARREGAMENTO DE COMANDOS ---
const loadCommands = () => {
    const commandFolders = ['fun', 'modding', 'roles', 'utils'];
    
    commandFolders.forEach(folder => {
        const folderPath = path.join(__dirname, 'commands', folder);
        if (!fs.existsSync(folderPath)) {
            log(`Pasta de comandos não encontrada: ${folder}`, 'warn');
            return;
        }

        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
        commandFiles.forEach(file => {
            const commandPath = path.join(folderPath, file);
            try {
                const command = require(commandPath);
                if (command.name) {
                    client.commands.set(command.name, command);
                    log(`Comando carregado: ${command.name.padEnd(15)} (${file})`, 'success');
                }
            } catch (error) {
                log(`Falha ao carregar ${file}: ${error.message}`, 'error');
            }
        });
    });
};

loadCommands();

// --- EVENTOS DO BOT ---

// Mensagens com prefixo
client.on(Events.MessageCreate, message => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (!command) {
        log(`Comando não encontrado: "${commandName}" (${message.author.tag})`, 'warn');
        return message.reply('Comando não encontrado. Use `|ajuda` para ver a lista.');
    }

    try {
        command.execute(message, args);
        log(`Comando executado: ${commandName.padEnd(15)} (${message.author.tag})`, 'info');
    } catch (error) {
        log(`ERRO no comando ${commandName}: ${error.stack}`, 'error');
        message.reply('❌ Ocorreu um erro ao executar este comando.');
    }
});

// Interações (slash commands)
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        log(`Interação não registrada: ${interaction.commandName}`, 'warn');
        return;
    }

    try {
        await command.execute(interaction);
        log(`Interação executada: ${interaction.commandName.padEnd(15)} (${interaction.user.tag})`, 'info');
    } catch (error) {
        log(`ERRO na interação ${interaction.commandName}: ${error.stack}`, 'error');
        await interaction.reply({ content: '❌ Erro interno.', ephemeral: true });
    }
});

// Bot pronto
client.once(Events.ClientReady, () => {
    log(`Bot online como: ${client.user.tag}`, 'success');
    client.user.setActivity(`${PREFIX}ajuda`, { type: 'LISTENING' });
});

// Login
client.login(process.env.TOKEN)
    .then(() => log('Conectado ao Discord!', 'success'))
    .catch(err => log(`FALHA NA CONEXÃO: ${err.message}`, 'error'));