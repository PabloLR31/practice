const url = "https://jsonplaceholder.typicode.com";

const btnClick = document.getElementById("btn-click");
const numClicks = document.getElementById("num-clicks");
const btnSlow = document.getElementById("btn-slow");
const content = document.getElementById("content");

let clicks = 0;
btnClick.onclick = () => {
    numClicks.innerHTML = `Number of clicks: ${++clicks}`;
}

btnSlow.onclick = () => getUserInfo(1);

const getUserInfo = (id) => {
    fetch(`${url}/users?id=${id}`)
        .then( res => res.json() )
        .then( users => content.innerHTML += `<h3>User Info</h3><p>${users[0].email}</p>`)
        .then( () => fetch(`${url}/posts?userId=${id}&_limit=3`))
        .then( res => res.json() )
        .then( posts => {
            content.innerHTML += posts.map(post => 
                `<div class="post"><h4>${post.title}</h4></div>`    
            ).join('');
            return Promise.all(posts.map(post => 
                fetch(`${url}/comments?postId=${post.id}&_limit=2`)
            ))
        })
        .then( responses => Promise.all(responses.map( res => res.json())))
        .then( comments => {
            document.querySelectorAll(".post").forEach((div, i) => {
                div.innerHTML += comments[i].map(comment => 
                    `<p><span>${comment.email}</span>: ${comment.body}</p>`    
                ).join('')
            })
        })
        .catch(e => console.error(e))
}