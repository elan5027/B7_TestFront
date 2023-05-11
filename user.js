async function handleSignup() {
    const email = document.getElementById("email2").value
    const password = document.getElementById("password2").value
    console.log(email, password)
    const response = await fetch('http://127.0.0.1:8000/user/signup/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password,
            "name": "TestUser",
        })
    })
}


async function handleLogin() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(email, password)

    const response = await fetch('http://127.0.0.1:8000/user/login/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
    })

    const response_json = await response.json()
    console.log(response_json, email)
    token_data = response_json
    console.log(response_json)
    localStorage.setItem("access", token_data.access)
    localStorage.setItem("refresh", token_data.refresh)
    localStorage.setItem("userName", token_data.user)
    const base64Url = token_data.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    jsonload = JSON.parse(jsonPayload)
    console.log(jsonload)
    
    localStorage.setItem("userId", jsonload['user_id'])
}


async function handleLogout() {
    if (localStorage.getItem("access")) {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
    }
}


async function handleReflash(){
    let reflesh = localStorage.getItem("refresh")
    const response = fetch('http://127.0.0.1:8000/user/login/refresh/', {
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                "refresh": reflesh,
            })
        })
        .then((response) => response.json())
        .then((json) =>{
            if(json.code == "token_not_valid"){
                handleLogout()
            }
            else{
                localStorage.setItem("access",json.access)
            }
        })

}
