import axios from "axios";

const baseURL = "http://127.0.0.1:8081"; // todo go to env
export const $api = axios.create({ baseURL });
