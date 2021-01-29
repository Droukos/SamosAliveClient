import NProgress from 'nprogress';
import {VueRouter} from "vue-router/types/router";
const progressShowDelay = 100;
let routeResolved = false;
/**
 * Initializes NProgress after a specified delay only if the route was not resolved yet.
 */

export function cancelTopProgress() {
    routeResolved = true;
    NProgress.done();
}
function tryInitProgress() {
    routeResolved = false;
    setTimeout(()=> {
        if (!routeResolved) {
            NProgress.start();
        }
    }, progressShowDelay);
}
export default function initProgress(router: VueRouter) {
    router.afterEach(cancelTopProgress);
    router.beforeEach((to, from, next) => {
        tryInitProgress();
        return next();
    });
}