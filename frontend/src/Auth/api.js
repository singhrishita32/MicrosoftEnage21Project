

export const signout =(next) => {
    if (typeof window !== "undefined")
        localStorage.removeItem("jwt")
    next();
return fetch(`http://localhost:8000/signout`, {
    method: "GET"
})
    .then(response => {
        // console.log('signout', response)
        return response.json()
        
    })
    .catch(err => console.log(err))

};

export const authenticate=(jwt, next)=> {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt))
      
        next();
    }
}

export const isAuthenticated= () => {
    if (typeof window == "undefined") {
        return false
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }
}