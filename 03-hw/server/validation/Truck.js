const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  creatorId: Joi.string()
    .alphanum()
    .label('CreatorId'),
  assigneeId: Joi.string()
    .alphanum()
    .label('AssigneeId'),
  status: Joi.string()
    .valid('', 'IN_SERVICE', 'ON_LOAD')
    .label('Status'),
  type: Joi.string()
    .valid('SPRINTER', 'SMALL_STRAIGHT', 'LARGE_STRAIGHT')
    .label('Type')
});
