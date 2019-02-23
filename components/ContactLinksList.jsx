import React, { Component } from 'react'
import { Link } from '../utils/routes';
import { OptionsContext } from '../utils/OptionsContext';

class ContactLinksList extends Component {
    render() {
        return (
            <OptionsContext.Consumer>
                {value =>
                        <ul id="contactlinks" >
                            {value.contact_links.map((link) => (
                                <li key={link.slug} >
                                    <a href={link.url} title={link.name} target="_blank" className={"contactlink " + link.faclass} />
                                </li>
                            ))}
                        </ul>
                }
            </OptionsContext.Consumer>
        )
    }
}

export default ContactLinksList;
