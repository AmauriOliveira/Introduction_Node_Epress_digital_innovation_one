const fs = require('fs');

const { join } = require('path');

const filePach = join(__dirname, 'user.json');

const getUsers = () => {
    const data = fs.existsSync(filePach)
        ? fs.readFileSync(filePach)
        : [];

    try {
        return JSON.parse(data);
    } catch (error) {
        return [];
    };
};

const saveUsers = (users) => fs.writeFileSync(filePach, JSON.stringify(users, null, '\t'));

const userRoutes = (app) => {

    app.route('/users/:id?')
        .get((req, res) => {
            const users = getUsers();

            res.send({ users });
        })
        .post((req, res) => {
            const users = getUsers();
            users.push(req.body);
            saveUsers(users);

            res.status(201).send('<h1>OK</h1>');
        })
        .put((req, res) => {
            const users = getUsers();
            saveUsers(users.map(user => {
                if (user.id == req.params.id) {
                    return {
                        ...user,
                        ...req.body
                    }
                }
                return user
            }));
            res.status(200).send('<h1>OK</h1>');
        })
        .delete((req, res) => {
            res.status(200).send('<h1>OK</h1>');
        })
}

module.exports = userRoutes;
