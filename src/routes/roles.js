module.exports = app => {

    const Roles = app.db.models.Roles;

    app.route('/roles')
        .get((req, res) => {
            Roles.findAll({})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post((req, res) => {
            Roles.create(req.body).then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        });

};