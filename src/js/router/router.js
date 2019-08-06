/* Import */
import routes from "./routes.config";
import NavbarComponent from "../components/navbar.component/navbar.component";
import Routing from "../core/routing.serice";
import ActiveRoute from "../core/active.route.service";
import AuthGuard from "../guard/auth.guard";
const activeRoute = new ActiveRoute();
const _routing = new Routing();

const authGuard = new AuthGuard();

export default class Router {
  async route() {
    const container = document.getElementsByTagName("app-container")[0];
    const header = document.getElementsByTagName("app-header")[0];

    const request = activeRoute.parseRequestURL();
    const url =
      (request.resourse ? "/" + request.resourse : "/") +
      (request.id ? "/:id" : "");
    const component = routes[url]
      ? routes[url]["component"]
      : routes["**"]["component"];
    const guard = routes[url] ? routes[url]["guard"] : routes["**"]["guard"];

    if (guard) {
      if (!guard.canActivate()) {
        _routing.navigate("/login");
        return;
      }
    }

    if (authGuard.canActivate()) {
      const navbarComponent = new NavbarComponent();
      navbarComponent.beforeRender && (await navbarComponent.beforeRender());
      header.innerHTML = navbarComponent.render();
      navbarComponent.afterRender && navbarComponent.afterRender();
    } else {
      header.innerHTML = "";
    }

    component.beforeRender && (await component.beforeRender());
    container.innerHTML = component.render();
    component.afterRender && component.afterRender();
  }
}
