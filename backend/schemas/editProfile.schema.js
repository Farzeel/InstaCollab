import Joi from "joi"

export const profileEditSchema = Joi.object({
    fullName: Joi.string().min(3).optional(),
    bio: Joi.string().optional(),
    websiteLink: Joi.string().uri().optional(),
    gender: Joi.string().valid('Male', 'Female',).optional()
  });