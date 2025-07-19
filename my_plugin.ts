import Elysia from "elysia";

const myPlugin = new Elysia()
    .state('plugin-version', 1)
    .get('/form-plugin', _ => 'Hi');

export default myPlugin;