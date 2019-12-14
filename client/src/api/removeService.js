import axios from "axios";

export default class removeService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  removeBusiness = async id => {
    debugger;
    const { data } = await this.service.delete("/places", { id });
    return data;
  };
}
