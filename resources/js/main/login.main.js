import { LoginModel } from "../models/login.model.js";
import { LoginView } from "../views/login.view.js";
import { LoginContr } from "../controllers/login.contr.js";

const contr = new LoginContr(new LoginModel(), new LoginView());

$(async () => {
  await contr.init();
})