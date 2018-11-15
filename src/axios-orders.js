import axios from 'axios';

const instance = axios.create({
baseURL: 'https://adigs-burger-project.firebaseio.com/'

});

export default instance;
