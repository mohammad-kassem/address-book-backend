const Contact = require('../../model/Contact');
const User = require('../../model/User');


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

async function getContacts(user_id) {
  return await User.findById(user_id).populate('contacts');
}

async function updateContact(body, id) {
  const {
    name,
    phone,
    relationship,
    location
  } = body;
  const contact = await Contact.findByIdAndUpdate({_id: id}, {$set: {
    name,
    phone,
    relationship,
    location,
  }}, {new: true, runValidators: true});

  return contact;
};

async function removeContact(id){
  const contact = await Contact.findByIdAndDelete({_id: id});
  return contact;
}



module.exports = { addContact, getById, getContacts, updateContact, removeContact };