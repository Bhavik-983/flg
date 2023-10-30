import { Model, Server, RestSerializer } from 'miragejs';

import { getLanguages } from './controllers/Language';

// eslint-disable-next-line import/prefer-default-export
export function makeServer({ environment = 'development' } = {}) {
  return new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    models: {
      product: Model,
    },

    // Runs on the start of the server
    seeds(server) {
      // disballing console logs from Mirage
      // eslint-disable-next-line no-param-reassign
      server.logging = false;
      // products.forEach((item) => {
      //     server.create('product', { ...item });
      // });
    },

    routes() {
      this.namespace = 'api';

      this.get('/language', getLanguages.bind(this));
    },
  });
}
