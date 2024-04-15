import axios from 'axios';
import {Persona} from './persona';


const sendPerson = async () => {
  for(let persona of personas){
    try {
      
        const response = await axios.post('http://localhost:3000/words', persona);
       console.log(`Se ha iniciado el proceso de agenda para la persona ${response.data.nombre} ${response.data.apellido}`);
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      } else {
        console.error('Error:', error);
      }
    }
  }
};

const personas: Array<Persona> = []
personas.push({nombre: "",
  apellido: "",
  cedula: "",
  telefono: "",
  departamento: "",
  movilidad: ""});

personas.push({nombre: "",
  apellido: "bbb",
  cedula: "5555555",
  telefono: "099999999",
  departamento: "Montevideo",
  movilidad: "SI"});

personas.push({nombre: "Maria",
  apellido: "",
  cedula: "5555555",
  telefono: "099999999",
  departamento: "Montevideo",
  movilidad: "SI"});

personas.push({nombre: "SOdia",
  apellido: "bbb",
  cedula: "",
  telefono: "099999999",
  departamento: "Montevideo",
  movilidad: "SI"});

personas.push({nombre: "Flor",
  apellido: "bbb",
  cedula: "5555555",
  telefono: "",
  departamento: "Montevideo",
  movilidad: "SI"});

personas.push({nombre: "Flor",
  apellido: "aaa",
  cedula: "5555555",
  telefono: "088888898",
  departamento: "Montevideo",
  movilidad: "SI"});

personas.push({nombre: "Flor",
  apellido: "ccc",
  cedula: "5555555",
  telefono: "099999",
  departamento: "Montevideo",
  movilidad: "SI"});

personas.push({nombre: "Flor",
  apellido: "dddd",
  cedula: "5555555",
  telefono: "099999999",
  departamento: "",
  movilidad: "SI"});

personas.push({nombre: "Flor",
  apellido: "333",
  cedula: "5555555",
  telefono: "099000000",
  departamento: "Montevideo",
  movilidad: ""});

personas.push({nombre: "Victoria",
  apellido: "Firpo",
  cedula: "5555555",
  telefono: "099999999",
  departamento: "Montevideo",
  movilidad: "NO"});

personas.push({nombre: "Julieta",
  apellido: "Barros",
  cedula: "5555555",
  telefono: "095852222",
  departamento: "Montevideo",
  movilidad: "SI"});



sendPerson();

