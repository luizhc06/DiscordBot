# DiscordBot

Um bot para Discord com funcionalidades personalizadas, como gerenciamento de emojis, comandos de interação.

## 📋 Descrição

Este bot foi desenvolvido para oferecer funcionalidades úteis e interativas para servidores do Discord. Ele inclui comandos como:
- Repetir mensagens (`say`)
- Adicionar emojis personalizados ao servidor (`addemoji`)
- Gerenciar cargos de cores (`cores`)

## 🛠️ Funcionalidades

- **Comando `say`**: Faz o bot repetir uma mensagem e apaga a mensagem original do usuário.
- **Comando `addemoji`**: Adiciona emojis personalizados ao servidor a partir de links ou emojis de outros servidores.
- **Gerenciamento de cores**: Permite que os usuários escolham cargos de cores personalizados.

## 📦 Requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Uma conta no Discord e um servidor onde você tenha permissões de administrador
- Um bot registrado no [Discord Developer Portal](https://discord.com/developers/applications)

## 🚀 Instalação

### **1. Clone o Repositório**
No terminal, execute:
```bash
git clone https://github.com/luizhcastro06/DiscordBot.git
cd DiscordBot
```

### **2. Instale as Dependências**

#### **No Linux**
1. Certifique-se de que o Node.js e o npm estão instalados:
   ```bash
   sudo apt update
   sudo apt install nodejs npm -y
   ```
2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

#### **No Windows**
1. Baixe e instale o [Node.js](https://nodejs.org/).
2. Após a instalação, abra o **Prompt de Comando** ou o **PowerShell** e navegue até a pasta do projeto:
   ```cmd
   cd caminho\para\DiscordBot
   ```
3. Instale as dependências do projeto:
   ```cmd
   npm install
   ```

### **3. Configure o Bot**
Crie um arquivo `.env` na raiz do projeto e adicione as seguintes informações:
```
TOKEN=seu-token-do-bot
CLIENT_ID=seu-client-id
PREFIX=|
```

### **4. Inicie o Bot**
No terminal, execute:
```bash
node index.js
```

## 📜 Comandos

### **1. `say`**
- **Descrição**: Faz o bot repetir uma mensagem e apaga a mensagem original do usuário.
- **Uso**:
  ```
  |say <mensagem>
  ```
- **Exemplo**:
  ```
  |say Olá, mundo!
  ```

### **2. `addemoji`**
- **Descrição**: Adiciona um emoji personalizado ao servidor.
- **Uso**:
  ```
  |addemoji <emoji ou link> <nomeDoEmoji>
  ```
- **Exemplo**:
  ```
  |addemoji https://link.com/emoji.png smile
  |addemoji <:smile:123456789012345678> smile
  ```

### **3. `cores`**
- **Descrição**: Configura o sistema de cores no servidor.
- **Uso**:
  ```
  |cores
  ```

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Siga estas etapas para contribuir:

1. Faça um fork do projeto.
2. Crie uma nova branch:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça suas alterações e commit:
   ```bash
   git commit -m "Adicionei uma nova feature"
   ```
4. Envie suas alterações:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## 🛡️ Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 📞 Contato

Se você tiver dúvidas ou sugestões, entre em contato:

- **GitHub**: [luizhc06](https://github.com/luizhc06)
- **Gmail**: [luizhcastroo06@gmail.com]
