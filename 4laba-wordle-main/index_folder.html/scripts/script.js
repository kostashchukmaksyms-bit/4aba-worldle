async function login(event){
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    try {
        const response = await fetch("https://backend-for-students-production.up.railway.app/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) {
            throw new Error(`Login request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        updateButton();
        document.getElementById("modal-toggle").checked = false;
    } catch (error) {
        console.error("Login request failed:", error);
    }
}

function updateButton(){
    if(localStorage.getItem("token")){
        document.getElementById("signin-btn").innerText = `HELLO, ${localStorage.getItem("username")}`;
        document.getElementById("signin-btn").setAttribute("onclick", "logout()");
    }
}

updateButton();