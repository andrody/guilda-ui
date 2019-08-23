/*
*   @DECORATOR
*   Capture exceptions on route controllers and calls callback
*/
const catcher = (target, property, descriptor) => {
    const func = descriptor.value
    descriptor.value = function _newFunc(...args) {
        try {
            const childFunc = func.apply(this, args)
            if (childFunc instanceof Promise) {
                childFunc.catch(e => args[args.length - 1](e))
            }
        } catch (e) {
            console.log(e)
            args[args.length - 1](e)
        }
    }
    return descriptor
}

module.exports = {
    catcher,
}
