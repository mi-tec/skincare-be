import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbquery } from "../../../../controller/db.js";
import { queries } from "../../../../controller/queries/queries.js";

export const login = async (req, res) => {
	try {
		const { username, password } = req?.body;

		if (!username || !password) {
			throw new Error("Username or Password is empty");
		}

		const _user = await dbquery("SELECT * FROM TBL_USERS WHERE USERNAME = ?", [username]);

		if (_user?.length === 0) {
			throw new Error("User cannot found");
		}

		const { ID: id, USERNAME: _username, EMAIL: email, PASSWORD: _password, IS_ON_BOARDING: _isOnBoarding } = _user[0];

		const verifyPassword = await bcrypt.compare(password, _password);

		if (!verifyPassword) {
			throw new Error("Wrong password");
		}

		const _secretKey = process.env.SECRET_KEY;

		if (!_secretKey) {
			throw new Error("Secret key not added");
		}

		const _accessToken = jwt.sign({ username: _username, email: email }, _secretKey, {
			expiresIn: "1d",
		});

		dbquery(queries.updateAccessToken, [_accessToken, id]);

		const _userResponse = {
			user: { id: id, username: _username, email: email, isOnBoarding: _isOnBoarding },
			accessToken: _accessToken,
		};

		return res.status(200).json({ status: 1, msg: "success", data: _userResponse });

	} catch (error) {
		return res.status(400).json({ status: -1, msg: error.message, data: {} });
	}
};
