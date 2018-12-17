import Joi from 'joi';

export default {
  // GET /api/users?id={}
  get: {
    query: {
      id: Joi.string().required()
    }
  }
};
