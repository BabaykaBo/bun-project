import figlet from "figlet";
import Elysia from "elysia";
import myPlugin from "./my_plugin";

const port = 3000;
const server = new Elysia()
    .state('version', 1)
    .decorate('getDate', ()=> Date.now())
    .onError(({ code, error, set }) => {
        if (code === 'NOT_FOUND') {
            return figlet.textSync("404");
        }

        set.headers = { 'content-type': 'text/html' };
        set.status = 500;
        return `Error <b>${code}</b>: <span style="color: red">${error.toString()}</span>`;
    })
    .use(myPlugin)
    .get("/", _ => figlet.textSync("Hello world!"))
    .get("/about", _ => figlet.textSync("About me!"))
    .get("/feed", (_): never => {
        throw new Error("Abandoned page!");
    })
    .get("/greet", async ({ set }): Promise<string> => {
        const text = await Bun.file('storage/files/greet.txt').text();

        set.headers = { 'content-type': 'text/html' };
        return `<pre>${text}</pre>`;

    })
    .get("/post/:id", ({ params: { id } }) => figlet.textSync(`Post ${id}`))
    .get("/track/*", _ => { return 'Track' })
    .get("/tracks", ({ set, store, getDate }) => {
        set.headers = {
            'content-type': 'application/json'
        }
        return JSON.stringify({
            tracks: [
                'Dancing', "Sam I", "Holly"
            ],
            version: store.version,
            date: getDate()
        })
    })
    .post("/post", (body) => { return body })
    .listen(port);

console.log(`Listening on PORT http://localhost:${server.server?.port}`);
