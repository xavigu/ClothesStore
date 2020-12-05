import React from "react";

import {ReactComponent as LinkedinLogo} from './../../assets/social/linkedin.svg';
import {ReactComponent as GmailLogo} from './../../assets/social/gmail.svg';
import {ReactComponent as GithubLogo} from './../../assets/social/github.svg';

const ContactLogo = ({logo}) => {
  return (
    <>
      {(() => {
        switch (logo) {
          case 'linkedin':
              return (
                <a href="https://linkedin.com/in/francisco-javier-guzmán-rosino-839464101" target="blank" title="Linkedin">
                < LinkedinLogo/>
                </a>  
              )
          case 'gmail':
              return (
                <a href = "mailto: xavigu91@gmail.com" title="Email">
                  <GmailLogo/>
                </a>
              )
          case 'github':
              return (
                <a href="https://github.com/xavigu" target="blank" title="Linkedin">
                  <GithubLogo/>
                </a>  
              )
          default:
              return (
                <></>
              )
        }
    })()}
   </>
 )
};

export default ContactLogo;