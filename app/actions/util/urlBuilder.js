
import path from 'path'

const prefix = ''

export default class UrlBuilder {
    constructor(prefix) {
        this.prefix = prefix
    }
    build(...parts) {
        return path.join.apply(null, ['/', baseUrl || '', prefix].concat(parts.map(i => i.toString())))
    }
}

