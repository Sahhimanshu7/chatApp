import auth from "../config/firebase-config.js";

export const getAllUsers = async (req,res) =>{
    const maxResults = 10;
    let users = [];

    try {
        const userRecords = await auth.listUsers(maxResults);

        userRecords.users.forEach((user) => {
            const { uuid, email, displayName, photoURL } = user;
            users.push({ uuid, email, displayName, photoURL });
        });
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async (req,res) =>{
    try {
        const userRecords = await auth.getUser(req.params.userId);

        const { uuid, email, displayName, photoURL } = userRecords;

        res.status(200).json({ uuid, email, displayName, photoURL });
    } catch (error) {
        console.log(error);
    }
}