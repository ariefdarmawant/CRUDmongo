import { login, register } from '../controllers/auth.js';

const auth = (app) => {
    app.post('/register',register);
    app.post('/login',login)
}

export default auth;