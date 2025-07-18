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
            case '/feed':
                throw new Error("Abandoned page!");
                
            default:
                text = "404";
                break;
        }

        return new Response(figlet.textSync(text));
    },
    error(error) {
        return new Response(`Error 500: ${error.message}`);
    }
})

console.log(`Listening on PORT http://localhost:${server.port}`);
