const User = require("../models/user");

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find();
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "User not found"
        });
    }
    return res.json(user);
}

async function handleUpdateUser(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "User not found"
        });
    }
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    return res.json({
        status: "success",
        user: updatedUser
    });
}

async function handleDeleteUser(req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "User not found"
        });
    }

    await User.findByIdAndDelete(req.params.id);

    return res.json({
        status: "success",
        message: "User deleted successfully"
    });
}

async function handleCreateUser(req, res) {
    const body = req.body;

    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email
    ) {
        return res.status(400).json({
            status: "error",
            message: "Invalid request body"
        });
    }

    const userData = {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
    };
    
    // Add optional fields if provided
    if (body.job_title) userData.job_title = body.job_title;
    if (body.gender) userData.gender = body.gender;
    if (body.ip_address) userData.ip_address = body.ip_address;

    const newUser = await User.create(userData);

    return res.status(201).json({
        status: "success",
        message: "User created successfully",
        user: newUser
    });
}









module.exports = {
    handleGetAllUsers, 
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser,
    handleCreateUser
};





