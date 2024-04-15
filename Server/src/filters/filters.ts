import { CustomData } from '../data-structure/CustomData';

export const validatePhone = (input: CustomData): CustomData=> {
    
    const phone = input.telefono.replace(/\s+/g, '');
    const firstNumbersCorrect = phone.substring(0, 2) == '09';
    if (phone.length == 9 && firstNumbersCorrect) {
        throw new Error("Error aleatorio");
    }
    return input;
};