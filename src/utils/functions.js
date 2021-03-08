export function requestError(err) {
  console.log(err);
  alert(
    'erro requisicao, lembre-se que o github restringe o numero de chamadas caso voce nao esteja logado'
  );
  window.location.href = '/';
}
