const { COLORS } = require('../utils/colors');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId !== 'color_roles') return;

    const value = interaction.values[0];
    const role = interaction.guild.roles.cache.find(r => r.name === value); // <-- Corrigido aqui

    if (!role) {
      return interaction.reply({ content: '❌ Cargo não encontrado.', ephemeral: true });
    }

    const member = interaction.member;
    const hasRole = member.roles.cache.has(role.id);

    // Remove outras cores
    const allColorNames = COLORS.map(c => c.value);
    const rolesToRemove = member.roles.cache.filter(r => allColorNames.includes(r.name));
    await member.roles.remove(rolesToRemove);

    // Adiciona ou remove a role selecionada
    if (!hasRole) {
      await member.roles.add(role);
      return interaction.reply({ content: `✅ Cargo **${role.name}** adicionado!`, ephemeral: true });
    } else {
      return interaction.reply({ content: `🔻 Cargo **${role.name}** já estava atribuído.`, ephemeral: true });
    }
  },
};
