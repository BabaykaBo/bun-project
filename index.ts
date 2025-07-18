import figlet from "figlet";
import Elysia from "elysia";

const port = 3000;
const server = new Elysia()
    .onError(({ code, error }) => {
        return new Response(`Error <b>${code}</b>: <span style="color: red">${error.toString()}</span>`,
            {
                status: 500,
                headers: { 'Content-Type': 'text/html' }
            });
    })
    .get("/", _ => new Response(figlet.textSync("Hello world!")))
    .get("/about", _ => new Response(figlet.textSync("About me!")))
    .get("/feed", (_): never => {
        throw new Error("Abandoned page!");
    })
    .get("/greet", async (_): Promise<Response> => {
        const text = await Bun.file('storage/files/greet.txt').text();
        return new Response(`<pre>${text}</pre>`, {
            headers: {
                'Content-Type': 'text/html'
            }
        });
    })
    .listen(port);

console.log(`Listening on PORT http://localhost:${server.server?.port}`);
