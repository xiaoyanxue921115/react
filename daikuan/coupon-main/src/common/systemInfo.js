import { message } from 'antd';

const systemAlert = (str) => {
   message.error(str);
}

const systemWarn = (str) => {
   message.warning(str);
}

const systemSuccess = (str) => {
   message.success(str);
}

window.oAlert = window.alert;
window.alert = systemAlert;
window.systemWarn = systemWarn;
window.systemSuccess = systemSuccess;

export default {systemAlert, systemWarn, systemSuccess};