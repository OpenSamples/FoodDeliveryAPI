//THIS CAN BE LATER IMPLENENTED WHEN USER IS TRYING TO REGISTER TO WEBSITE
//1.Fetching all variables from userData object which we passed in Users controller function addUser
//2.Making empty array called errors in case that some variable doesn't pass required content
//If we bump into some invalid data like for example invalid form of email or password lenght is too short
//we fill errors array with object that has certain message which indicates to that error
//lastly we are returning object which has error propery which will either be true or false

const validateUser = (data, create) => {
    let requiredKeys = ['firstName', 'lastName', 'email', 'password', 'role']
    const errors = []

    for(let i = 0; i < requiredKeys.length; i++) {
        let key = requiredKeys[i]

        if(key in data && !data[key]) {
            if(!(key === 'role' && data[key] === 0)) {
                errors.push(`Invalid ${key}`)
            }
        }

        if(!data[key] && create) {
            if(key === 'role') {
                if(data[key] !== 0) {
                    errors.push(`role should be defined!`)
                }
            } else {
                errors.push(`${key} should be defined!`)
            }
        } 

        if(key === 'role' && typeof data[key] !== 'number') {
            errors.push('role must be a number!')
        } else if(typeof data[key] !== 'string' && key !== 'role') {
            errors.push(`${key} must be a string!`)
        }
    }

    if(errors.length) {
        return {
            error: !!errors.length,
            message: 'Validation error!',
            status: 406,
            err_msg: errors
        }    
    }


    if(data.firstName) {
        if(data.firstName.length < 2) errors.push('First name is too short')
    } else if(create || data.firstName.trim() === '') {
        errors.push(`First name should be defined!`)
    }

    if(data.lastName) {
        if(data.lastName.length < 2) errors.push('Last name is too short')
    } else if(create || data.lastName.trim() === '') {
        errors.push(`Last name should be defined!`)
    }

    if(data.email) {
        if(!validateEmail(data.email)) {
            errors.push('Email is invalid')
        }
    } else if(create || data.email.trim() === '') {
        errors.push(`Email should be defined!`)
    }

    if(data.password) {
        if(!(data.password.length >= 5 && data.password.length <= 25)) {
            errors.push('Password should be between 5 and 25 characters!')
        }

        if(!((/[a-z]/.test(data.password)) && (/[A-Z]/.test(data.password)) && (/[0-9]/.test(data.password)))) {
            errors.push('Password must contain at least one lowercase letter, one uppercase letter and one number!')
        }
        
    } else if(create || data.password.trim() === '') {
        errors.push(`Password should be defined!`)
    }

    if(data.role || data.role === 0) {
        if(![0, 1].includes(data.role)) {
            errors.push(`Role must be 0 or 1!`)
        }
    } else if(create) {
        errors.push(`Role should be defined!`)
    }

    return {
        error: !!errors.length,
        message: 'Validation error!',
        status: 406,
        err_msg: errors
    }
};


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}


module.exports = validateUser