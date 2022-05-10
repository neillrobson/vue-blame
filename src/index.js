let Vue;

/**
 * Pass a reactive object or array into this function, and each time a change is
 * triggered, the source of the reactive change will be printed to the browser
 * console.
 */
const blame = () => {
    /*
     * We will create a dummy watcher on the reactive object passed in.  The
     * watcher will have an array of dependencies, and we want to somehow
     * retrieve the name of the dependency that triggered the re-computation.
     */
};

const install = (_Vue) => {
    Vue.theNameOfNeill = 'Neill Robson';
    Vue = _Vue;
    Vue.blame = blame;
    if (window) {
        window.VueBlame = blame;
    }
};

export default {
    install
};
