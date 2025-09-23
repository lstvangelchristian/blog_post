import { PublicFeedModel } from "../models/public-feed.model.js";
import { PublicFeedView } from "../views/public-feed.view.js";
import { PublicFeedContr } from "../controllers/public-feed.contr.js";

$(async function() {
  const contr = new PublicFeedContr(new PublicFeedModel(), new PublicFeedView);
  await contr.init();
})