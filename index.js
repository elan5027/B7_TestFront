


document.querySelector("#roomConnect").onclick = function() {
    // 글작성자 필드 값 가져와서 변경해줘야됨 
    // 만약 작성자 ID값을 가져오기 힘들다면 email 같은 유니크한 값으로.
    token = localStorage.getItem("access")
    
    
    if(token){
        const response = fetch('http://127.0.0.1:8000/chat/room/', {
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            method: 'POST',
            body: JSON.stringify({
                "author": "2",
            })
        })
        .then((response) => response.json())
        .then((json) =>{
            console.log(json)
            if(json.code == "token_not_valid"){
                handleReflash()
            }
            else{
                localStorage.setItem("roomName", json)
                window.location.pathname = `room.html`
            }
            
        }) 
    }
}


