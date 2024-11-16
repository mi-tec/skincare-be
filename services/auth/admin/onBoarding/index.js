import bcrypt from "bcrypt";
import { dbquery } from "../../../../controller/db.js";

export const onBoarding = async (req, res) => {
	try {
		const {
			allergies,
			medications,
			skinConditions,
			preTreatment,
			insInfo,
			emergencyContact,
			consentFrom,
			other,
			user
		} = req.body

		const _createUserHealth = await dbquery("INSERT INTO TBL_USERS_HEALTH_INFO ( USER_ID,ALLERGIES,MEDICATIONS,SKIN_CONDITIONS,PREVIOUS_ONGOING_TREATMENT,INSURANCE_INFORMATION,EMERGENCY_CONTACT,CONSENT_FROM,OTHER ) VALUES ( ?,?,?,?,?,?,?,?,? )", [user?.id, allergies,
			medications,
			skinConditions,
			preTreatment,
			insInfo,
			emergencyContact,
			consentFrom,
			other]);

		if (_createUserHealth?.affectedRows === 1) {
			dbquery("UPDATE TBL_USERS SET IS_ON_BOARDING = ? WHERE ID = ?", [0, user?.id])

			return res.status(200).json({ status: 1, msg: 'User Health Saved', data: {} });
		}

		return res.status(400).json({ status: -1, msg: 'Error creating user health', data: {} });
	} catch (error) {
		return res.status(400).json({ status: -1, msg: error.message, data: {} });
	}
}
