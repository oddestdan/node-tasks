const Joi = require('@hapi/joi');

const passwRegex = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/;
const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
const simpleEmailRegex = /\S+@\S+\.\S+/;

module.exports = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .label('Username'),
  password: Joi.string()
    .regex(passwRegex)
    // .options({
    //   language: { // for some reason is not supported
    //     string: {
    //       regex: {
    //         base: 'must be hexadecimal numbers separated with dashes'
    //       }
    //     }
    //   }
    // })
    .label('Password'),
  role: Joi.string()
    .valid('shipper', 'driver', 'admin')
    .label('Role'),
  email: Joi.string()
    .regex(simpleEmailRegex)
    .label('Email'),
  phone: Joi.string()
    .regex(phoneRegex)
    .label('Phone'),
  info: Joi.string()
    .alphanum()
    .max(120)
    .label('Info'),
  avatar: Joi.string()
    .label('Avatar')
});
