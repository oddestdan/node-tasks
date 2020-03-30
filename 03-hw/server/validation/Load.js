const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  creatorId: Joi.string()
    .alphanum()
    .label('CreatorId'),
  assigneeId: Joi.string()
    .alphanum()
    .label('AssigneeId'),
  logs: Joi.object().label('Logs'),
  status: Joi.string()
    .valid('NEW', 'POSTED', 'ASSIGNED', 'SHIPPED')
    .label('Status'),
  state: Joi.string()
    .valid(
      '',
      'EN_ROUTE_TO_PICK_UP',
      'ARRIVED_TO_PICK_UP',
      'EN_ROUTE_TO_DELIVERY',
      'ARRIVED_TO_DELIVERY'
    )
    .label('State'),
  dimensions: Joi.object().label('dimensions'),
  payload: Joi.number().label('Payload')
});
