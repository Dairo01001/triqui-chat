const socket = io();

const TYPE_NAME = 1;
const HAS_GAME = 2;

// Chat
const formNameElement = document.getElementById("form-name");
const userNameElement = document.getElementById("user-name");
const userNamesElement = document.getElementById("user-names");
const chatElement = document.getElementById("chat");
const formMessageElement = document.getElementById("form-message");
const messagesElement = document.getElementById("messages");
const userMessageElement = document.getElementById("user-message");

const isCreated = (flag) => {
  if (flag) {
    return alert("El usuario ya Existe!");
  }
  chatElement.hidden = false;
};

formNameElement.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!userNameElement.value) return alert("Igresa tu nombre o apodo!");
  socket.emit("newUser", userNameElement.value, isCreated);
  userNameElement.value = "";
});

formMessageElement.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!userMessageElement.value) {
    return alert("No has escrito nada!");
  }
  socket.emit("newMessage", userMessageElement.value);
  userMessageElement.value = "";
});

socket.on("message", (data) => {
  const liElement = document.createElement("li");
  liElement.innerHTML = `<p> ${data.userName}: ${data.message}</p>`;

  messagesElement.appendChild(liElement);
});

socket.on("userNames", (userNames) => {
  let nameList = "";
  for (let index = 0; index < userNames.length; index++) {
    nameList += `<li> ${userNames[index]}</li>`;
  }
  userNamesElement.innerHTML = nameList;
});
// End chat

// Games

const createGameElement = document.getElementById("create-game");
const gamesCreatedElement = document.getElementById("games-created");

const cellsElement = document.getElementsByClassName("cell");

const hasName = (op) => {
  if (op === TYPE_NAME) {
    return alert("Primero ingresa un Apodo!");
  }

  if (op === HAS_GAME) {
    return alert("Ya tienes una Partida Activa!");
  }
};

createGameElement.addEventListener("click", () => {
  socket.emit("newGame", hasName);
});

socket.on("newGame", (userGames) => {
  let userGamesList = "";
  for (let i = 0; i < userGames.length; i++) {
    userGamesList += `<li>${userGames[i]}</li>`;
  }
  gamesCreatedElement.innerHTML = userGamesList;
});
