const { Server } = require("socket.io");
const Triqui = require("./triqui");

const userNames = {};
const userGames = {};

const TYPE_NAME = 1;
const HAS_GAME = 2;

const socket = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    io.sockets.emit("userNames", Object.keys(userNames));
    io.sockets.emit("newGame", Object.keys(userGames));

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

    socket.on("newGame", (hasName) => {
      if (!socket.userName) {
        return hasName(TYPE_NAME);
      }

      if(socket.userGame) {
        return hasName(HAS_GAME);
      }

      const triqui = new Triqui();
      socket.userGame = `${socket.userName}: ${triqui.code}`;
      userGames[socket.userGame] = triqui;
      io.sockets.emit("newGame", Object.keys(userGames));
    });

    socket.on("disconnect", () => {
      delete userNames[socket.userName];
      delete userGames[socket.userGame];

      io.sockets.emit("userNames", Object.keys(userNames));
      io.sockets.emit("newGame", Object.keys(userGames));
    });
  });
};

module.exports = socket;
