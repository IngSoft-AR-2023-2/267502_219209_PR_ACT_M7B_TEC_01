import axios from 'axios';
const faker = require('faker'); 

const sendWords = async (persona: Persona) => {

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
};

const getData = function (): void{
  let nombre: string | null = prompt('Ingrese su nombre:');

  let apellido: string | null = prompt('Ingrese su apellido:');

  let cedula: string | null = prompt('Ingrese su cedula:');

  let telefono: string | null = prompt('Ingrese su telefono:');

  let departamento: string | null = prompt('Ingrese su departamento:');

  let movilidad: string | null = prompt('Ingrese si necesita asistencia de movilidad(SI/NO)');

  const persona: Persona= {
    nombre: nombre,
    apellido: apellido,
    cedula: cedula,
    telefono: telefono,
    departamento: departamento,
    movilidad: movilidad
  }
  sendWords(persona);
}





