import React, { Component } from 'react'
import { Link } from '../utils/routes';
import { LanguageContext } from '../utils/LanguageContext';

class LanguageSelector extends Component {
    render() {
        return (
            <LanguageContext.Consumer>
                {value =>
                        <ul id="languageselector" >
                            {value.alternateLanguages.map((alt) => {
                                return alt.params.lang == value.lang ? '' :
                                <li key={alt.params.lang} >
                                    <Link route={alt.route} params={alt.params} >
                                        <a>
                                            <img className="languageselector-flag" src={"/static/langs/" + alt.params.lang + ".svg"} />
                                        </a>
                                    </Link>
                                </li>
                                })}
                        </ul>
                }
            </LanguageContext.Consumer>
        )
    }
}

export default LanguageSelector;
