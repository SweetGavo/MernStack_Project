import http, { IncomingMessage, Server, ServerResponse } from "http";
import { parser } from "html-metadata-parser";



const server: Server = http.createServer(

  async (req: IncomingMessage, res: ServerResponse) => {

    if (req.method === "GET") {
      const url: any = `https://${req.url?.split("/")[1]}`;
      
      const message: any = {
        images: [],
        description: "none",
        title: null
    
      };

      let err;
      try {
        let result = await parser(url);
        const { image, description, title } = result.meta;
        const { images } = result;
        message.title = title;
        message.description = description;
        message.images.push(images);
        const keys = Object.keys(message);

        for (let i = 0; i <= 2; i++) {
          message[`${keys[i]}`] = message[`${keys[i]}`] == undefined ? "none" : message[`${keys[i]}`];
        }

        err = false

      } catch (error) {

        err = true

      } finally {
       
        if (err) {
          
          res.writeHead(400, { "Content-Type": "applivation/json" });
          res.end(JSON.stringify({ message: "Invalid request" }));
          return 0;
        } else {
          res.writeHead(200, { "Content-Type": "applivation/json" });
          res.end(JSON.stringify({ message }));
          return 1;
        }
      }
    }
  }
);

server.listen(3002, () => {
  console.log(`Server is presently running on port. Go to http://localhost:3001`);
  
});


