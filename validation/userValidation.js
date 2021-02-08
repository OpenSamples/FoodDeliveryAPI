module.exports = (userData) => {
    const { firstName,lastName, email, password, role } = userData;
    const rePasswordNumber = /[0-9]/;
    const rePasswordLowerCase = /[a-z]/;
    const rePasswordUpperCase = /[A-Z]/;
    const reEmail = /\S+@\S+\.\S+/;
    const errors = [];
    if (firstName.length < 1 || lastName.length < 1 || email.length < 1 || password.length < 1 || role.length < 1) {
        errors.push({ msg: "Must fill all fields." });
    }
    if (password.length < 6) {
        errors.push({ msg: "Password must be minimum 6 characters long." });
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
