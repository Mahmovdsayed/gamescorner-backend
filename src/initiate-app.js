import db_connection from "../DB/connection.js";
import { globalResponse } from "./middlewares/globalResponse.js";
import Postrouter from "./modules/Post/post.routes.js";
import router from "./modules/User/user.routes.js";
export const initiateApp = (app, express) => {
  const port = process.env.PORT;

  app.use(express.json());
  app.use("/auth", router);
  app.use("/post", Postrouter);

  app.use(globalResponse);
  db_connection();

  app.get("/", (req, res) => res.json("movies-cafe API by Mahmoud Sayed"));
  app.listen(port, () => console.log(`movies-cafe listening on port ${port}!`));
};
