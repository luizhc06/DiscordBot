require('dotenv').config();
const { Client, GatewayIntentBits, Collections, Partials, Events } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
    ],
});

client.commands = new Collections();

//carregar comandos

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//carregar eventos
client.once(Events.MessageCreate, async message => {
    if (!message.content.startsWith("!" || message.author.bot)) return;
    
    const args = message.content.slice(1).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (command) return;
    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        await message.reply({ content: 'Houve um erro ao executar esse comando!', ephemeral: true });
    }});

//sistema de menu (cores)
const colorRoles = require('./menus/colorRoles.json');
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isStringSelectMenu()) {
        await colorRoles.handle(interaction);
    }});

client.once(Events.ClientReady, () => {
    console.log(`Bot online como: ${client.user.tag}`);
    client.user.setActivity('!ajuda', { type: 'LISTENING' });
});
client.login(process.env.TOKEN)
    .then(() => console.log('Bot conectado com sucesso!'))
    .catch(err => console.error('Erro ao conectar o bot:', err));

