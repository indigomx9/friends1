import express from "express";
import path from "path";
import hbs from "express-handlebars";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { friendRt } from "./routes/friendRt.js";
import { get404 } from "./controllers/errorCon.js";

(async () => {
    const app = express();

    app.set("view engine", "hbs");
    app.set("views", path.join(__dirname, "../src/views"));
    app.engine(".hbs", hbs({
        defaultLayout: "main", extname: ".hbs",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials")
    }));

    app.use(express.static(path.join(__dirname, "../src/public")));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use("/", friendRt);
    app.use(get404);

    const port = process.env.PORT || 9000;
    app.listen(port, () => {
        console.log(`Server: http://localhost:${port}`);
        console.log("Press Ctrl + C to exit.");
    })
})();









