/**
 * This is a middleware 
 */
module.exports.middleware1 = () => {
    return({
        before: (handler, next) => {
            console.log("Before");
            next();
        },
        after: (handler, next) => {
            console.log("After");
            next();
        }
    })
}

module.exports.middleware2 = () => {
    const before = (handler, next) => {
        console.log("Second middleware before"); next();
    }

    const after = (handler, next) => {
        console.log("second middleware after")
        next();
    }

    return({
        before,
        after
    });
}