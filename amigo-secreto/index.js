var tentativas = 1;
const axios = require("axios");
const nodemailer = require("nodemailer");
var friendList = require("./amigosSecretos.json");
const accountSid = "AC00e547e57e2c6a40ee5183443fe39ade";
const authToken = "6ee84dce8becc2073485d6ace87220ec";
const client = require("twilio")(accountSid, authToken);

function getRandomFriend() {
  var randomIndex = Math.floor(Math.random() * UNSELECTED_IDS.length);
  return getFriendById(UNSELECTED_IDS[randomIndex]);
}

function secretFriendIsValid(secretFriend, friend) {
  if (secretFriend.id === friend.id) {
    return false;
  }
  if (UNSELECTED_IDS.indexOf(secretFriend.id) === -1) {
    return false;
  }
  return true;
}

function getFriendById(id) {
  for (var i = 0; i < friendList.length; ++i) {
    if (friendList[i].id === id) {
      return friendList[i];
    }
  }
  return null;
}

function getNewSecretFriend(friend, isTheLast) {
  var secretFriend = getRandomFriend();

  if (isTheLast) {
    return secretFriend;
  }
  if (secretFriendIsValid(secretFriend, friend)) {
    UNSELECTED_IDS.splice(UNSELECTED_IDS.indexOf(secretFriend.id), 1);
    return secretFriend;
  }
  return getNewSecretFriend(friend, isTheLast);
}

var UNSELECTED_IDS;
function selectFriends() {
  UNSELECTED_IDS = [];
  friendList.map(function(friend) {
    UNSELECTED_IDS.push(friend.id);
  });

  var lastFriend;

  var secretFriend;

  friendList.map(function(friend, index) {
    secretFriend = getNewSecretFriend(friend, index === friendList.length - 1);
    friend.secretFriend = secretFriend.id;
  });

  lastFriend = friendList[friendList.length - 1];

  console.log("Tentativa:", tentativas);

  tentativas++;

  console.log(friendList);
  if (
    !secretFriendIsValid(getFriendById(lastFriend.secretFriend), lastFriend)
  ) {
    selectFriends();
  } else {
    console.log("--- finalizou");
    console.log("-- mandando sms");

    friendList.map(membro => {
      console.log(
        `AMIGO SECRETO DA FAMÍLIA\nBom dia ${
          membro.name
        }, seu amigo secreto é: ${getFriendById(membro.secretFriend).name}!`
      );

      if (membro.phone) {
        // membro.phone = "017996161451";

        client.messages
          .create({
            body: `(Sorteio 03) Boa tarde ${
              membro.name
            }! Seu amigo secreto é: ${
              getFriendById(membro.secretFriend).name
            }.`,
            from: "+5501796161451",
            to: "+551796161451"
          })
          .then(message => console.log(message.sid))
          .catch(error => {
            console.log(error);
          });
      } else {
      }
    });
  }
}

async function enviaEmail(membro) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tadeu.tupiz@gmail.com",
      pass: "123wkfgjr"
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "Amigo secreto <noreply.amigosecreto@gmail.com>",
    replyTo: "noreply.amigosecreto@gmail.com",
    to: membro.email, // list of receivers
    subject: "✔ Resultado de seu Amigo secreto", // Subject line
    text: "Clique para ver mais sobre o amigo secreto", // plain text body
    html: `<b>Bom dia ${membro.name}</b> <p>Seu amigo secreto é: <b>${
      getFriendById(membro.secretFriend).name
    }</b>!</p>` // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

selectFriends();
