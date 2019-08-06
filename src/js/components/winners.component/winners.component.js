import "./winners.scss";
import WinnersService from "../../services/winners.service";

/* init */
let part = 1 //номер страницы
let limit = 15; //количество отдаваемых победителей

export default class WinnersComponent {
  constructor() {
    this._winnersService = new WinnersService();
  }

  async beforeRender() {
    this.winnersElement = await this._winnersService
      .getWinners(part, limit)
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(response => {
        console.log(response);
      });
  }

  render() {
    let card = "";

    for (let i = 0; i < this.winnersElement.winners.length; i++) {
      card += `<div class="card">
      <img src="${
        this.winnersElement.winners[i].member_id.user_id.avatar
      }" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title__user">${
          this.winnersElement.winners[i].member_id.user_id.full_name
        }</h5>
        <p class="card-text">User ID: ${
          this.winnersElement.winners[i].member_id.user_id._id
        }</p>
      </div>
    </div>`;
    }
    return ` 
    <div class="card-wrap"> 
    
${card}</div>`
  }
}
