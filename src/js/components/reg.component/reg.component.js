import AuthService from "../../services/auth.service";

export default class RegComponent {
  constructor() {
    this._authService = new AuthService();
  }
  render() {
    return `<div class="reg-form-wrap d-flex mt-10">
    <div class="reg-form mx-auto my-auto">
      <h3>SIGN UP</h3>
      <form name="regForm" novalidate>
        <input type="text" id="firstName" placeholder="First Name" />
        <input type="text" id="lastName" placeholder="Last Name" />
        <input type="text" id="nickName" placeholder="Nick Name" />
        <h3>Date of Birth</h3>
        <select class="form-control" id="dayBirth">
          <option>Day</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <select class="form-control" id="monthBirth">
          <option>Month</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <select class="form-control" id="yearBirth">
          <option>Year</option>
          <option>1992</option>
          <option>1993</option>
          <option>1994</option>
          <option>1995</option>
          <option>1996</option>
        </select>
        <select class="form-control" id="countryBirth">
          <option>Cauntry</option>
          <option>Ukrain</option>
          <option>Russia</option>
          <option>USA</option>
          <option>Great Britain</option>
        </select>
        <select class="form-control" id="cityBirth">
          <option>City</option>
          <option>Kyiv</option>
          <option>Kharkiv</option>
          <option>Lviv</option>
          <option>Zhytomir</option>
        </select>
        <select class="form-control" id="gender">
          <option>Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input type="email" id="emailAddress" placeholder="Email address" />
        <input type="tel" id="phoneNumber" placeholder="Phone number" />
        <input type="password" id="password" placeholder="Password" />
        <input
          type="password"
          id="repeatPassword"
          placeholder="Repear password"
        />
        <button id="signUp">Sign Up</button>
      </form>
    </div>
  </div>`;
  }
  afterRender() {
    document.forms["regForm"].addEventListener("submit", e => {
      e.preventDefault();
      const first_name = e.target.elements["firstName"].value;
      const last_name = e.target.elements["lastName"].value;
      const nickname = e.target.elements["nickName"].value;
      const date_of_birth_day = e.target.elements["dayBirth"].value;
      const date_of_birth_month = e.target.elements["monthBirth"].value;
      const date_of_birth_year = e.target.elements["yearBirth"].value;
      const country = e.target.elements["countryBirth"].value;
      const email = e.target.elements["emailAddress"].value;
      const phone = e.target.elements["phoneNumber"].value;
      const password = e.target.elements["password"].value;
      const repeatPassword = e.target.elements["repeatPassword"].value;
      const gender_orientation = e.target.elements["gender"].value;
      const city = e.target.elements["cityBirth"].value;
      const registrationData = {
        email,
        password,
        nickname,
        first_name,
        last_name,
        phone,
        gender_orientation,
        city,
        country,
        date_of_birth_day,
        date_of_birth_month,
        date_of_birth_year
      };
      if (
        !first_name ||
        !last_name ||
        !nickname ||
        !date_of_birth_day ||
        !date_of_birth_month ||
        !date_of_birth_year ||
        !country ||
        !city ||
        !email ||
        !phone ||
        !password ||
        !repeatPassword ||
        !gender_orientation
      ) {
        return alert("Заполните все поля");
      }
      if (password !== repeatPassword) {
        return alert("пароли не совпадают");
      }
      switch (true) {
        case date_of_birth_day === "Day":
          return alert("Выберите день рождения");
        case date_of_birth_month === "Month":
          return alert("Выберите месяц рождения");
        case date_of_birth_year === "Year":
          return alert("Выберите год рождения");
        case country === "Country":
          return alert("Выберите страну");
        case city === "City":
          return alert("Выберите город");
        case gender_orientation === "Gender":
          return alert("Выберите пол");
      }
      this._authService
        .registration(registrationData)
        .then(response => {
          console.log(response);
          alert(response.massage);
        })
        .catch(response => {
          console.log(response.massage);
          console.log(response);
        });
    });
  }
}
