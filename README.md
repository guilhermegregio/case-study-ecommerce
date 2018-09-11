# Case Study - E-COMMERCE

> Case Study: Implementação da arquitetura [arquitetura pdf], foi implementado o module catalog.

## Desenvolvimento

### Install

Instalar as dependencias

```
npm run install
```

### Rodar local

Para iniciar localmente todos os processos utilize o script abaixo

```
node index.js
```

### Gerar imagens

Para rodar o build e gerar todas a imagens docker use:

```
npm run build
```

### Rodar todo o ecossistema no docker com docker-compose

```
docker-compose up
```

### Adicionar mensagens na fila

Para ativar/desativar lojas publicando mensagens na fila

```
curl -d '{"steam": true, "psn": false, "xbox": false}' http://localhost:4151/pub\?topic\=app_config_stores
```

### Convenção de mensagens de commit

<http://karma-runner.github.io/2.0/dev/git-commit-msg.html>

> Para as mensagens de commit foi utilizado um padrão do karma

## Screenshots

### Desktop

![desktop][screenshot desktop]

### Mobile

![mobile][screenshot mobile]

### TODOS

- [x] Adicionar configurações de server que estão habilitados xbox, steam, psn
- [x] Quebrar metodos getCatalog em mais partes: verifyIndices, createIndeces, getGsmes, updateIndices, etc
- [x] Adicionar integração com NSQ para alterar lojas habilitadas e refazer indices
- [ ] Adicionar testes
- [x] Adicionar documentação, com screenshot, commit messages, etc
- [ ] Configurar docker-compose para subir a aplicação inteira
- [x] Adicionar o lerna para facilitar builds de todos os projetos
- [ ] Criar features para detalhes dos games
- [ ] Criar feature para favoritos

[arquitetura pdf]: ./resources/arquitetura.pdf
[screenshot mobile]: ./resources/screenshot-mobile.png
[screenshot desktop]: ./resources/scrrenshot-desktop.png
