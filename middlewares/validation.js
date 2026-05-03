const { celebrate, Joi } = require("celebrate");

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().uri(),
  }),
});

const validateCreateItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    weather: Joi.string().required().valid("hot", "warm", "cold"),
    imageUrl: Joi.string().required().uri(),
  }),
});

const validateIdParam = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().pattern(objectIdPattern),
  }),
});

module.exports = {
  validateSignUp,
  validateSignIn,
  validateUpdateUser,
  validateCreateItem,
  validateIdParam,
};
