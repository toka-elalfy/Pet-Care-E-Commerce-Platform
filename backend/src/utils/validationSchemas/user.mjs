export const registerSchema = {
    fname: {
        in: ['body'],
        notEmpty: {
            errorMessage: "Firstname is required"
        },
        isString: {
            errorMessage: "Firstname must be string"
        },
        custom: {
            options: (value) => {
                if (!/^[a-zA-Z]+$/.test(value)) {
                    throw new Error("Firstname must contain letters only");
                }
                return true;
            }
        }
    },
    lname: {
        in: ['body'],
        notEmpty: {
            errorMessage: "Lastname is required"
        },
        isString: {
            errorMessage: "Lastname must be string"
        },
        custom: {
            options: (value) => {
                if (!/^[a-zA-Z]+$/.test(value)) {
                    throw new Error("Lastname must contain letters only");
                }
                return true;
            }
        }
    },
    email: {
        in: ['body'],
        notEmpty: {
            errorMessage: "Email is required"
        },
        isString: {
            errorMessage: "Email must be string"
        },
        isEmail: {

            errorMessage: "Please enter a valid email address (e.g. example@gmail.com)"
        },

    },
    password: {
        in: ['body'],
        notEmpty: {
            errorMessage: "Password is required"
        },
        isString: {
            errorMessage: "Password must be string"
        },
        custom: {
            options: (value) => {
                if (!/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(value)) {
                    throw new Error("Password must be at least 8 characters, include at least one uppercase letter and one number");
                }
                return true;
            }
        }
    }
}


export const loginSchema = {
    email: {
        in: ['body'],
        notEmpty: {
            errorMessage: "Email is required"
        },
        isString: {
            errorMessage: "Email must be string"
        },
        isEmail: {
            errorMessage: "Please enter a valid email address (e.g. example@gmail.com)"
        },

    },
    password: {
        in: ['body'],
        notEmpty: {
            errorMessage: "Password is required"
        },
        isString: {
            errorMessage: "Password must be string"
        },
        custom: {
            options: (value) => {
                if (!/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(value)) {
                    throw new Error("Password must be at least 8 characters, include at least one uppercase letter and one number");
                }
                return true;
            }
        }
    }
}