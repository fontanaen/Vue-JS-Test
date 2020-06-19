import axios from 'axios';

const url = 'http://localhost:3000/';

class HTTP_services {
    // Get
    static getUsers() {
        const pro = new Promise((resolve, reject) => {
            try {
                const res = axios.get(url);
                const data = res.data;
                resolve (data);
            } catch (err) {
                reject(err);
            }
        });

        return Promise.resolve(pro)
    }

    // Post
    static logIn(id, password) {
        return axios.post(url, {
            id : id,
            password : password
        });
    }
}

export default HTTP_services