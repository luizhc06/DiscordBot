module.exports = {
    name: 'kick',
    description: 'Expulsa um usuário do servidor.',
    async execute(message, args) {
        if (!message.member.permissions.has('KickMembers')) {
            return message.reply('Você não tem permissão para usar esse comando.');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Você precisa mencionar um usuário para expulsar.');
        }

        await message.guild.members.kick(user, { reason: args.slice(1).join(' ') })
            .then(() => {
                message.channel.send(`Usuário ${user.tag} expulso com sucesso!`);
            })
            .catch(err => {
                console.error(err);
                message.channel.send('Houve um erro ao tentar expulsar o usuário.');
            });
    }
}