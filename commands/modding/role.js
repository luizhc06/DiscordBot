module.exports = {
    name: 'role',
    description: 'Adiciona ou remove um cargo de um usuário.',
    async execute(message, args) {
        if (!message.member.permissions.has('ManageRoles')) {
            return message.reply('Você não tem permissão para usar esse comando.');
        }

        const roleName = args[0];
        const action = args[1]; // 'add' ou 'remove'

        if (!message.mentions.members.first()) {
            return message.reply('Você precisa mencionar um usuário para adicionar/remover o cargo.');
        }        

        const role = message.guild.roles.cache.find(r => r.name === roleName);
        if (!role) {
            return message.reply('Cargo não encontrado.');
        }

        if (role.position >= message.guild.me.roles.highest.position) {
            return message.reply('Não consigo gerenciar esse cargo. Ele está acima do meu cargo mais alto.');
        }        

        const member = message.mentions.members.first() || message.member;

        if (action === 'add') {
            await member.roles.add(role)
                .then(() => {
                    message.channel.send(`Cargo ${role.name} adicionado a ${member.user.tag} com sucesso!`);
                })
                .catch(err => {
                    console.error(err);
                    message.channel.send('Houve um erro ao tentar adicionar o cargo.');
                });
        } else if (action === 'remove') {
            await member.roles.remove(role)
                .then(() => {
                    message.channel.send(`Cargo ${role.name} removido de ${member.user.tag} com sucesso!`);
                })
                .catch(err => {
                    console.error(err);
                    message.channel.send('Houve um erro ao tentar remover o cargo.');
                });
        } else {
            message.reply('Ação inválida. Use "add" ou "remove".');
        }
    }};