
function validateProduct(data) {
    let requiredKeys = ['name', 'detail', 'categoryId', 'price']
    const errors = []

    for(let i = 0; i < requiredKeys.length; i++) {
        let key = requiredKeys[i]

        if(key in data && !data[key]) {
            errors.push(`Invalid ${key}`)
        }

        if(!data[key]) {
            if(key === 'price') {
                if(data[key] !== 0) {
                    errors.push(`price should be defined!`)
                }
            } else {
                errors.push(`${key} should be defined!`)
            }
        } 

        if(key === 'price' && typeof data[key] !== 'number') {
            errors.push('price must be a number!')
        } else if(typeof data[key] !== 'string' && key !== 'price') {
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


    if(data.name) {
        if(data.name.length < 2) errors.push('Name is too short')
    } else {
        errors.push(`Name should be defined!`)
    }

    if(data.detail) {
        if(data.detail.length < 5) errors.push('Detail is too short')
    } else {
        errors.push(`Detail should be defined!`)
    }

    if(data.categoryId) {
        if(data.categoryId.length < 8) errors.push('You have to provide id of category!')
    } else {
        errors.push(`CategoryId should be defined!`)
    }

    if(data.price || data.price === 0) {
        if(data.price < 0) errors.push(`Price must be greater or equal than 0!`)
    } else {
        errors.push(`price should be defined!`)
    }


    return {
        error: !!errors.length,
        message: 'Validation error!',
        status: 406,
        err_msg: errors
    }
}


module.exports = validateProduct