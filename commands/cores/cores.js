const { COLORS } = require('../../utils/colors');
const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
  name: 'cores',
  description: 'Envia o menu para escolher cargos de cor',
  async execute(message) {
    const guild = message.guild;

    for (const roleData of COLORS) {
      const role = guild.roles.cache.find(r => r.name === roleData.value);
      if (!role) {
        await guild.roles.create({
          name: roleData.value,
          color: roleData.color,
          mentionable: false,
          reason: 'Criado automaticamente para menu de cores',
        });
      }
    }

    const menu = new StringSelectMenuBuilder()
      .setCustomId('color_roles')
      .setPlaceholder('Escolha sua cor!')
      .addOptions(COLORS.map(c => ({
        label: c.label,
        value: c.value,
        emoji: c.emoji,
      })));

    const row = new ActionRowBuilder().addComponents(menu);
    await message.channel.send({ content: '🎨 Escolha sua cor favorita:', components: [row] });
  },
};
