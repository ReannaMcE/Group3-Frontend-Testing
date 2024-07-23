import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";
import { dateFilter } from "./filters";

import { getAllJobRoles } from "./controllers/RoleController";

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

const env = nunjucks.configure('views',{
  autoescape: true,
  express: app
} )

env.addFilter('date', dateFilter);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(session({ secret: 'SUPER_SECRET', cookie: { maxAge: 28800000 }}));

declare module "express-session" {
  interface SessionData {
    token: string;
  }
}

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.get('/jobRoles', getAllJobRoles);