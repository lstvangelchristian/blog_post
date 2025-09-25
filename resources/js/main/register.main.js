import { RegisterModel } from "../models/register.model.js";
import { RegisterView } from "../views/register.view.js";
import { RegisterContr } from "../controllers/register.contr";

const contr = new RegisterContr(new RegisterModel(), new RegisterView());

$(async () => {
  await contr.init();
})