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
    static logIn(email, password, router, session) {
        return new Promise((resolve, reject) => {
            try {
                (async () => {
                    const res = await axios.post(`${url}login`, {email : email, password : password});
                    if (res.data) {
                        session.start()
                        session.set('user', res.data);
                        router.push('/');
                    } else {
                        resolve(res.data);
                    }
                })();
            } catch (err) {
                reject(err);
            }
        });
        
    }

    static logOut(router, session) {
        return new Promise((resolve, reject) => {
            try {
                (async () => {
                    const res = await axios.post(`${url}logout`);
                    if (res.data == 'disconnected') {
                        session.destroy();
                        router.push('/Login');
                    } else {
                        resolve(res.data);
                    }
                })();
            } catch (err) {
                reject(err);
            }
        });
        
    }

    static createAccount(firstname, lastname, email, password) {
        axios.post(url + '/CreateAccount', {
            firstname : firstname,
            lastname : lastname,
            email : email,
            password : password
        })
    }
}

export default HTTP_services;