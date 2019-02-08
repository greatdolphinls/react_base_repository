import React from 'react';
import LanguageContext from '../../context/LanguageContext';

class LanguageSelector extends React.Component {
  static contextType = LanguageContext;

  render() {
    return (
      <div>
        language:
        <i
          className="flag us"
          onClick={() => this.context.onLanguageChange('english')}
        >english</i>
        :
        <i
          className="flag nl"
          onClick={() => this.context.onLanguageChange('dutch')}
          >dutch</i>
      </div>
    );
  }
}

export default LanguageSelector;