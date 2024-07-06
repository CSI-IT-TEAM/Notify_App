export const loginConfig = {
    'USER_ID': '',
    'USER_PASS': '',
}

export const getAuthUserConfig = (qType, empID, expoToken, loginYMD = '') => {
    return {
        'PROCEDURE': 'LMES.PKG_ALARM_UPLOAD.USER_ACTIVITY_LOG_SAVE',
        'V_P_QTYPE': qType,
        'V_P_EMPID': empID,
        'V_P_EXPO_TOKEN': expoToken,
        'V_P_LOGIN_DATE': loginYMD,
        'OUT_CURSOR': ''
    }
}

export const getUpdateUserAlarmConfig = (empID, alarmID, alarmReg) => {
    return {
        'PROCEDURE': 'LMES.PKG_ALARM_UPLOAD.USER_ALARM_SETTING_SAVE',
        'V_P_QTYPE': 'U',
        'V_P_SETTING': alarmReg,
        'V_P_EMPID': empID,
        'V_P_ALARM_ID': alarmID,
        'OUT_CURSOR': ''
    }
}