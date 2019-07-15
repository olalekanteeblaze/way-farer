import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const Helper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(hashPassword, password);
  },
  generateToken(id) {
    const token = jwt.sign({
      userId: id,
    },
    process.env.SECRET,
    { expiresIn: '24h' });
    return token;
  },
};

export default Helper;
