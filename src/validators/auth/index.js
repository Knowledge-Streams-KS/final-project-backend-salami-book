import Joi from "joi";

const PASSWORD_REGEX = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
);


const AuthValidators = {
    signIn: (req, res, next) => {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        const { value, error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: "Invalid data",
                error,
            });
        }
        next();
    },
    signUp: (req, res, next) => {
        const schema = Joi.object({

            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
        });
        const { value, error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: "Invalid data",
                error,
            });
        }
        next();
    },
};

export default AuthValidators;
