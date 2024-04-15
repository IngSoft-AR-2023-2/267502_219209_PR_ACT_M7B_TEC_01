import express, { Express, Request, Response } from 'express';
import { CustomData } from '../data-structure/CustomData';
import { Pipeline } from '../Pipeline/pipeline';
import { QueueFactory } from '../Pipeline/queueFactory';
import { validateAssitance, validatePhone } from '../filters/filters';
require('dotenv').config();

const app: Express = express();
const port: number = 3000;

const queueFactory = QueueFactory.getQueueFactory<CustomData>;
const pipeline = new Pipeline<CustomData>([validatePhone, validateAssitance], queueFactory);

app.use(express.json());

pipeline.on('finalOutput', (output) => {
  console.log(`Se ha finalizado satisfactoriamente el proceso de agenda para la persona  ${output.nombre} ${output.apellido}`);
});

pipeline.on('errorInFilter', (error, data) => {
    console.error(`No se ha podido agendar ${data.nombre} ${data.apellido}`);
});
 

app.post('/people', (req: Request, res: Response) => {
  

  if(validateWord(req)){
    
    
    res.status(200).send(req.body);

    let movilidad = req.body.movilidad == 'SI';

    let dataToProcess: CustomData = {nombre: req.body.nombre,
      apellido: req.body.apellido,
      cedula: parseInt(req.body.cedula),
      telefono: req.body.telefono,
      departamento: req.body.departamento,
      movilidad: movilidad
    }

    pipeline.processInput(dataToProcess);    
  }else{
    res.status(400).send({message: 'Un campo está vacio'});
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});


const validateWord = function (req: Request): boolean {
  if (req.body.nombre && req.body.apellido  && req.body.cedula  && req.body.telefono  && req.body.departamento && req.body.movilidad){
    return true
  }
  return false;
}