module.exports = {
    name: 'ban',
    description: 'Bane um usuário do servidor.',
    async execute(message, args) {
        if (!message.member.permissions.has('BanMembers')) {
            return message.reply('Você não tem permissão para usar esse comando.');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Você precisa mencionar um usuário para banir.');
        }

        await message.guild.members.ban(user, { reason: args.slice(1).join(' ') })
            .then(() => {
                message.channel.send(`Usuário ${user.tag} banido com sucesso!`);
            })
            .catch(err => {
                console.error(err);
                message.channel.send('Houve um erro ao tentar banir o usuário.');
            });
}};