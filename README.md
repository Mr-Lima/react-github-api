# Aplicação React utilizando api do github

Objetivo
Desenvolver página em react que dado um usuário liste os repositórios públicos

## Features
- pesquisa de usuário
- autocomplete
- listagem de repositórios de um usuário pesquisado
- responsividade
- resumo do usuário do usuário pesquisado
- autenticação OAuth
- dar star em um repositório

### Observações

- Infelizmente a api do github ainda não possui um jeito de fazer totalmente o fluxo de OAuth pelo frontend (https://github.com/isaacs/github/issues/330), então para isso é preciso no mínimo utilizar um servidor de proxy para fazer a request de autenticação final. Utilizei um proxy que foi criado justamente para essas situações em desenvolvimento, acesse https://cors-anywhere.herokuapp.com/ para liberar temporariamente o proxy nesta aplicação.
- Como era um projeto simples e de um desenvolvedor não foi utilizado typescript e/ou redux, que são tecnologias que possuo conhecimento mas só deixariam o projeto desnecessariamente maior
- Nenhuma biblioteca de componentes/interface foi utilizada
- A aplicação foi desenvolvida utilizando os novos fuction-components/react-hooks, mas poderia também ter sido utilazados class-components
- Padronização de código com eslint

### Detalhes das páginas
- Na primeira página, o input de pesquisa possui algumas animações tanto no input em si quanto no autocomplete
- o input também só irá fazer a pesquisa do auto complete quando o usuário parar de digitar, assim economizando o número de requests e o consumo de dados
- Não é necessário que para entrar em alguma lista de repositórios você use necessáriamente o input, você pode utilizar o próprio link ex.: http://localhost:3000/usuario-que-deseja-pesquisar. Assim é possível um usuário que já tiver um link entrar diretamente na página
- Para dispositivos pequenos, a partir de uma certa largura, os detalhes do usuário iram desaparecer para a melhor visualização da lista

### Referências
- https://docs.github.com/en/rest
- http://animista.net/ para parte das animações
- google imagens para plano de fundos e outras imagens de preenchimento
- e o rei de todos, https://stackoverflow.com/
