import figlet, { fonts } from "figlet";

const server = Bun.serve({
    port: 3000,
    fetch(req) {
        const url = new URL(req.url);

        let text: string;
        switch (url.pathname) {
            case '/':
                text = "Hello world!";
                break;
            case '/about':
                text = "About me!";
                break;
            default:
                text = "404";
                break;
        }

        return new Response(figlet.textSync(text));
    }
})

console.log(`Listening on PORT http://localhost:${server.port}`);
