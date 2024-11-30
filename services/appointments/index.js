import { response } from "express";
import { dbquery } from "../../controller/db.js";
import { queries } from "../../controller/queries/queries.js";

export const createAppointments = async (req, res) => {
  try {
    const { serviceName, appointmentDate, note, userId } = req?.body;

    if (!note) {
      throw new Error("Note is required");
    }

    if (!appointmentDate) {
      throw new Error("Appointment Date is required");
    }

    if (!userId) {
      throw new Error("User ID is required");
    }

    const date = new Date(appointmentDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const _response = await dbquery(
      "INSERT INTO TBL_APPOINTMENTS ( service_name, start_time, note, user_id ) values ( ?,?,?,? )",
      [serviceName, formattedDate, note, userId],
    );

    return res.status(200).json({ status: 1, msg: "success", data: {} });
  } catch (error) {
    return res.status(400).json({ status: -1, msg: error.message, data: {} });
  }
};

export const getAppointment = async (req, res) => {
  try {
    const { serviceName } = req?.query;

    if (!serviceName) {
      throw new Error("Service Name is required");
    }

    const _response = await dbquery(
      `SELECT
	*
      FROM
	TBL_APPOINTMENTS ta
      INNER JOIN TBL_USERS tu ON
	tu.ID = ta.USER_ID
      INNER JOIN TBL_USERS_HEALTH_INFO tuhi ON
	tuhi.USER_ID  = ta.USER_ID
      WHERE
	service_name = ?`,
      [serviceName],
    );

    return res.status(200).json({ status: 1, msg: "success", data: _response });
  } catch (error) {
    return res.status(400).json({ status: -1, msg: error.message, data: {} });
  }
};

export const getAppointmentSingle = async (req, res) => {
  try {
    const { userId, service } = req?.query;

    let columnName = "";
    let value = "";

    if (userId) {
      columnName = `ta.USER_ID`;
      value = userId;
    } else if (service) {
      columnName = "ta.SERVICE_NAME";
      value = service;
    }

    const _response = await dbquery(
      `SELECT
      *
     FROM
	TBL_APPOINTMENTS ta
           INNER JOIN TBL_USERS tu ON
	tu.ID = ta.USER_ID
           INNER JOIN TBL_USERS_HEALTH_INFO tuhi ON
	tuhi.USER_ID  = ta.USER_ID
           WHERE ${columnName} = ?`,
      [value],
    );

    return res
      .status(200)
      .json({ status: 1, msg: "success", data: _response ?? [] });
  } catch (e) {
    return res.status(400).json({ status: -1, msg: e.message, data: {} });
  }
};
