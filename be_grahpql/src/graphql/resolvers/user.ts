import { IResolvers } from '@graphql-tools/utils';
import { Db, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const CrearToken = (usuario: any, secreto: jwt.Secret, expiracion: any) => {
const { _id, email, nombre, apellido } = usuario;
return jwt.sign({ _id, email, nombre, apellido }, secreto, { expiresIn: expiracion });
}

const usuarioResolver: IResolvers = {
Query: {
obtenerUsuarios: async (parent, args, context: Db) => {
try {
return await context.collection('usuarios').find().toArray() ?? [];
} catch (error) {
console.log(error);
}
},
obtenerUsuarioPorId: async (parent, args, context: Db) => {
try {
return await context.collection('usuarios').findOne({ _id: new ObjectId(args._id) });
} catch (error) {
console.log(error);
}
},
obtenerUsuarioActual: async (parent, args, context: Db) => {
const token = args?.token;
if (!token) throw new Error("Token no proporcionado");
try {
const usuario: any = jwt.verify(token, "abc.123");
return await context.collection('usuarios').findOne({ _id: new ObjectId(usuario?._id) });
} catch (error) {
console.log(error);
}
}
},
Mutation: {
crearUsuario: async (parent, args, context: Db) => {
try {
await context.collection('usuarios').insertOne(args.usuarioInput);
return "Usuario creado exitosamente";
} catch (error) {
console.log(error);
}
},
actualizarUsuario: async (parent, args, context: Db) => {
try {
const usuarioColl = await context.collection('usuarios').findOne({ _id: new ObjectId(args._id) });

if (!usuarioColl) throw new Error("Usuario no encontrado");

await context.collection('usuarios').updateOne(
{ _id: new ObjectId(args._id) },
{ $set: args.usuarioInput }
);

return "Usuario actualizado exitosamente";
} catch (error) {
console.log(error);
}
},
autenticarUsuario: async (parent, args, context: Db) => {
const { email, password } = args?.autenticacionInput;
const usuarioColl = await context.collection('usuarios').findOne({ email: email, password: password });
if (!usuarioColl) throw new Error("Usuario o contraseña incorrectos");
return {
token: CrearToken(usuarioColl, "abc.123", '24h')
};
}
}
};

export default usuarioResolver;
