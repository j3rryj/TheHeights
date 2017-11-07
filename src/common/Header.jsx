import React from 'react';

const Header = () => {
  return (
    <header className="header-container">
      <div className="header-div-left">
        The Heights
      </div>

      <div className="header-div-right">
        <button className="header-btn">
          Players
        </button>
        <button className="header-btn">
          Contact
        </button>
      </div>
    </header>
  );
};

export default Header;
