module.exports = {
    name: 'clear',
    description: 'Limpa mensagens do chat.',
    async execute(message, args) {
        if (!message.member.permissions.has('ManageMessages')) {
            return message.reply('Você não tem permissão para usar esse comando.');
        }

        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount < 1 || amount > 100) {
            return message.reply('Você precisa fornecer um número entre 1 e 100.');
        }

        await message.channel.bulkDelete(amount, true)
            .then(() => {
                message.channel.send(`Deletadas ${amount} mensagens com sucesso!`);
            })
            .catch(err => {
                console.error(err);
                message.channel.send('Houve um erro ao tentar deletar as mensagens.');
            });
    }
};