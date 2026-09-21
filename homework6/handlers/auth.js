const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    AccountSignUp,
    AccountLogin,
    validate,
    AccountReset
} = require("../pkg/accounts/validate");

const accounts = require("../pkg/accounts/accounts");
const config = require("../pkg/config");

const register = async(req, res) => {
    try{
        await validate(req.body, AccountSignUp);
        const exists = await accounts.getByEmail(req.body.email);
        if(exists){
            return res.status(400).send("Account with this email already exists!");
        };
        console.log("req.body.password", req.body.password); // plain test 123 ke ni go prikaze kako 123
        req.body.password = bcrypt.hashSync(req.body.password);
        console.log("req.body.password", req.body.password);  // passwordot ke ni e hashed, odnosno enkriptiran, nema da veke 123
        const acc = await accounts.create(req.body);
        return res.status(201).send(acc);
    }catch(err){
        console.log(err);
        return res.status(err.status).send(err.error);
    }
};

const login = async(req, res) => {
    try{
        await validate(req.body, AccountLogin);

        const {email, password} = req.body;

        const account = await accounts.getByEmail(email);

        if(!account){
            return res.status(400).send("Account not found!");
        };

        if(!bcrypt.compareSync(password, account.password)){
            return res.status(400).send("Wrong password!");
        };

        const payload = {
            fullname: account.fullname,
            email: account.email,
            id: account._id,
            expiry: new Date().getTime()/ 1000 + 7 * 24 * 60 * 60 // 7 days in the future, 1 week
        }

        const token = jwt.sign(payload, config.getSection("development").jwt);
        return res.status(200).send(token);

    }catch(err){
        console.log(err);
        return res.status(err.status).send(err.error);
    }
};

const refreshToken = async(req, res ) => {

    const payload = {
        ...req.auth,
        exp: new Date().getTime()/ 1000 + 7 * 24 * 60 * 60 // 7 days in the future, 1 week
    };

    const token = jwt.sign(payload, config.getSection("development").jwt);
    return res.status(200).send(token);
};


const resetPassword = async (req, res) => {
    console.log("1");

    await validate(req.body, AccountReset);
    console.log("2");

    const { email, old_password, new_password } = req.body;

    const userAccount = await accounts.getByEmail(email);
    console.log("3", userAccount);

    if (!userAccount) {
        return res.status(404).send("Account not found");
    }

    if (old_password === new_password) {
        return res.status(400).send("New password cannot be the same as the old password!");
    }

    if (!bcrypt.compareSync(old_password, userAccount.password)) {
        return res.status(400).send("Old password is incorrect");
    }

    console.log("4");

    const newPasswordHashed = bcrypt.hashSync(new_password);

    const passwordChanged = await accounts.setNewPassword(
        userAccount._id.toString(),
        newPasswordHashed
    );

    console.log("5", passwordChanged);

    return res.status(200).send(passwordChanged);
};

module.exports = {
    login,
    register,
    refreshToken,
    resetPassword
}