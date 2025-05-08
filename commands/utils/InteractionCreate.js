const { COLORS } = require('../../utils/colors');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    try {
      console.log('Interação recebida:', interaction.customId); // Log para verificar o ID da interação
      console.log('Tipo de interação:', interaction.type); // Log para verificar o tipo de interação

      if (!interaction.isStringSelectMenu()) {
        console.log('Interação ignorada: não é um menu de seleção.');
        return;
      }

      if (interaction.customId !== 'color-roles') {
        console.log(`Interação ignorada: customId esperado "color-roles", recebido "${interaction.customId}".`);
        return;
      }

      // Responde imediatamente para evitar falha por tempo limite
      await interaction.deferReply({ ephemeral: true });
      console.log('Resposta deferida com sucesso.');

      if (!interaction.guild) {
        console.log('Interação falhou: guild não encontrado.');
        return interaction.editReply({ content: '❌ Este comando só pode ser usado em servidores.' });
      }

      const value = interaction.values[0];
      console.log('Valor selecionado no menu:', value); // Log para verificar o valor selecionado

      const role = interaction.guild.roles.cache.get(value);
      if (!role) {
        console.log(`Cargo não encontrado para o valor: ${value}`);
        return interaction.editReply({ content: '❌ Cargo não encontrado.' });
      }

      console.log('Cargo encontrado:', role.name); // Log para verificar o cargo encontrado

      const member = interaction.member;
      console.log('Usuário que interagiu:', member.user.tag); // Log para verificar o usuário

      const hasRole = member.roles.cache.has(role.id);
      console.log(`Usuário já possui o cargo? ${hasRole}`); // Log para verificar se o usuário já possui o cargo

      // Remove outras cores
      const allColorIds = COLORS.map(c => c.roleId).filter(id => id); // Filtra apenas IDs válidos
      console.log('IDs de cargos de cores disponíveis:', allColorIds); // Log para verificar os IDs de cargos de cores

      const rolesToRemove = member.roles.cache.filter(r => allColorIds.includes(r.id));
      console.log('Cargos a serem removidos:', rolesToRemove.map(r => r.name)); // Log para verificar os cargos que serão removidos

      await member.roles.remove(rolesToRemove);
      console.log('Cargos removidos com sucesso.');

      // Adiciona ou remove a role selecionada
      if (!hasRole) {
        await member.roles.add(role);
        console.log(`Cargo ${role.name} adicionado ao usuário.`);
        return interaction.editReply({ content: `✅ Cargo **${role.name}** adicionado!` });
      } else {
        console.log(`Cargo ${role.name} já estava atribuído ao usuário.`);
        return interaction.editReply({ content: `🔻 Cargo **${role.name}** já estava atribuído.` });
      }
    } catch (error) {
      console.error('Erro ao processar a interação:', error); // Log para capturar erros
      return interaction.editReply({ content: '❌ Ocorreu um erro ao processar sua solicitação.' });
    }
  },
};