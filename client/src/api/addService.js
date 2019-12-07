import axios from "axios";

export default class addService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  addBusiness = async payload => {
    const { data } = await this.service.post("/places", payload);
    return data;
  };
}
