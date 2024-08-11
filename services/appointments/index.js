import { dbquery } from "../../controller/db.js";
import { queries } from "../../controller/queries/queries.js";

export const createAppointments = async (req, res) => {
    try {
        const { serviceName, appointmentDate, note } = req?.body;

        if (!note) {
            throw new Error("Note is required")
        }

        if (!appointmentDate) {
            throw new Error("Appointment Date is required")
        }

        const date = new Date(appointmentDate);

        // Format the date as 'YYYY-MM-DD HH:MM:SS'
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        const _response = await dbquery("INSERT INTO TBL_APPOINTMENTS ( service_name, start_time, note ) values ( ?,?,? )", [serviceName, formattedDate, note]);

        return res.status(200).json({ status: 1, msg: "success", data: {} });

    } catch (error) {
        return res.status(400).json({ status: -1, msg: error.message, data: {} });
    }
};

export const getAppointment = async (req, res) => {
    try {
        const { serviceName } = req?.query;

        if (!serviceName) {
            throw new Error("Service Name is required")
        }

        const _response = await dbquery("SELECT * FROM TBL_APPOINTMENTS WHERE service_name = ?", [serviceName]);

        return res.status(200).json({ status: 1, msg: "success", data: _response });

    } catch (error) {
        return res.status(400).json({ status: -1, msg: error.message, data: {} });
    }
};