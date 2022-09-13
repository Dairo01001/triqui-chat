const { server, app } = require("./app");
require("./socket")(server);

server.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);
});
