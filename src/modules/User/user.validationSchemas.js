import Joi from "joi";

export const signUpSchema = {
  body: Joi.object({
    username: Joi.string().min(3).max(16).required().messages({
      "any.required": "please enter your username",
    }),
    firstName: Joi.string().min(3).max(16).required().messages({
      "any.required": "please enter your first name",
    }),
    secondName: Joi.string().min(3).max(16).required().messages({
      "any.required": "please enter your second name",
    }),
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .required()
      .messages({
        "any.required": "please enter your email",
      }),
    password: Joi.string().required().required().messages({
      "any.required": "please enter your password",
    }),
    cpass: Joi.string().valid(Joi.ref("password")).messages({
      "any.required": "please confirm your password",
    }),
    age: Joi.number().min(10).max(100),
    instagram: Joi.string()
      .pattern(/^[a-z0-9._]{1,30}$/)
      .optional()
      .messages({
        "string.pattern.base": "Instagram username can only contain lowercase letters, numbers, dots, and underscores, and must be between 1 and 30 characters long",
      }),
    gender: Joi.string().valid("male", "female"),
  }).with("password", "cpass"),
};
