import HomeComponent from "../components/home.component/home.component";
import LoginComponent from "../components/login.component/login.component";
import NotFoundComponent from "../components/notfound.component/notfound.component";
import RegComponent from "../components/reg.component/reg.component";
import UserComponent from "../components/user.component/user.component";
import NewsComponent from "../components/news.component/news.component";
import AuthGuard from "../guard/auth.guard";
import WinnersComponent from "../components/winners.component/winners.component";
const authGuard = new AuthGuard();

const routes = {
  "/": { component: new HomeComponent(), name: "Home" },
  "/login": { component: new LoginComponent(), name: "Login" },
  "**": { component: new NotFoundComponent() },
  "/registration": { component: new RegComponent(), name: "Registration" },
  "/user/:id": {
    component: new UserComponent(),
    name: "My profile",
    guard: authGuard
  },
  "/news": { component: new NewsComponent(), name: "News", guard: authGuard },
  "/winners": { component: new WinnersComponent(), name: "Winners" }
};

export default routes;
