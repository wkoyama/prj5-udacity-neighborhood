# Mapa do bairro

Aplicativo que apresenta um mapa de um bairro com locais selecionados contendo informações provenientes da API do Foursquare e prévia de uma imagem retirada do street view. Esse aplicativo é meramente educacional para conclusão do projeto de Nanodegree Fullstack da Udacity. Os modelos dos marcadores foram criados de forma hardcoded porém separado para que em novas implementações venha do back-end e/ou possam ser salvos conforme a separação de responsabilidades.


:warning: **Nota**

**Devido a limitação de requisições da API de detalhes do Foursquare para o tipo de conta, acabei optando por manter o schema da resposta de alguns marcadores fixos.**

## Pré-Requisitos

Ter instalado e configurado o [Yarn](https://yarnpkg.com/pt-BR/)

Caso não tenha, favor seguir o passo a passo [aqui](https://yarnpkg.com/pt-BR/docs/install)


## Executar projeto local

- Baixe o projeto:

```
    git clone https://github.com/wkoyama/prj5-udacity-neighborhood.git
```

- Execute os seguintes comandos:

```
    cd prj5-udacity-neighborhood
 
    yarn install
    
    yarn start
```

Com essa sequência de comandos, executará o app em modo de desenvolvimento.

Abra [http://localhost:3000](http://localhost:3000) para visualizar no seu browser.

A página recarrega se há alterações.

## Produção 

O projeto pode ser minificado e executado em produção conforme documentação gerada do creat-react-app, citado abaixo:

> `npm run build`
>
> Builds the app for production to the `build` folder.<br>
>It correctly bundles React in production mode and optimizes the build for the best performance.
>
>The build is minified and the filenames include the hashes.<br>
>Your app is ready to be deployed!
>
>See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Documentação 

Este projeto foi criado com [Create React App](https://github.com/facebook/create-react-app).
Usei o framework do Bootstrap com React [React-Bootstrap](https://react-bootstrap.github.io/).


Documentação do [React](https://reactjs.org/docs/getting-started.html) usado para a implementação de UI dessa aplicação.

Documentação da API do [Foursquare](https://developer.foursquare.com/docs/api/endpoints) para as informações de lugares.

Documentação da API do [Google Maps/Street View](https://developers.google.com/maps/documentation/) com o mapa, marcadores e infowindow.

## Fontes

O aprendizado de React da unidade extracurricular
[Fundamentos de React](https://classroom.udacity.com/nanodegrees/nd004-br/parts/a74f781e-7ddc-44cb-af41-32fe08a87e7c/modules/82766b2b-1870-4904-aa90-8ccbe63928c5/lessons/9a065aa0-91d4-44a3-ad96-8d9b44be4d11/concepts/96de82e9-38b6-4b05-b30e-fb2edce245d3) da Udacity.

Utilizei como base de ideia e implementação os seguintes links:

- [Using Google Maps in React without custom libraries](https://cuneyt.aliustaoglu.biz/en/using-google-maps-in-react-without-custom-libraries/)
- [google-maps-react makes adding Google Maps Api to a React app a breeze](https://itnext.io/google-maps-react-makes-adding-google-maps-api-to-a-react-app-a-breeze-effb7b89e54)

Ao me deparar com um problema de clicar em um marcador e abrir todos os infowindows, encontrei a solução [aqui](https://github.com/tomchentw/react-google-maps/issues/753#issuecomment-368408940) e mudei a implementação anterior.
