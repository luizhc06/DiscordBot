const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

const COLORS = [
    { label: 'Vermelho', value: 'Vermelho', emoji: '🔴', color: 'Red' },
    { label: 'Verde', value: 'Verde', emoji: '🟢', color: 'Green' },
    { label: 'Azul', value: 'Azul', emoji: '🔵', color: 'Blue' },
    { label: 'Amarelo', value: 'Amarelo', emoji: '🟡', color: 'Yellow' },
    { label: 'Laranja', value: 'Laranja', emoji: '🟠', color: 'Orange' },
    { label: 'Roxo', value: 'Roxo', emoji: '🟣', color: 'Purple' },
    { label: 'Rosa', value: 'Rosa', emoji: '🌸', color: '#FF69B4' }, // hotpink
    { label: 'Ciano', value: 'Ciano', emoji: '💎', color: 'Aqua' },
    { label: 'Branco', value: 'Branco', emoji: '⬜', color: 'White' },
    { label: 'Preto', value: 'Preto', emoji: '⬛', color: 'DarkButNotBlack' },
    { label: 'Cinza', value: 'Cinza', emoji: '⚫', color: 'Grey' },
    { label: 'Marrom', value: 'Marrom', emoji: '🟫', color: '#8B4513' }, // saddle brown
    { label: 'Azul Claro', value: 'Azul Claro', emoji: '💠', color: 'LightBlue' },
    { label: 'Verde Limão', value: 'Verde Limão', emoji: '🍈', color: '#32CD32' },
    { label: 'Magenta', value: 'Magenta', emoji: '🧃', color: '#FF00FF' },
    { label: 'Dourado', value: 'Dourado', emoji: '✨', color: 'Gold' },
  ];
  
module.exports = {
  sendMenu: async (channel) => {
    const guild = channel.guild;

    // Verifica e cria roles se não existirem
    for (const roleData of COLORS) {
      let role = guild.roles.cache.find(r => r.name === roleData.value);
      if (!role) {
        try {
          role = await guild.roles.create({
            name: roleData.value,
            color: roleData.color,
            mentionable: false,
            reason: 'Role de cor criada automaticamente pelo bot',
          });
          console.log(`Criado role: ${role.name}`);
        } catch (err) {
          console.error(`Erro ao criar role ${roleData.value}:`, err);
        }
      }
    }

    // Criar menu de seleção
    const menu = new StringSelectMenuBuilder()
      .setCustomId('color_roles')
      .setPlaceholder('Escolha uma cor')
      .addOptions(COLORS.map(r => ({ label: r.label, value: r.value, emoji: r.emoji })));

    const row = new ActionRowBuilder().addComponents(menu);
    await channel.send({ content: 'Escolha sua cor favorita:', components: [row] });
  },

  handle: async (interaction) => {
    const value = interaction.values[0];
    const role = interaction.guild.roles.cache.find(r => r.name === value);
    if (!role) return interaction.reply({ content: 'Cargo não encontrado.', ephemeral: true });

    const hasRole = interaction.member.roles.cache.has(role.id);

    if (hasRole) {
      await interaction.member.roles.remove(role);
      return interaction.reply({ content: `🔻 Cargo **${role.name}** removido.`, ephemeral: true });
    } else {
      // Remover outras roles de cor antes
      const colorRoleNames = COLORS.map(c => c.value);
      const rolesToRemove = interaction.member.roles.cache.filter(r => colorRoleNames.includes(r.name));
      await interaction.member.roles.remove(rolesToRemove);

      await interaction.member.roles.add(role);
      return interaction.reply({ content: `✅ Cargo **${role.name}** adicionado!`, ephemeral: true });
    }
  }
};