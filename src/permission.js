import router from "./router";
import store from "./store";
import getPageTitle from "@/utils/get-page-title";

import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth"; // progress bar style
import { renewToken } from "@/api/user";

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 每次跳转前做的事
router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();
    // set page title
    document.title = getPageTitle(to.meta.title);
    // determine whether the user has logged in
    const hasToken = getToken();

    if (hasToken) {
        if (to.path === "/login") {
            // 登录，跳转首页
            next({ path: "/" });
            NProgress.done();
        } else {
            // 获取用户信息
            await store.dispatch("user/getInfo");
            // 若跳转页面为管理页，则需要检测是否为管理员用户，不是则跳转到主页
            if (to.path == "/manager" && store.getters.user.username != "root") {
                next({ path: "/" });
                NProgress.done();
            }
            // 判断该路径是否需要重新生成 token
            if (to.meta.requireAuth) {
                renewToken(store.getters.user.username).then((res) => {
                    store.dispatch("user/renewToken" , res.data);    // 重新生成token
                })
            }
            next();
        }
    } else if (!to.meta.requireAuth) {
        next();
    } else {
        next("/login");  // 需要登陆才能操作则跳转到登陆页面
    }
})

router.afterEach(() => {
    NProgress.done();
})