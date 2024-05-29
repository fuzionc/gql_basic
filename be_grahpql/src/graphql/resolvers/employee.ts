import { IResolvers } from '@graphql-tools/utils';
import { Db, ObjectId } from 'mongodb';

const empleadoResolver: IResolvers = {
 Query: {
  obtenerEmpleados: async (parent, args, context: Db) => {
   try {
    return await context.collection('empleados').find().toArray() ?? [];
   } catch (error) {
    console.log(error);
   }
  }
 },
 Mutation: {
  crearEmpleado: async (parent, args, context: Db) => {
   try {
    const reg_ex = new RegExp(args?.empleado?.nombre, 'i');
    const empleadoColl = await context.collection('empleados').findOne({ nombre: reg_ex });
    console.log(empleadoColl);
    if (empleadoColl) throw new Error("Empleado ya existe");

    await context.collection('empleados').insertOne(args.empleado);
    return "Empleado creado exitosamente";
   } catch (error) {
    console.log(error);
    return error;
   }
  },
  actualizarEmpleado: async (parent, args, context: Db) => {
   try {
    const { empleado } = args;
    const empleadoColl = await context.collection('empleados').findOne({ _id: new ObjectId(args._id) });
    if (!empleadoColl) throw new Error("Empleado no encontrado");

    await context.collection('empleados').updateOne(
     { _id: new ObjectId(args._id) },
     { $set: args.empleado }
    );

    return "Empleado actualizado exitosamente";
   } catch (error) {
    console.log(error);
   }
  }
 },
 Empleado: {
  async habilidades(parent, args, context: Db) {
   try {
    const habilidadesList = parent.habilidades.map(async (id: String) => {
     return await context.collection('habilidades').findOne({ _id: new ObjectId(id.toString()) });
    });
    return habilidadesList;
   } catch (error) {
    console.log(error);
   }
  }
 }
};

export default empleadoResolver;