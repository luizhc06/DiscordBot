module.exports = {
    name: 'ping',
    description: 'Mostra a latência do bot',
    async execute(message) {
      try {
        // Envia uma mensagem inicial
        const sentMessage = await message.channel.send('🏓 Pinging...');
        
        // Calcula as latências
        const botLatency = sentMessage.createdTimestamp - message.createdTimestamp;
        const apiLatency = Math.round(message.client.ws.ping);
        
        // Edita a mensagem com os resultados
        await sentMessage.edit(`🏓 Pong!\n• Latência do bot: ${botLatency}ms\n• Latência da API: ${apiLatency}ms`);
        
      } catch (error) {
        console.error('Erro no comando ping:', error);
        message.reply('Ocorreu um erro ao verificar a latência.').catch(console.error);
      }
    }
  };