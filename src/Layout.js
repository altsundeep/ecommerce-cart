import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import Header from './components/Header'
import Cart from './components/Cart'
import Store from './components/Store'

const Layout = () => (
    <div>
        <Header />
        <Route path="/store" exact component={Store} />
        <Route path="/cart" exact component={Cart} />
        <Route excat path="/">
            <Redirect to="/store" />
        </Route>
    </div>
)

export default Layout
