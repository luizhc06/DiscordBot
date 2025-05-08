module.exports = {
    name: 'say',
    description: 'Faz o bot repetir uma mensagem.',
    async execute(message, args) {
      if (!args.length) {
        return message.reply('❌ Você precisa fornecer uma mensagem para eu repetir!');
      }
  
      const text = args.join(' '); // Junta os argumentos em uma string
      await message.channel.send(text); // Envia a mensagem no canal
      console.log(`[INFO] Comando say executado por ${message.author.tag}: ${text}`);
    },
  };