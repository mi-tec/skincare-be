import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbquery } from "../../../../controller/db.js";
import { queries } from "../../../../controller/queries/queries.js";

export const register = async (req, res) => {
    try {
        const {
            username,
            email,
            number,
            nic,
            country,
            password,
        } = req.body

        const _user = await dbquery("SELECT * FROM TBL_USERS WHERE EMAIL = ? OR USERNAME = ?", [email, username]);

        if (_user?.length > 0) {
            throw new Error("User already exist");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const _createUser = await dbquery("INSERT INTO TBL_USERS ( USERNAME, PASSWORD, EMAIL, CONTACT_NUMBER, NIC, COUNTRY ) VALUES ( ?,?,?,?,?,? )", [username, hashPassword, email, number, nic, country]);

        if (_createUser?.affectedRows === 1) {
            return res.status(200).json({ status: 1, msg: 'User created successfully', data: {} });
        }

        return res.status(400).json({ status: -1, msg: 'Error creating user', data: {} });
    } catch (error) {
        return res.status(400).json({ status: -1, msg: error.message, data: {} });
    }
}