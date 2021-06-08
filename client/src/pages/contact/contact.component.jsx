import React, { useEffect } from "react";
import literals from "./../../literals";

import ContactLogo from "../../components/contact-logo/contact-logo.component";
import {ReactComponent as TrianglesIcon} from './../../assets/icons/triangles.svg';
import "./contact.styles.scss"

const contactItems = [
  'linkedin',
  'github',
  'gmail'
];

const changeColorTriangles = () =>
{
  const svg = document.getElementById('triangles');
  svg.onclick = (e) => {
    const colors = ['red', 'blue', 'green', 'orange', 'purple'];
    const rand = () => colors[Math.floor(Math.random() * colors.length)];
    console.log(rand);
    document.documentElement.style.cssText = `
      --dark-color: ${rand()};
      --light-color: ${rand()};
    `
  }
}

const ContactPage = () => 
{
  useEffect(() => {
    changeColorTriangles();
  });

  return (
    <div className="contact-page">
      <h2 className='title'>{literals.CONTACT_TITLE}</h2>
      <div className="contact-content">
        <div className="description">
          {literals.CONTACT_DESCRIPTION}
        </div>
        <div className="contact-items">
          <span className="contact-subtitle" style={{marginRight:"8px"}}>
              {literals.CONTACT_ITEMS_SUBTITLE}
          </span>
          <span className="contact-triangles">
              <TrianglesIcon/>
          </span>
          <div className="contact-logos">
            {
              contactItems.map((item) => (
                <ContactLogo logo={item} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
 )
};

export default ContactPage;