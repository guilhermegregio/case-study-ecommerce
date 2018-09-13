# Case Study - E-COMMERCE

> Case Study: Implementação da arquitetura [arquitetura pdf], foi implementado o module catalog.

## Informações

Frontend esta com SSR então é possivel renderizar a pagina mesmo sem javascript habilitado, isso ajuda no SEO e na performance melhorando o FCP (first contentful paint)

No backend os serviços se comunição por protocolo tcp e a aplicação backend-base faz a ponte entre eles bastando que cada serviço conheça somente o base e ao mandar mensagens ele se vira para mandar mensagens para os demais

Ao solicitar os games na backend-catalog o mesmo verifica se existe dados no elasticsearch e caso não exista faz a soliticação para cada serviço no caso backend-steam, backend-xbox e backend-psn ao receber os dados faz o merge e ajusta a resposta salva no elasticsearch e devolve na resposta da api
Para alterar as configurações de lojas o backend-catalog fica escutando a fila NSQ o topic app_config_stores

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

Para iniciar o frontend localmente

```
npm run start:frontend
```

Para iniciar os serviços de slasticsearch e nsq

```
npm run compose:up
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

### Admin do NSQ

Acesso ao admin do NSQ

<http://localhost:4171/>

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
- [x] Configurar docker-compose para subir a aplicação inteira
- [x] Adicionar o lerna para facilitar builds de todos os projetos
- [ ] Criar features para detalhes dos games
- [ ] Criar feature para favoritos

[arquitetura pdf]: ./resources/arquitetura.pdf
[screenshot mobile]: ./resources/screenshot-mobile.png
[screenshot desktop]: ./resources/scrrenshot-desktop.png
