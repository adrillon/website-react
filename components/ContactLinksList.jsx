import React, { Component } from 'react'
import { Link } from '../utils/routes';
import { OptionsContext } from '../utils/OptionsContext';
import '../css/contactlinks.scss';

class ContactLinksList extends Component {
    render() {
        return (
            <OptionsContext.Consumer>
                {value =>
                        <div id="contactlinks" >
                            {value.contact_links.map((link) => (
                                <div key={link.slug} >
                                    <a href={link.url} title={link.name} target="_blank" className={"contactlink " + link.faclass} />
                                </div>
                            ))}
                        </div>
                }
            </OptionsContext.Consumer>
        )
    }
}

export default ContactLinksList;
