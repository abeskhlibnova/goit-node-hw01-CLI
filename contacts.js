const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid")

const contactsPath = path.resolve("db/contacts.json");

const updateContacts = async(contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));


async function listContacts() {
   try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
   } catch(error) {
console.warn(error)
   }
  }
  
 async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  return result || null;
  } catch(error) {
    console.warn(error)
  }
  }
  
   async function addContact({name, email, phone}) {
    try {
      const contacts = await listContacts();
      const newContact = {
        id: nanoid(6),
        name,
        email,
        phone
      };
contacts.push(newContact);
await updateContacts(contacts);
return newContact;
    } catch(error) {
      console.warn(error)
    }
  }

  async function removeContact(contactId) {
    try{
const contacts = await listContacts();
const index = contacts.findIndex(item => item.id === contactId);
if(index === -1){
  return null
}
const [result] = contacts.splice(index, 1);
await updateContacts(contacts);
return result;
    } catch(error){
      console.warn(error)
    }
  }
  

  module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
  }