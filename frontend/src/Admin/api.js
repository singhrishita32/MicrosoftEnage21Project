export const SigninAdmin = admin => {
    // console.log("here");
    return fetch(`http://localhost:8000/adminsignin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(admin)
    })
        .then(response => {
            console.log("response", response);
            // localStorage.setItem("type", response.admin.encrypted)
            return response.json()
           
        })
        .catch(err => console.log(err))
    
};
