const { Server } = require("socket.io");
const Triqui = require("./triqui");

const userNames = {};

const triqui = new Triqui();

const socket = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    io.sockets.emit("userNames", Object.keys(userNames));
    io.sockets.emit("clearBoard", triqui.board);

    // Chat
    socket.on("newUser", (userName, isCreated) => {
      if (userName in userNames) {
        return isCreated(true);
      }
      isCreated(false);
      socket.userName = userName;
      userNames[socket.userName] = socket;
      io.sockets.emit("userNames", Object.keys(userNames));
    });

    socket.on("newMessage", (message) => {
      io.sockets.emit("message", {
        userName: socket.userName,
        message: message,
      });
    });
    // End Chat

    //Game
    socket.on("move", (index, info) => {
      if (!userNames[socket.userName]) {
        return info("No tienes un Apodo!");
      }

      if (triqui.makeMove(socket.userName[0], index)) {
        if (triqui.isWinning(socket.userName[0])) {
          triqui.clearBoard();
          io.sockets.emit("winner", socket.userName);
          io.sockets.emit("clearBoard", triqui.board);
          return;
        }
        io.sockets.emit("move", { letter: socket.userName[0], index: index });
      }
    });

    socket.on("disconnect", () => {
      delete userNames[socket.userName];

      io.sockets.emit("userNames", Object.keys(userNames));
    });
  });
};

module.exports = socket;
