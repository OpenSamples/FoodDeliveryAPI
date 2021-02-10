function isValidUserData(data, create) {

    let requiredKeys = ['firstName', 'lastName', 'email', 'password', 'role']

    for(let i = 0; i < requiredKeys.length; i++) {
        let key = requiredKeys[i]

        if(key in data && !data[key]) {
            return `Invalid ${key}`
        }

        if(!data[key]) {
            if(key === 'role') {
                if(data[key] !== 0) {
                    return `role should be defined!`
                }
            } else {
                return `${key} should be defined!`
            }
        } else if(typeof data[key] !== 'string') {
            if(key === 'role') {
                if(typeof data[key] !== 'number') {
                    return `role must be a number!`
                }
            } else {
                return `${key} must be a string!`
            }
        }
    }


    if(data.firstName) {
        if(data.firstName.length < 2) return 'First name is too short'
    } else if(create || data.firstName === '') {
        return `First name should be defined!`
    }

    if(data.lastName) {
        if(data.lastName.length < 2) return 'Last name is too short'
    } else if(create || data.lastName === '') {
        return `Last name should be defined!`
    }

    if(data.email) {
        if(!validateEmail(data.email)) {
            return 'Email is invalid'
        }
    } else if(create || data.email === '') {
        return `Email should be defined!`
    }

    if(data.password) {
        if(!(data.password.length >= 5 && data.password.length <= 25)) {
            return 'Password should be between 5 and 25 characters!'
        }

        if(!((/[a-z]/.test(data.password)) && (/[A-Z]/.test(data.password)) && (/[0-9]/.test(data.password)))) {
            return 'Password must contain at least one lowercase letter, one uppercase letter and one number!'
        }
        
    } else if(create || data.password === '') {
        return `Password should be defined!`
    }

    if(data.role || data.role === 0) {
        if(!(data.role === 0 || data.role === 1)) return `Role must be 0 or 1!`
    } else if(create) {
        return `Role should be defined!`
    }


    return 'OK'
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

module.exports = isValidUserData