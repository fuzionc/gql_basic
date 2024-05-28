import { IResolvers } from '@graphql-tools/utils';
import { peopleDataSource } from '../../data/peopledata';

const peopleResolver: IResolvers = {
    Query: {
        obtenerPersonas: () => peopleDataSource,
        obtenerPersonaPorNombre: (parent, { nombre }) => {
            return peopleDataSource.filter(peopleDataSource => peopleDataSource.nombre.toLowerCase().includes(nombre.toLowerCase()));
        }
    },
    Mutation: {
        crearPersona: (parent, { input }) => {
            const newPerson = {
                id: String(peopleDataSource.length + 1),
                ...input
            };
            peopleDataSource.push(newPerson);
            return newPerson;
        },
        actualizarPersona: (parent, { id, input }) => {
            const personIndex = peopleDataSource.findIndex(person => person.id === id);
            if (personIndex !== -1) {
                const updatedPerson = {
                    id,
                    ...input
                };
                peopleDataSource[personIndex] = updatedPerson;
                return updatedPerson;
            }
            throw new Error("Persona no encontrada");
        },
        eliminarPersona: (parent, { id }) => {
            const personIndex = peopleDataSource.findIndex(person => person.id === id);
            if (personIndex !== -1) {
                peopleDataSource.splice(personIndex, 1);
                return true;
            }
            throw new Error("Persona no encontrada");
        }
    }
}



export default peopleResolver;