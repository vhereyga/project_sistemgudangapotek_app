const User = require('../models/user');

exports.getAllUsers = (req, res) => {
    User.getAll((err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            return res.status(500).json({ error: "Failed to retrieve users" });
        }
        res.json(results);
    });
};

exports.createUser = (req, res) => {
    const { username, role, email, password } = req.body;

    if (!username || !role || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    console.log("Creating new user:", req.body);

    User.create({ username, role, email, password }, (err, result) => {
        if (err) {
            console.error("Error creating user:", err);
            return res.status(500).json({ error: "Failed to create user" });
        }
        res.status(201).json({ message: 'User created successfully', id: result.insertId });
    });
};

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { username, role, email, password } = req.body;

    if (!username || !role || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    console.log(`Updating user ID: ${id} with data:`, req.body);

    User.update(id, { username, role, email, password }, (err) => {
        if (err) {
            console.error(`Error updating user ID: ${id}`, err);
            return res.status(500).json({ error: "Failed to update user" });
        }
        res.json({ message: 'User updated successfully' });
    });
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;

    console.log(`Deleting user ID: ${id}`);

    User.delete(id, (err) => {
        if (err) {
            console.error(`Error deleting user ID: ${id}`, err);
            return res.status(500).json({ error: "Failed to delete user" });
        }
        res.json({ message: 'User deleted successfully' });
    });
};

exports.loginUser = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    console.log("Login attempt for username:", username);

    User.getByUsername(username, (err, user) => {
        if (err) {
            console.error("Error during login:", err);
            return res.status(500).json({ error: "Login failed" });
        }
        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        res.json({ message: 'Login successful', user });
    });
};
