import Joi from "joi";


const validateSchema = {
    product: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().min(3).max(100).required().messages({
                "any.required": "Product Name is required.",
                "string.empty": "Product name cannot be empty.",
                "string.max": "Product name should not exceed 100 characters.",
            }),
            price: Joi.number().required().min(80).max(50000).messages({
                "any.required": "Product Price is required.",
                "number.base": "Product Price must be a number.",
                "number.integer": "Product Price must be an integer.",
                "number.min": "Product Price cannot be less than 80.",
                "number.max": "Product Price cannot be greater than 50000.",
            }),
            stock: Joi.number().integer().required().min(0).max(1000).messages({
                "any.required": "Product Stock is required.",
                "number.base": "Product Stock must be a number.",
                "number.integer": "Product Stock must be an integer.",
                "number.min": "Product Stock cannot be less than 0.",
                "number.max": "Product Stock cannot be greater than 1000.",
            }),
            categories: Joi.array().items(Joi.number().integer().required()),

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

    category: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().min(3).max(20).required().messages({
                "any.required": "Category name is required.",
                "string.empty": "Category name cannot be empty.",
                "string.max": "Category name should not exceed 20 characters.",
            })
        });

        const { value, error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: "Invalid data",
                error,
            });
        }
        next();
    }

};

export default validateSchema;
