let Vue;

/**
 * Pass a reactive object or array into this function, and each time a change is
 * triggered, the source of the reactive change will be printed to the browser
 * console.
 */
const blame = (reactive, prop) => {
    /*
     * We will create a dummy watcher on the reactive object passed in. The
     * watcher will have an array of dependencies, and we want to somehow
     * retrieve the name of the dependency that triggered the re-computation.
     *
     * For example:
     *
     * const mostRecentNotify;
     * const vm = new Vue();
     * vm.$watch(theObj, () => { console.log(mostRecentNotify); });
     * const watcher = vm._watchers[0];
     * watcher.deps.forEach(decorate the dep's notify() function to set mostRecentNotify);
     *
     * The big question is, how will we know the NAME (or any relevant
     * identification information) for each dep? They only store an ID number
     * and array of subs by default.
     *
     * FIRST GOAL: output the ID number of the most recent notify.
     */

    const fn =
        typeof reactive === 'function'
            ? reactive
            : prop
            ? () => reactive[prop]
            : () => reactive;

    let mostRecentNotify = -1;

    const tempVm = new Vue();
    tempVm.$watch(fn, () => {
        console.log(
            'ID of the dependency that triggered this change: ',
            mostRecentNotify
        );
    });
    const tempWatch = tempVm._watchers[0];
    tempWatch.deps.forEach((dep) => {
        const originalNotify = dep.notify;

        dep.notify = () => {
            mostRecentNotify = dep.id;
            originalNotify.call(dep);
        };
    });
};

const install = (_Vue) => {
    Vue = _Vue;
    Vue.blame = blame;
    if (window) {
        window.VueBlame = blame;
    }
};

export default {
    install
};
