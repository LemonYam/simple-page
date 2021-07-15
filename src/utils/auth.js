import Cookies from "js-cookie"

const uToken = "u_token";   // 用户token
const darkMode = "dark_mode";   // 黑夜白天模式
const cToken = "c_token";   // 一次性token

// 获取Token
export function getToken() {
    return Cookies.get(uToken);
}

export function getCtoken() {
    return Cookies.get(cToken);
}

// 设置Token，1天,与后端同步
export function setToken(token) {
    return Cookies.set(uToken, token, {expires: 1});
}

export function setCtoken(token) {
    return Cookies.set(cToken, token, {expires: 1});
}

// 删除Token
export function removeToken() {
    return Cookies.remove(uToken);
}

export function removeCtoken() {
    return Cookies.remove(cToken);
}

export function removeAll() {
    return Cookies.Cookies.removeAll();
}

export function setDarkMode(mode) {
    return Cookies.set(darkMode, mode, {expires: 365});
}

export function getDarkMode() {
    return !(undefined === Cookies.get(darkMode) || "false" === Cookies.get(darkMode));
}