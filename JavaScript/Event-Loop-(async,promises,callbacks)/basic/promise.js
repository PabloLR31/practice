const url = "https://jsonplaceholder.typicode.com";

const getUser = (id) => 
    new Promise((resolve, reject) => {
        request({uri: `${url}/users?id=${id}`}, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve( JSON.parse(body) );
            }
   })
});

const getPosts = (id) => 
    new Promise((resolve, reject) => {
        request({uri: `${url}/users?id=${id}&_limit=3`}, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve( JSON.parse(body) );
            }
   });
});

getUser(1)
    .then( users => {
        const user = users[0];
        console.log(user);
        return user;
    })
    .then( user => getPosts(user.id) )
    .then( posts => console.log(posts) )
    .catch(e => console.error(e));

