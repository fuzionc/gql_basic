import { IResolvers } from '@graphql-tools/utils';
import { CartoonDataSource } from '../../data/cartoonsdata';

const cartoonsResolver: IResolvers = {
    Query: {
        ObtenerDibujosAnimados() {
            return CartoonDataSource;
        }
    }
}

export default cartoonsResolver;