const Joi = require('@hapi/joi');

const { loadStates, statuses } = require('../globals');

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
    // .valid(Object.values(statuses.load))
    .label('Status'),
  state: Joi.string()
    .valid(
      '',
      'EN_ROUTE_TO_PICK_UP',
      'ARRIVED_TO_PICK_UP',
      'EN_ROUTE_TO_DELIVERY',
      'ARRIVED_TO_DELIVERY'
    )
    // .valid(Object.values(loadStates)),
    .label('State'),
  dimensions: Joi.object()
    .keys({
      height: Joi.number().label('Height'),
      width: Joi.number().label('Width'),
      length: Joi.number().label('Length')
    })
    .label('dimensions'),
  payload: Joi.number().label('Payload')
});
