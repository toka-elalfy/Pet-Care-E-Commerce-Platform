

export const petValidationSchema = {
    name: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Name is required"
        },
        isString: {
            errorMessage: "Name must be string"
        }
    },
    type: {
        notEmpty: {
            errorMessage: "Type is required"
        },
        isString: {
            errorMessage: "Type must be string"
        },
        isIn: {
            options: [["Dog", "Cat", "Bird", "Rabbit"]],
            errorMessage: "Type is not available"
        }
    },
    breed: {
        optional: true,
        isString: {
            errorMessage: "Breed must be string"
        }
    },
    age: {
        isNumeric: {
            errorMessage: "Age must be a number"
        },
        isLength: {
            options: { min: 0 },
            errorMessage: "Invalid Age"
        }
    },
    photo: {
        isString: {
            errorMessage: "URL must be string"
        },
        optional: {
            options: {
                nullable: true
            }
        }
    },
    size: {
        isString: {
            errorMessage: "Size must be string"
        },
        notEmpty: {
            errorMessage: "Size is required"
        },
        isIn: {
            options: [["Small", "Medium", "Large"]],
            errorMessage: "Invalid Size"
        }
    },
    needs: {
        in: ["body"],
        isArray: {
            errorMessage: "Needs must be an array"
        }
    },
    "needs.*": {
        isString: {
            errorMessage: "Each need must be a string"
        },
        isIn: {
            options: [[
                "Grain-free",
                "Joint support",
                "Sensitive skin",
                "Puppy growth",
                "Weight management",
                "Dental care"
            ]],
            errorMessage: "Invalid need value"
        }
    }

}