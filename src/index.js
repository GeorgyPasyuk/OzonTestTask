import { MainPage } from "./pages/MainPage";
import Router from "./utils/Router";

const Routes = {
  Index: "/",
};

window.addEventListener("DOMContentLoaded", async () => {
  Router.use(Routes.Index, MainPage);
});
