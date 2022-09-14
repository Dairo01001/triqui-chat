const socket = io();

const alertElement = document.getElementById("alert");

const custonAlert = (msg) => {  
  alertElement.textContent = msg;
  alertElement.hidden = false;
  setTimeout(() => {
    alertElement.hidden = true;
  }, 2000);
}

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
    return custonAlert("El usuario ya Existe!");
  }
  chatElement.hidden = false;
};

formNameElement.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!userNameElement.value) return custonAlert("Igresa tu nombre o apodo!");
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
const cellsElement = document.getElementsByClassName("cell");
const letterElement = document.getElementById("letter");

const info = (msg) => {
  return custonAlert(msg);
};

for (let i = 0; i < cellsElement.length; i++) {
  cellsElement[i].addEventListener("click", () => {
    socket.emit("move", i, info);
  });
}

socket.on("move", ({ letter, index }) => {
  letterElement.textContent = letter;
  cellsElement[index].textContent = letter;
});

socket.on("winner", ({winner, letter}) => {
  custonAlert(`${winner} con la letra ${letter} ha ganado!`);
})

socket.on("clearBoard", (board) => {
  for(let i = 0; i < cellsElement.length; i++) {
    cellsElement[i].textContent = board[i];
  }
})
