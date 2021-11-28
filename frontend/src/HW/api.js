export const load = () => {
    
    return fetch(`http://localhost:8000/allhubs` , {
        method: "GET"
    })
        .then(response => {
        // console.log(response)
        return response.json();
    })
    .catch(err => console.log(err));
}
export const addHub = (hub) => {
    return fetch(`http://localhost:8000/addhub` , {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(hub)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const uploadResult = (details) => {
    // console.log(details)
    return fetch(`http://localhost:8000/uploadresult` , {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}
export const EnableDisable = (workshop) => {
    
    return fetch(`http://localhost:8000/fieldupdateworkshop` , {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(workshop)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}
export const workshopsOfHub = hub => {
    // console.log(hub)
    return fetch(`http://localhost:8000/workshopsofhub`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(hub)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}
export const saveWorkshop = (workshop) => {
    // console.log("api",workshop)
    return fetch(`http://localhost:8000/addworkshop`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(workshop)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}
export const editWorkshop = (workshop) => {
    console.log("api",workshop)
    return fetch(`http://localhost:8000/editworkshop`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(workshop)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}
export const enrollStudent = (enrollment) => {
    console.log("api enroll")
    return fetch(`http://localhost:8000/enrollstudent`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(enrollment)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
    
}
export const announceWinner = (winner) => {
    return fetch(`http://localhost:8000/declarewinner`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(winner)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}
export const getWorkshop = (workshop) => {
    return fetch(`http://localhost:8000/workshop`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(workshop)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const getCoordinators = (hub) => {

    console.log(hub)
    return fetch(`http://localhost:8000/coordinatorsofhub`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(hub)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}
export const postQuestion = (details) => {

    console.log(details)
    return fetch(`http://localhost:8000/postquestion`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}
export const postAnswer = (details) => {

    console.log(details)
    return fetch(`http://localhost:8000/postanswer`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}