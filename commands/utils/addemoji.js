module.exports = {
    name: 'addemoji',
    description: 'Adiciona um emoji personalizado ao servidor.',
    async execute(message, args) {
      if (!message.member.permissions.has('ManageEmojisAndStickers')) {
        return message.reply('❌ Você precisa da permissão "Gerenciar Emojis e Figurinhas" para usar este comando.');
      }
  
      const [emojiInput, emojiName] = args;
  
      if (!emojiInput || !emojiName) {
        return message.reply('❌ Você precisa fornecer o emoji ou o link da imagem e o nome do emoji. Exemplo: `|addemoji https://link.com/emoji.png nomeDoEmoji` ou `|addemoji :emoji: nomeDoEmoji`');
      }
  
      let emojiURL;
  
      // Verifica se o input é um emoji personalizado (de outro servidor)
      const customEmojiMatch = emojiInput.match(/<:.+:(\d+)>/); // Regex para capturar o ID do emoji
      if (customEmojiMatch) {
        const emojiId = customEmojiMatch[1];
        emojiURL = `https://cdn.discordapp.com/emojis/${emojiId}.png`;
      } else if (emojiInput.startsWith('http')) {
        // Se for um link direto para uma imagem
        emojiURL = emojiInput;
      } else {
        return message.reply('❌ O emoji fornecido não é válido. Certifique-se de usar um emoji personalizado ou um link de imagem.');
      }
  
      try {
        const emoji = await message.guild.emojis.create({
          attachment: emojiURL,
          name: emojiName,
        });
  
        message.reply(`✅ Emoji adicionado com sucesso: ${emoji}`);
        console.log(`[INFO] Emoji adicionado: ${emojiName} (${emojiURL}) por ${message.author.tag}`);
      } catch (error) {
        console.error('Erro ao adicionar emoji:', error);
        message.reply('❌ Ocorreu um erro ao tentar adicionar o emoji. Verifique se o link da imagem é válido e se o servidor tem espaço para novos emojis.');
      }
    },
  };