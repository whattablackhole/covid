
import { getUsers } from "./common/usersAPI";
import "./style.css";
import "./style.scss";
import "./assets/cat.jpg"
getUsers().then(json => console.log(json));