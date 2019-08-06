import Http from "../core/http.service";
import { ENV } from "../config/env";
//import NewsComponent from "../components/news.component/news.component";

export default class NewsService {
  async getNews() {
    const userToken = localStorage.getItem("most_liked_user_token");
    try {
      const http = new Http();
      let response = await http.getNews(`${ENV.apiUrl}/public/news`, userToken);
      if (!response) return new Error(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
