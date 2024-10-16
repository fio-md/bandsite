const myKey = "4f79940f-76b6-4c8e-bbbd-68dc9d9b5709";

class BandSiteApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";
  }
  async postComment(commentObj) {
    const response = await axios.post(
      `${this.baseURL}comments?api_key=${this.apiKey}`,
      commentObj
    );
    return response.data;
  }
  async getComments() {
    const response = await axios.get(`${this.baseURL}comments?api_key=${this.apiKey}`);
    return response.data.sort((a, b) => b.timestamp - a.timestamp);
  }
  async getShows() {
    const response = await axios.get(`${this.baseURL}shows?api_key=${this.apiKey}`);
    return response.data;
  }
}
