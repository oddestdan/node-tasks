const Joi = require('@hapi/joi');

const { truckTypeInfo } = require('../globals');
const { statuses } = require('../globals');

module.exports = Joi.object().keys({
  creatorId: Joi.string()
    .alphanum()
    .label('CreatorId'),
  assigneeId: Joi.string()
    .alphanum()
    .label('AssigneeId'),
  status: Joi.string()
    .valid('IS', 'OL')
    // .valid(Object.keys(statuses.truck))
    .label('Status'),
  type: Joi.string()
    .valid('SPRINTER', 'SMALL_STRAIGHT', 'LARGE_STRAIGHT')
    // .valid(Object.keys(truckTypeInfo))
    .label('Type')
});
