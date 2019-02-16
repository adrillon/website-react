import React, { Component } from 'react'
import MainMenu from '../components/MainMenu';

class Layout extends Component {
    render() {
        return (
            <>
            <nav>
                <MainMenu />
            </nav>
            <main>
                {this.props.children}
            </main>
            </>
        )
    }
}

export default Layout;

