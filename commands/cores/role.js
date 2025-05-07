const { COLORS } = require('../../utils/colors'); // separa a lista para reuso (opcional)

module.exports = {
    name: 'role',
    description: 'Gerencia cargos de cores',
    async execute(message, args) {
        if (!message.member.permissions.has('ManageRoles')) {
            return message.reply('❌ Você não tem permissão para usar este comando.');
        }

        const subcommand = args[0];

        if (subcommand === 'create') {
            const guild = message.guild;
            const createdRoles = [];

            for (const roleData of COLORS) {
                const existing = guild.roles.cache.find(r => r.name === roleData.value);
                if (!existing) {
                    try {
                        await guild.roles.create({
                            name: roleData.value,
                            color: roleData.color,
                            mentionable: false,
                            reason: 'Cargo de cor criado pelo bot',
                        });
                        createdRoles.push(roleData.value);
                    } catch (err) {
                        console.error(`Erro ao criar o cargo ${roleData.value}:`, err);
                        await message.channel.send(`⚠️ Erro ao criar o cargo ${roleData.value}.`);
                    }
                }
            }

            if (createdRoles.length > 0) {
                message.channel.send(`✅ Cargos criados: ${createdRoles.join(', ')}`);
            } else {
                message.channel.send('ℹ️ Todos os cargos de cor já existem.');
            }
        } else {
            message.reply('Uso: `!role create` para criar os cargos de cores.');
        }
    },
};
