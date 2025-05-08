module.exports = {
    name: 'clear',
    description: 'Limpa mensagens do chat.',
    async execute(message, args) {
        // Verifica permissões
        if (!message.member.permissions.has('ManageMessages')) {
            return message.reply('❌ Você precisa da permissão "Gerenciar Mensagens" para usar este comando!');
        }

        // Verifica se o bot tem permissões
        if (!message.guild.members.me.permissions.has('ManageMessages')) {
            return message.reply('❌ Eu não tenho permissão para apagar mensagens aqui!');
        }

        // Valida o parâmetro
        const amount = parseInt(args[0]) + 1; // +1 para incluir a mensagem do comando
        if (isNaN(amount) || amount < 2 || amount > 100) {
            return message.reply('🔢 Por favor, especifique um número entre 1 e 99!');
        }

        try {
            // Deleta as mensagens
            const deleted = await message.channel.bulkDelete(amount, true);
            
            // Envia e depois apaga a confirmação
            const msg = await message.channel.send(`✅ ${deleted.size - 1} mensagens foram limpas!`);
            setTimeout(() => msg.delete(), 3000);
            
        } catch (error) {
            console.error('Erro no comando clear:', error);
            message.reply('❌ Ocorreu um erro ao limpar mensagens. Mensagens com mais de 14 dias não podem ser apagadas em massa.');
        }
    }
};