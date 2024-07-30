import db_connection from "../DB/connection.js";
import { globalResponse } from "./middlewares/globalResponse.js";
import Postrouter from "./modules/Post/post.routes.js";
import { downloadVideo } from "tiktok-api-downloader";

import router from "./modules/User/user.routes.js";
export const initiateApp = (app, express) => {
  const port = process.env.PORT;

  app.use(express.json());
  app.use("/auth", router);
  app.use("/post", Postrouter);

  app.use(globalResponse);
  db_connection();

  app.get("/", (req, res) => res.json("games-corner API by Mahmoud Sayed"));
  app.get("/download", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }

  try {
    let response = await downloadVideo(url);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      error: "Failed to download video",
    });
  }
});

  app.listen(port, () =>
    console.log(`games-corner listening on port ${port}!`)
  );
};
