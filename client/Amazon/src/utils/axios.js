import axios from 'axios';
import { productURL } from '../API/endPoint';

export const instance = axios.create({
  baseURL: productURL,
});
