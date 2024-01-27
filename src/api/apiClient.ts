import axios from "axios";
import { baseURL } from "./apiEndpoints";

const apiClient = axios.create({ baseURL: baseURL });

export default apiClient;
