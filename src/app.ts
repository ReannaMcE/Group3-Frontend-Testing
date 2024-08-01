import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";

import { getAllJobRoles, getHomePage, getSingleJobRole } from "./controllers/RoleController";
import { dateFilter } from "./filter/DateFilter";
import  AuthRoutes from "./Routes/AuthRoutes";


const app = express();

const env = nunjucks.configure('views',{
  autoescape: true,
  express: app
});

app.use(express.static('public'));
app.set('view engine', 'html')

env.addFilter('date',dateFilter);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(session({ secret: 'SUPER_SECRET', cookie: { maxAge: 28800000 }}));

app.use(AuthRoutes);

declare module "express-session" {
  interface SessionData {
    token: string;
  }
}

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.get('/jobRoles', getAllJobRoles);
app.get('/homepage' , getHomePage)
app.get('/jobRoles/:id', getSingleJobRole);
