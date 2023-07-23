import express from "express";
import config from "./config/index.js";
import routes from "./routes.js";
import initLoaders from "./loaders/index.js";
import userRouter from "./router/user.router.js";
import inviteRouter from "./router/invite.router.js";
import configsRouter from "./router/configs.router..js";

// iscD1lQF1aB7gDxy

async function startServer() {
  const app = express();
  // Express middlewares
  await initLoaders(app);

  // Routes
  app.use(routes.API_USER_ROUTE, userRouter); // user router
  app.use(routes.API_INVITE_ROUTE, inviteRouter); // invite router
  app.use(routes.API_CONFIGS_ROUTE, configsRouter); // configs router

  app.listen(config.server.port, () => {
    console.log(`Server listening on port ${config.server.port}`);
  });
}

// Starting up the server
startServer();
