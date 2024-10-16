const myKey = "4f79940f-76b6-4c8e-bbbd-68dc9d9b5709";

class BandSiteApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";
  }
  async postComment(commentObj) {
    try {
      const response = await axios.post(
        `${this.baseURL}comments?api_key=${this.apiKey}`,
        commentObj
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  async getComments() {
    try {
      const response = await axios.get(`${this.baseURL}comments?api_key=${this.apiKey}`);
      return response.data.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error(error);
    }
  }
  async getShows() {
    try {
      const response = await axios.get(`${this.baseURL}showdates?api_key=${this.apiKey}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  async likeComment(id) {
    try {
      const response = await axios.put(
        `${this.baseURL}comments/${id}/like?api_key=${this.apiKey}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  async deleteComment(id) {
    try {
      const response = await axios.delete(
        `${this.baseURL}comments/${id}?api_key=${this.apiKey}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
