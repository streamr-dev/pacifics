// adapted from http://stackoverflow.com/questions/24660096/correct-way-to-write-loops-for-promise
// TODO: of course, the reasonable way is to use async await and normal loops instead! Do we have them already?

export const promiseWhile = function(condition, action) {
    return condition() ? action().then(promiseWhile.bind(null, condition, action)) : null
}

export const promiseDoWhile = function(action, condition) {
    return action().then(promiseWhile.bind(null, condition, action))
}

export const promiseFor = function(condition, increment, action, value) {
    return condition(value) ?
        action(value)
            .then(increment.bind(null, value))
            .then(promiseFor.bind(null, condition, increment, action)) :
        value
}

export const promiseDoFor = function(action, condition, increment, value) {
    return action(value)
        .then(increment.bind(null, value))
        .then(promiseFor.bind(null, condition, increment, action))
}
