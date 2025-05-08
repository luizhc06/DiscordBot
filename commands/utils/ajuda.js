const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ajuda',
    description: 'Mostra todos os comandos disponíveis.',
    execute(message, args) {
        // Cria o Embed
        const embed = new EmbedBuilder()
            .setColor('#2b2d31') // Cor do embed (cinza escuro)
            .setTitle('📚 Central de Ajuda')
            .setDescription(`Prefixo do bot: \`${message.client.prefix}\`\n\n**Selecione uma categoria:**`)
            .addFields(
                // Categoria Diversão
                {
                    name: '🎭 Diversão',
                    value: '`avatar` - Mostra o avatar de um usuário.',
                    inline: true
                },
                // Categoria Moderação
                {
                    name: '🛡️ Moderação',
                    value: '`ban` - Bane um usuário.\n`kick` - Expulsa um usuário.\n`clear` - Limpa mensagens.',
                    inline: true
                },
                // Categoria Roles (Cargos)
                {
                    name: '🎨 Cargos',
                    value: '`role` - Gerencia cargos.\n`setupRoles` - Configura menu de cores.',
                    inline: false
                }
            )
            .setFooter({ text: `Solicitado por ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        // Envia o Embed
        message.reply({ embeds: [embed] });
    }
};