import hello from './modules/hello';
import { answer as axios } from './axios';

hello();
axios.get()
    .then((response) => {
        console.log(response.data.answer);
    })
    .catch((error) => {
        console.warn(error);
    });
