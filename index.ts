import figlet from "figlet";
import Elysia from "elysia";

const port = 3000;
const server = new Elysia()
    .onError(({ code, error, set }) => {
        if (code === 'NOT_FOUND') {
            return figlet.textSync("404");
        }

        set.headers = { 'content-type': 'text/html' };
        set.status = 500;
        return `Error <b>${code}</b>: <span style="color: red">${error.toString()}</span>`;
    })
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
    .listen(port);

console.log(`Listening on PORT http://localhost:${server.server?.port}`);
