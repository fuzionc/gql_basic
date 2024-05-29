import { gql, DocumentNode } from "apollo-boost";

export const GET_EMPLOYEES: DocumentNode = gql`
{
  obtenerEmpleados{
    _id,
     nombre
  }
}
`;