import axios from "axios";
import { baseURL } from "./endpoints";

const apiClient = axios.create({ baseURL: baseURL });

export default apiClient;
