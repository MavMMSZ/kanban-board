import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(404).send('User not found');
    }
    if (!await bcrypt.compare(password, user.password)) {
        return res.status(403).send('Invalid password');
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY);
    return res.send(token);
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
