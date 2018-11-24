# Sobre o projeto
Foram usados react e sails. Para tanto, necesita do cli do sails. 

yarn add global sails

O sails foi utilizado com a base temporária interna para facilitar os testes.
Pode ser executado com outros mecanismos, mas só testei com a base interna e MongoDB.
Para executar com MongoDB é necessário modificar o arquivo ./backend/config/model.js e modificar o field ID como instruido no arquivo.

# Como executar
Para executar o back, siga o comando:
sails lift --appPath= .\backend\

Para executar o front, siga o comando:
yarn --cwd .\frontend\ start

