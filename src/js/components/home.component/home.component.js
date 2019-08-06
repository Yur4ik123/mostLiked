import "./home.scss";
import Routing from "../../core/routing.serice";
export default class HomeComponent {
  constructor() {
    this._routing = new Routing();
  }
  render() {
    return `<div class="home">
    <div>Home</div>
    <button type="button" class="btn btn-primary btn-lg btn-block" id="login-btn">Login</button>
    <button type="button" class="btn btn-primary btn-lg btn-block" id="registration-btn">Registration</button>
    </div>`;
  }
  afterRender() {
    let button = document.getElementById("login-btn");
    let regbutton = document.getElementById("registration-btn");
    let newsButton = document.getElementById("news-btn");
    button.addEventListener("click", () => {
      this._routing.navigate("/login");
    });
    regbutton.addEventListener("click", () => {
      this._routing.navigate("/registration");
    });
  }
}
