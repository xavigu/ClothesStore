import React from "react";
import literals from "./../../literals";

import ContactLogo from "../../components/contact-logo/contact-logo.component";
import "./contact.styles.scss"

const contactItems = [
  'linkedin',
  'github',
  'gmail'
];

const ContactPage = () => 
{
  return (
    <div className="contact-page">
      <h2 className='title'>{literals.CONTACT_TITLE}</h2>
      <div className="contact-content">
        <div className="description">
          {literals.CONTACT_DESCRIPTION}
        </div>
        <div className="contact-items">
          <p>{literals.CONTACT_ITEMS_SUBTITLE}</p> 
          {
            contactItems.map((item) => (
              <ContactLogo logo={item} />
            ))
          }
        </div>
      </div>
    </div>
 )
};

export default ContactPage;