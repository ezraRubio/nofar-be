import { app } from "./app";
import config from "./config";

app.listen(config.PORT, (e)=>{
    if (e) console.error("app not running", e);
    console.log("app running on: ", config.PORT);
})
