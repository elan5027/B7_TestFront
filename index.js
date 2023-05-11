
window.onload = () => {
    const response = fetch('http://127.0.0.1:8000/product/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'GET',
    })
    .then((response) => response.json())
    .then((json) =>{
        let products = json.results
        let procuct_doc = document.querySelector("#product")
        for(i=0; i<products.length; i++){
            let product = products[i]
            procuct_doc.innerHTML+=`<button type="button" id="roomConnect" class="btn btn-success" onclick="roomset(${product.user})">${product.title}</button>`
        }
        ger_user_in_rooms()
    }) 
}

function ger_user_in_rooms(){
    token = localStorage.getItem("access")
    const response = fetch('http://127.0.0.1:8000/chat/room/', {
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        method: 'GET',
    })
    .then((response) => response.json())
    .then((json) =>{
        let name = Object.keys(json)
        let users = Object.values(json)
        let procuct_doc = document.querySelector("#chatroom")
        let html = []
        for(i=0; i<name.length; i++){
            html += (`<button type="button" id="roomConnect" class="btn btn-success" onclick="roompage(${name[i]})">${users[i]}</button>`)
        }
        procuct_doc.innerHTML = html
    })
}

function roompage(roomid){
    localStorage.setItem("roomName", roomid)
    window.location.pathname = `room.html`
}


function roomset(author){
    token = localStorage.getItem("access")
    console.log("name : ", author)
    if(token){
        const response = fetch('http://127.0.0.1:8000/chat/room/', {
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            method: 'POST',
            body: JSON.stringify({
                "author": author,
            })
        })
        .then((response) => response.json())
        .then((json) =>{
            console.log(json)
            if(json.code == "token_not_valid"){
                handleReflash()
            }
            else{
                console.log("JSON",json)
                roompage(json)
            }
        }) 
    }
}



