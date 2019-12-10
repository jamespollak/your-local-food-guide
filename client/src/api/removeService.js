import axios from "axios";

export default class removeService {
  constructor() {
    this.service = axios.delete({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  removeBusiness = async id => {
    const { data } = await this.service.post("/places", { id });
    return data;
  };
}
