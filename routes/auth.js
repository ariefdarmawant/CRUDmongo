import { getAllRefreshToken, login, refreshToken, register } from '../controllers/auth.js';
import { checkDuplicateEmailOrUsername, verifyToken } from '../middlewares/index.js';

const auth = (app) => {
    app.post('/register',checkDuplicateEmailOrUsername, register);
    app.post('/login',login)

    app.get('/refreshToken', verifyToken, getAllRefreshToken);
    app.post('/refreshToken', verifyToken, refreshToken);
}

export default auth;