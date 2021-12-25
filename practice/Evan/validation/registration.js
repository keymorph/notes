module.exports = function registration(req, res) {
    const { email, password } = req.body;

    /*  Email and password validation */
    //Check if email and password fields exist
    if (!email || !password) {
        return res.status(400).json({ error: "Empty field in form input." });
    }

    // Check for valid email
    if (email.length < 5 || email.length > 50 || !email.includes("@")) {
        return res.status(400).json({ error: "Invalid email address." });
    }

    // Check for valid password
    if (password.length < 6 || password.length > 40) {
        return res
            .status(400)
            .json({ error: "Password must be between 6 and 40 characters." });
    }
};