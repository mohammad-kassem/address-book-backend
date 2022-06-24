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

async function getById(id) {
  return await Contact.findById(id);
}

async function getContacts() {
  return await Contact.find();
}



module.exports = { addContact, getById, getContacts };