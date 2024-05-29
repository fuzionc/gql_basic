import { IResolvers } from '@graphql-tools/utils';
import { Db, ObjectId } from 'mongodb';

const habilidadResolver: IResolvers = {
  Query: {
    obtenerHabilidades: async (parent, args, context: Db) => {
      try {
        return await context.collection('Habilidades').find().toArray() ?? [];
      } catch (error) {
        console.log(error);
      }
    }
  },
  Mutation: {
    crearHabilidad: async (parent, args, context: Db) => {
      try {
        await context.collection('Habilidades').insertOne(args.habilidad);
        return "Habilidad creada exitosamente";
      } catch (error) {
        console.log(error);
      }
    },
    actualizarHabilidad: async (parent, args, context: Db) => {
      try {
        const habilidadColl = await context.collection('Habilidades').findOne({ _id: new ObjectId(args._id) });

        if (!habilidadColl) throw new Error("Habilidad no encontrada");

        await context.collection('Habilidades').updateOne(
          { _id: new ObjectId(args._id) },
          { $set: args.habilidad }
        );

        return "Habilidad actualizada exitosamente";
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export default habilidadResolver;