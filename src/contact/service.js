const Contact = require('../../model/Contact');

async function addContact(body, user_id) {
    const {
      name,
      phone,
      relationship,
      location
    } = body;
  
    const contact = new Contact({
      name,
      phone,
      relationship,
      location,
      user: user_id
    });
  
    return await contact.save();
};




module.exports = addContact;