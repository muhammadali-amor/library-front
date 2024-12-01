import {BASE_URL} from "./BaseUrl.js";
import axios from "axios";

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};
export const BASE_CONFIG = {
    doGet: (url) => axios.get(
        `${BASE_URL}${url}`, config
    ),
    doPost: (url, data) => axios.post(
        `${BASE_URL}${url}`, data, config
    ),
    doPut: (url, id, data) => axios.put(
        `${BASE_URL}${url}/${id}`, data, config
    ),
    doDelete: (url, id) => axios.delete(
        `${BASE_URL}${url}/${id}`, config
    ),
    doGetOne: (url, id) => axios.get(
        `${BASE_URL}${url}/${id}`, config
    )
}