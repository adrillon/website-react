import React, { Component } from 'react'
import { Link } from '../utils/routes';
import { LanguageContext } from '../utils/LanguageContext';

class LanguageSelector extends Component {
    render() {
        return (
            <LanguageContext.Consumer>
                {value =>
                        <ul>
                            {value.alternateLanguages.map((alt) => (
                                <li key={alt.params.lang} >
                                    <Link route={alt.route} params={alt.params} >
                                        <a>{alt.params.lang}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                }
            </LanguageContext.Consumer>
        )
    }
}

export default LanguageSelector;
