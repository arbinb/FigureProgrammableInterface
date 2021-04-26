import { v4 as uuidv4 } from 'uuid';

export default function buildElement(type, title, data, position) {
    return {
        id: type + '-' + uuidv4(),
        type: type,
        position: position,
        data: Object.assign({}, { frescoid: "0", label: title }, data) 
    };
}