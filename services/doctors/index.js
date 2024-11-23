import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbquery } from "../../controller/db.js";
import { queries } from "../../controller/queries/queries.js";

export const getDoctors = async (req, res) => {
  try {
    const _users = await dbquery("SELECT * FROM TBL_DOCTOR", []);

    return res.status(200).json({
      status: 1,
      msg: "",
      data: _users || [],
    });
  } catch (e) {
    return res
      .status(400)
      .json({ status: -1, msg: "Error Getting Nurses list", data: {} });
  }
};

export const createDoctor = async (req, res) => {
  try {
    console.error(req?.body);
    const { fullName, username, email, permittedService, password } = req?.body;

    const _user = await dbquery(
      "SELECT * FROM TBL_DOCTOR WHERE EMAIL = ? OR USERNAME = ?",
      [email, username],
    );

    if (_user?.length > 0) {
      throw new Error("User already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const _createUser = await dbquery(
      "INSERT INTO TBL_DOCTOR ( FULL_NAME, USERNAME, PASSWORD, EMAIL, PERMITTED_SERVICE ) VALUES ( ?,?,?,?,? )",
      [fullName, username, hashPassword, email, permittedService],
    );

    if (_createUser?.affectedRows === 1) {
      return res
        .status(200)
        .json({ status: 1, msg: "Account created successfully", data: {} });
    }
  } catch (e) {
    return res
      .status(400)
      .json({ status: -1, msg: "Error creating nurse", data: {} });
  }
};
