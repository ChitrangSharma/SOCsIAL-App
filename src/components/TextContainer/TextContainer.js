import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
    <img
          className="app__headerImage"
          src="logo512.png"
          // insta url -- https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png
          alt=""
        ></img>
      <h1>SOCsIAL♥ <span role="img" aria-label="emoji">❤️</span></h1>
      <h2>#Chitrang_Sharma  <span role="img" aria-label="emoji">💬</span></h2>
      {/* <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2> */}
    </div>
    {
      users
        ? (
          <div>
            <h1>Onlinees :<span role="img" aria-label="emoji">⬅️</span></h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;
