const rp = require("request-promise");
const token = require("../middleware/auth.middleware");
const Joi = require("joi");
const transporter = require("../config/mialer");

const createMeet = (req, res) => {

  // validacion de Json recibido en el req, Usando modulo Joi
  const schema =Joi.object({
      topic: Joi.string().required(),
      start_time: Joi.string().required(),
      duration: Joi.number().required(),
      email: Joi.string().required()
  });
  const result = schema.validate(req.body);
  if (result.error){
    res.status(400).send(result.error.details[0].message)
    return;
  };

  //consulta a la api de zoom
  const options = {
    method: "POST",
    uri: `${process.env.BASE_URL_ZOOM}/${process.env.CORREO}/meetings`,
    qs: {
      status: "active",
    },
    auth: {
      bearer: token,// token generado
    },
    headers: {
      "User-Agent": "Zoom-Jwt-Request",
      "content-type": "application/json",
    },
    json: req.body,
  };
  //respusta 
  rp(options)
    .then((response) => {
      let {start_time, topic, join_url} = response;
      //envio de email de confirmacion de link
      transporter.sendMail({
        from: '"Creacion de sala de zoom " <biosprueba70@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Creacion de sala de zoom ", // Subject line
        html: `<b>Como lo solicitaste tu sala de zoom ${topic} ya esta creada para el dia ${start_time} y este es el link ${join_url}</b>
        <b>Recuerda que 10 minutos antes se te habilitara la entrada a la sala, fue un placer servirte ☺️</b>`
         // html body
      });
      res      
        .status(201)
        .json({
          Tema: topic,
          Fecha: start_time,
          Link: join_url
        });
        
    })
    .catch((err) => {
      res.json(err);
    });
    
    
};

const readMeet = (req, res) => {
    const options = {
      method: "GET",
      uri: `${process.env.BASE_URL_ZOOM}/${process.env.CORREO}/meetings`,
      qs: {
        status: "active",
      },
      auth: {
        bearer: token,
      },
      headers: {
        "User-Agent": "Zoom-Jwt-Request",
        "content-type": "application/json",
      },
      json: {
        meetings:{}       
        
      }
    };
  
    rp(options)
      .then((response) => {

        const {meetings}= response;       

        res
        .status(201)
        .json({          
            meetings 
        });
      })
      .catch((err) => {
        res.json(err);
      });
  };

module.exports = {createMeet, readMeet};
