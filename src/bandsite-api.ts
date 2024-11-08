import axios from "axios";

export const myKey = "4f79940f-76b6-4c8e-bbbd-68dc9d9b5709";

export class BandSiteApi {
  key: string;
  baseURL: string;
  constructor(apiKey: string) {
    this.key = apiKey;
    this.baseURL = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";
  }
  async postComment(commentObj: { name: string; comment: string }) {
    try {
      const response = await axios.post(
        `${this.baseURL}comments?api_key=${this.key}`,
        commentObj
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  async getComments() {
    try {
      const response: any = await axios.get(
        `${this.baseURL}comments?api_key=${this.key}`
      );
      return response.data.sort((a: any, b: any) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error(error);
    }
  }
  async getShows() {
    try {
      const response = await axios.get(
        `${this.baseURL}showdates?api_key=${this.key}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  async likeComment(id: string) {
    try {
      const response = await axios.put(
        `${this.baseURL}comments/${id}/like?api_key=${this.key}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  async deleteComment(id: string) {
    try {
      const response = await axios.delete(
        `${this.baseURL}comments/${id}?api_key=${this.key}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
