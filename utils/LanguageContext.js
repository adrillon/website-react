import React from 'react'
import Config from '../config/config.json';

export const LanguageContext = React.createContext(Config.lang);
