import Joi from 'joi';

export const signupValidationSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')) // Minimum six characters, at least one letter and one number
      .required(),
    fullName: Joi.string().min(3).required(),
    gender: Joi.string().valid('male', 'female').required(),
    birthDay: Joi.number().integer().min(1).max(31).required(),
    birthMonth: Joi.number().integer().min(1).max(12).required(),
    birthYear: Joi.number().integer().min(1950).max(new Date().getFullYear()).required()
}).custom((value, helpers) => {
    const { birthDay, birthMonth, birthYear } = value;
    const birthdate = new Date(birthYear, birthMonth - 1, birthDay);

    if (birthdate > new Date()) {
        return helpers.message('Birthdate must be in the past');
    }

    if (birthdate < new Date(birthYear, birthMonth - 1, 1) || birthdate.getDate() !== birthDay) {
        return helpers.message('Invalid birthdate');
    }

    return value;
}, 'Birthdate Validation');


