import axios from 'axios';

const url = 'http://localhost:3000/';

class HTTP_services {
    // Get
    static getUsers() {
        return new Promise((resolve, reject) => {
            try {
                (async () => {
                    const res = await axios.get(url);
                    const data = res.data;
                    resolve(data);
                })();
            } catch (err) {
                reject(err);
            }
        });
    }

    // Post
    static logIn(email, password) {
        axios
            .post(url, {
                email : email,
                password : password
            })
            .then((response) => {
                console.log(response);
                return ["true", "sponse"];
            });
    }
}

export default HTTP_services;