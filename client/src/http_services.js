import axios from 'axios';

const url = '/';

class HTTP_services {
    // Get

    static getPosts() {
        return new Promise((resolve, reject) => {
            try {
                (async () => {
                    axios.get(`${url}posts`)
                         .then((res) => resolve(res.data))
                         .catch((err) => reject(err));
                })();
            } catch (err) {
                reject(err)
            }
        })
    }
    
    static getPostById(id) {
        return new Promise((resolve, reject) => {
            try {
                (async () => {
                    axios.get(`${url}posts/${id}`)
                         .then((res) => resolve(res.data))
                         .catch((err) => reject(err));
                })();
            } catch (err) {
                reject(err)
            }
        })
    }

    // Post
    static logIn(email, password, router, session) {
        return new Promise((resolve, reject) => {
            try {
                (async () => {
                    await axios.post(`${url}login`, {email : email, password : password})
                               .then((res) => {
                                   console.log(res.data);
                                    if (res.data) {
                                        session.start()
                                        session.set('user', res.data);
                                        router.push({ name : 'Home', params : { title : 'Connected', type : 'success', msg : `Welcome ${res.data.firstname}!`}});
                                    } else {
                                        resolve('Incorrect login or password.');
                                    }
                               })
                               .catch((err) => reject(err));
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
                        router.push({ name : 'Login', params : { title : 'Disconnected', type : 'success', msg : 'Disconnection is successfull'}});
                    } else {
                        resolve(res.data);
                    }
                })();
            } catch (err) {
                reject(err);
            }
        });
    }

    static createAccount(firstname, lastname, email, password, confirm_password, router) {
        return new Promise((resolve, reject) => {
            try {
                (async () => {
                    let err = [];
                    if (!firstname || !lastname || !email || !password || !confirm_password) err.push('Please complete all fields.');
                    if (password !== confirm_password) err.push('Passwords do not match');
                    if (password.length < 6) err.push('Password must contain more than 6 characters');
                    if (err.length == 0) {
                        await axios.post(`${url}CreateAccount`, {
                            firstname,
                            lastname,
                            email,
                            password
                        }).then((res) => {
                            if (!res.data) {
                                err.push('This email is already registered');
                                resolve(err)
                            } else {
                                router.push('/Login');
                            }
                        }).catch((err) => reject(err));
                    } else {
                        resolve(err);
                    }
                })();   
            } catch (err) {
                reject(err);
            }
        });   
    }

    static addPosts(title, content, date) {
        return new Promise((resolve, reject) => {
            try {
                (async () => {
                    if (title && content) {
                        axios.post(`${url}posts`, { title, content, date })
                         .then((res) => resolve(res.data))
                         .catch((err) => reject(err));
                    } else {
                        reject('Please complete all fields');
                    }
                })();
            } catch (err) {
                reject(err)
            }
        })
    }

    // Patch

    static editPost(id, title, content) {
        return new Promise((resolve, reject) => {
            try {
                (async () => {
                    if (title && content) {
                        axios.patch(`${url}posts/${id}`, { title, content })
                         .then((res) => resolve(res.data))
                         .catch((err) => reject(err));
                    } else {
                        reject('Please complete all fields.');
                    }
                })();
            } catch (err) {
                reject(err)
            }
        })
    }

    // Delete
  
    static deletePost(id) {
        return new Promise((resolve, reject) => {
            try {
                (async () => {
                    axios.delete(`${url}posts/${id}`)
                        .then((res) => resolve(res.data))
                        .catch((err) => reject(err));
                })();
            } catch (err) {
                reject(err)
            }
        })
    }
    
}

export default HTTP_services;