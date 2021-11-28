export const studentsignin = student => {
    return fetch(`http://localhost:8000/studentsignin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
    
};
export const studentSignup = student => {
    return fetch(`http://localhost:8000/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
        .then(response => {
            console.log(response)
            return response.json()
        })
        .catch(err => console.log(err))
    
};
export const getStudent = (student) => {
    // console.log("api",student)
    return fetch(`http://localhost:8000/student`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const allStudents= () => {
    
    return fetch(`http://localhost:8000/allstudents` , {
        method: "GET"
    })
        .then(response => {
        // console.log(response)
        return response.json();
    })
    .catch(err => console.log(err));
}