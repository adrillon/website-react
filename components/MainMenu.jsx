import React, { Component } from 'react'
import NavMenu from './NavMenu';
import InfoCard from './InfoCard';
import ContactLinksList from './ContactLinksList';
import LanguageSelector from './LanguageSelector';
import '../css/mainmenu.scss';

class MainMenu extends Component {
    render() {
        return (
            <nav id="mainmenu" >
                <InfoCard />
                <NavMenu />
                <ContactLinksList />
                <LanguageSelector />
            </nav>
        )
    }
}

export default MainMenu;
