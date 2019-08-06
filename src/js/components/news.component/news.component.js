import "./news.scss";

import NewsService from "../../services/news.service";
import Routing from "../../core/routing.serice";

export default class NewsComponent {
  constructor() {
    this._newsService = new NewsService();
    this._routing = new Routing();
  }

  async beforeRender() {
    this.newsElement = await this._newsService
      .getNews()
      .then(response => {
        return response;
      })
      .catch(response => {
        console.log(response);
      });
  }
  render() {
    let news = "";
    for (let i = 0; i < this.newsElement.news.length; i++) {
      news += `<div class='news'> 
    <img src="${this.newsElement.news[i].pictures[0].url}" >
    </div>`;
    }
    return `<div class="news-wrap">
    <h2>News</h2>
     ${news}
      </div>`;
  }
}
