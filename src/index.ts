import app from "./app";
import { createServer } from "http";

// start the express app
const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;

    const httpServer = createServer(app);

    httpServer.listen(PORT, () => {
        console.log(`Server started on port ${PORT} 🔥🔥🔥`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
