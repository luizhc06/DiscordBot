const COLORS = require('../../utils/colors'); // Certifique-se de que o caminho está correto
const { PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');

console.log('COLORS:', COLORS); // Log para verificar o valor de COLORS

module.exports = {
  name: 'cores',
  description: 'Configura o sistema de cores do servidor',
  async execute(message) {
    try {
      // Verifica permissões
      if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
        return message.reply('❌ Você precisa ter permissão para gerenciar cargos!');
      }

      const guild = message.guild;
      let createdRoles = [];

      // 1. Cria os cargos faltantes
      for (const color of COLORS) {
        try {
          let role = guild.roles.cache.find(r => r.name === color.value);

          if (!role) {
            role = await guild.roles.create({
              name: color.value,
              color: color.color,
              mentionable: false,
              reason: `Cargo de cor automático - ${color.label}`,
            });
            createdRoles.push(role.name);
          }
          // Atualiza o ID no array COLORS
          color.roleId = role.id;
        } catch (error) {
          console.error(`Erro ao criar cargo ${color.value}:`, error);
        }
      }

      // 2. Mostra relatório de criação
      if (createdRoles.length > 0) {
        await message.channel.send(`✅ Cargos criados: ${createdRoles.join(', ')}`);
      } else {
        await message.channel.send('ℹ️ Todos os cargos de cor já existiam no servidor.');
      }

      // 3. Cria embed com a tabela de cores
      const embed = new EmbedBuilder()
        .setTitle('🎨 Cores Disponíveis')
        .setDescription('Reaja com os emojis abaixo para receber a cor correspondente:')
        .setColor('#2b2d31')
        .addFields(
          COLORS.map(color => ({
            name: `${color.emoji} ${color.label}`,
            value: `Cargo: ${color.value}\nCor: \`${color.color}\``,
            inline: true,
          }))
        )
        .setFooter({ text: 'Clique no menu abaixo para selecionar sua cor' });

      // 4. Cria menu interativo
      const menu = new StringSelectMenuBuilder()
        .setCustomId('color-roles')
        .setPlaceholder('Selecione sua cor!')
        .addOptions(
          COLORS.map(color => ({
            label: color.label,
            value: color.roleId,
            emoji: color.emoji,
            description: `Cor ${color.color}`,
          }))
        );

      const row = new ActionRowBuilder().addComponents(menu);

      // 5. Envia tudo
      await message.channel.send({
        embeds: [embed],
        components: [row],
      });
    } catch (error) {
      console.error('Erro ao executar o comando setupRoles:', error);
      message.reply('❌ Ocorreu um erro ao configurar os cargos de cores.');
    }
  },
};