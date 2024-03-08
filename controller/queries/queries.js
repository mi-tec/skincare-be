export const queries = {
    selectExistingUser: "SELECT * FROM TBL_USERS WHERE USERNAME = ?",
    selectExistingUserByEmail: "SELECT * FROM TBL_USERS WHERE EMAIL = ?",
    updateAccessToken: "UPDATE TBL_USERS SET ACCESS_TOKEN = ? WHERE ID = ?",
    getAdminPermissions: "SELECT tau.ID, tau.USERNAME, CONCAT('[', GROUP_CONCAT(tarp.permission_id), ']') AS permissions FROM TBL_USERS tau INNER JOIN TBL_ADMIN_USER_ROLE taur ON taur.user_id = tau.ID INNER JOIN TBL_ADMIN_ROLE_PERMISSION tarp ON tarp.role_id = taur.role_id WHERE tau.ID = ?"
};
