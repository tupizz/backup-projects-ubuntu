const LISTA_AMIGO_SECRETO = require("./amigosSecretos.json");
const AMIGOS_NAO_SELECIONADOS = [...LISTA_AMIGO_SECRETO];

function secretFriendIsValid(secretFriend, friend) {
  if (secretFriend.phone === friend.phone) {
    return false;
  }

  const existeAmigoNaListaDeNaoSelecionados = AMIGOS_NAO_SELECIONADOS.find(
    amigo => amigo.phone === secretFriend.phone
  );
  if (AMIGOS_NAO_SELECIONADOS.indexOf(secretFriend.phone) === -1) {
    return false;
  }
  return true;
}

(function run() {
  LISTA_AMIGO_SECRETO.forEach((amigo, index) => {
    const randomIndex = Math.floor(
      Math.random() * AMIGOS_NAO_SELECIONADOS.length
    );

    const amigoSecreto = AMIGOS_NAO_SELECIONADOS[randomIndex];
  });
})();
