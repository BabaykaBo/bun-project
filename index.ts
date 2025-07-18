import figlet, { fonts } from "figlet";

const server = Bun.serve({
    port: 3000,
    routes: {
        "/": new Response(figlet.textSync("Hello world!")),
        "/about": new Response(figlet.textSync("About me!")),
        "/feed": _ => {
            throw new Error("Abandoned page!");
        },
    },
    fetch(_) {
        return new Response(figlet.textSync("Not Found"), { status: 404 });
    },
    error(error) {
        return new Response(`Error: ${error.message}`, { status: 500 });
    }
})

console.log(`Listening on PORT http://localhost:${server.port}`);
