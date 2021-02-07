module.exports = (userData) => {
    const { name, email, password, role } = userData;
    const reUsername = /^\w+$/;
    const rePasswordNumber = /[0-9]/;
    const rePasswordLowerCase = /[a-z]/;
    const rePasswordUpperCase = /[A-Z]/;
    const reEmail = /\S+@\S+\.\S+/;
    const errors = [];
    if (name.length < 1 || email.length < 1 || password.length < 1 || role.length < 1) {
        errors.push({ msg: "Must fill all fields." });
    }
    if (name.length < 3) {
        errors.push({ msg: "Name must be minimum 3 characters long." });
    }
    if (password.length < 6) {
        errors.push({ msg: "Password must be minimum 6 characters long." });
    }
    if (!reUsername.test(name)) {
        errors.push({ msg: "Name must contain only letters, numbers and underscores." });
    }
    if (hasWhiteSpace(name)) {
        errors.push({ msg: "Name must not contain whitespaces or tabs." });
    }
    if (!rePasswordNumber.test(password)) {
        errors.push({ msg: "Password must contain at least one number." });
    }
    if (!rePasswordLowerCase.test(password)) {
        errors.push({ msg: "Password must contain at least one lowercase letter." });
    }
    if (!rePasswordUpperCase.test(password)) {
        errors.push({ msg: "Password must contain at least one uppercase letter." });
    }
    if (!reEmail.test(email)) {
        errors.push({ msg: "Email is not in valid form." });
    }
    if (role < 0 || role > 1) {
        errors.push({ msg: "Role must be equal to 0 or 1." });
    }
    return errors;
};

function hasWhiteSpace(string) {
    return /\s/g.test(string);
}