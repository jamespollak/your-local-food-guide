import axios from "axios";

export default class UserService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }
  getAllUsers = async () => {
    const { data } = await this.service.get("/users");
    return data;
  };
  getUser = async id => {
    const { data } = await this.service.get(`/users/${id}`);
    return data;
  };
}
