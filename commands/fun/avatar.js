module.exports = {
    name: 'avatar',
    description: 'Mostra o avatar de um usuário.', 
    async execute(message, args) {
        const user = message.mentions.users.first() || message.author; // Se um usuário for mencionado, use-o; caso contrário, use o autor da mensagem
        const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 }); // Obtém a URL do avatar do usuário

        const embed = {
            color: 0x0099ff,
            title: `${user.username}'s Avatar`,
            image: {
                url: avatarURL,
            },
            timestamp: new Date(),
        };

        await message.channel.send({ embeds: [embed] }); // Envia o embed com o avatar
    }};