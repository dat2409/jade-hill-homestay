const Joi = require('joi');

const createUserValidator = (data) => {
  const rule = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().pattern(
      new RegExp('^[a-zA-Z0-9]{6,255}$')
    ).required(),
    role: Joi.string(),
    created_by: Joi.string(),
    phone_num: Joi.string()
  })

  return rule.validate(data);
}

module.exports.createUserValidator = createUserValidator;
