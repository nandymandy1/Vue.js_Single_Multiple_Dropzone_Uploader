/* eslint-disable */
import axios from 'axios';
import { baseURL } from '../constants';

const API = axios.create({
    baseURL,
});

export default API;