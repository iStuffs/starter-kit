import axios from 'axios';
import params from './config';
import config from '../../config';


const ai = axios.create(params);
const debugResponse = ai.interceptors.response.use((response) => {
    console.log(response.data);
    return response;
});

const debugRequest = ai.interceptors.request.use((request) => {
    console.log(request);
    return request;
});


if (!config.debug) {
    ai.interceptors.response.eject(debugResponse);
    ai.interceptors.request.eject(debugRequest);
}

export default ai;
