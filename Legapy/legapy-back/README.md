# Legapy - Server API

### Como iniciar o servidor
Use o comando `npm start` para iniciar o servidor tanto em desenvolvimento quanto em produção

### Como enviar para produção ou staging (homologação) :tada:

No seu computador, simplesmente digite o comando abaixo, o parametro -m é opcional

```javascript
gulp deploy -m "your message here"
```

Esse comando vai buildar e enviar o código minificado para o repositório de produção.

Para produção, no servidor AWS, abra o console na pasta `"D:\Sites\GanhoMais\API\Producao_node"` e digite os comandos:
```javascript
git pull
npm start
```

Se for staging os comandos são os mesmos, mas a pasta é: `"C:\GanhoMais\api\"`