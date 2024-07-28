const User = require('../models/user');
const bcrypt = require('bcrypt');

const authController = {
  showSignupForm(req, res) {
    res.render('auth/signup');
  },

  async signup(req, res) {
    const { name, username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, username, password: hashedPassword, email });
    res.redirect('/auth/login');
  },

  showLoginForm(req, res) {
    res.render('auth/login');
  },

  async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      // Lưu trữ thông tin người dùng trong session
      req.session.user = user;
      res.redirect('/');
    } else {
      res.render('auth/login', { error: 'Tài khoản không tồn tại hoặc mật khẩu sai.' });
    }
  },

  logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/auth/login');
    });
  }
};

module.exports = authController;
