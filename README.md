# SafeWayAPI

API responsável pelo gerenciamento da aplicação de controle de viagens escolares

## Techs

- Javascript
- Express.js


## Passo a passo

Instale as dependências
~~~shell
npm install
~~~

Instale o CLI do Firebase
~~~shell
npm install -g firebase-tools
~~~

Após a instalação do client do firebase, você deve configurar usuário e senha
~~~shell
firebase login
~~~

Agora, após a autenticação, para consultar os projetos armazenados na conta do firebase
~~~shell
firebase projects:list
~~~

Para iniciar o ambiente local do firebase CLI e configurar o projeto
~~~shell
firebase init
~~~

- Selecione a opção "Functions"
- escolha "Use an existing project" e selecione o projeto onde criou o banco de dados no firebase
- Escolha a linguagem Javascript
- Instale todas as dependências
- Vá no projeto do firebase e acesse configurações do projeto > Contas de Serviço > gerar nova chave privada
- Armazene a nova chave gerada em app > config como "secret_key.json"

Firebase configurado!

para iniciar a aplicação execute
~~~shell
npm run start
~~~