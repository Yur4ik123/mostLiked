import Http from "../core/http.service";
import { ENV } from "../config/env";

export default class WinnersService {
  /**
   *
   * @param {number} _part номер сраницы
   * @param {number} _limit количество отдаваемых победителей
   */
  async getWinners(_part, _limit) {
    try {
      const http = new Http();
      let response = await http.getWinners(
        `${ENV.apiUrl}/public/winners?part=${_part}&limit=${_limit}`
      );
      if (!response) return new Error(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
