import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import ReactRouter from './reactRouter.jsx'

import store from './store.js'

render(
    <Provider store={store}>
        <ReactRouter />
    </Provider>,
    document.getElementById('root')
)
