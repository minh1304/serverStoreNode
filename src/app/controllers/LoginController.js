import Account from '../models/Account.js';
import {
    mongooseToObject,
    multipleMongooseToObject,
} from '../../util/mongoose.js';
import jwt from 'jsonwebtoken';
class CourseController {
    // [GET] /login
    show(req, res, next) {
        res.render('login');
    }

    //[POST] /login
    login(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        Account.findOne({
            username: username,
            password: password,
        })
            .then((data) => {
                if (data) {
                    var token = jwt.sign(data.id, 'mk');
                    // res.json('Bạn đã đăng nhập thành công');
                    return res.status(200).json({
                        message: 'OK',
                        token: token,
                    });
                } else {
                    res.json('Thất bại ');
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json('Lỗi sever');
            });
    }
}
export default new CourseController();
