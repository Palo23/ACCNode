import bcrypt from 'bcryptjs';

module.exports = app => {

    const Users = app.db.models.Users;

    app.route('/users')
        .get((req, res) => {
            Users.findAll({})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        })
        .post(async(req, res) => {
            const { password } = req.body;
            req.body.password = await bcrypt.hashSync(password, bcrypt.genSaltSync(8));
            Users.create(req.body).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route('/users/:id')
        .get((req, res) => {
            Users.findByPk(req.params.id, {
                    attributes: ["id", "nombre", "email", "updatedAt"]
                })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .delete((req, res) => {
            Users.destroy({ where: req.params })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .put((req, res) => {
            Users.update(req.body, { where: req.params })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        });

};