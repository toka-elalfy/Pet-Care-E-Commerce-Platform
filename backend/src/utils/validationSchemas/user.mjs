export const registerSchema = {
    fname: {
        in: ['body'],
        notEmpty: {
            errorMessage: "Firstname is required"
        },
        isString: {
            errorMessage: "Firstname must be string"
        }
    },
    lname: {
        in: ['body'],
        notEmpty: {
            errorMessage: "Lastname is required"
        },
        isString: {
            errorMessage: "Lastname must be string"
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
        isLength: {
            options: { min: 8 },
            errorMessage: "Password must be at least 8 characters"
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
        isLength: {
            options: { min: 8 },
            errorMessage: "Password must be at least 8 characters"
        }
    }
}