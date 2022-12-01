const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
} = require("./contacts")
const { program } = require("commander");

 async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
       const contactsList = await listContacts();
      console.log(contactsList)
      break;

    case "get":
    const selectedContacts = await getContactById(id);
    console.log(selectedContacts);
      break;

    case "add":
     const newContact = await addContact({name, email, phone});
     console.log(newContact);
      break;

    case "remove":
      const deleteContact = await removeContact(id);
      console.log(deleteContact)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
   .option("-i, --id <type>", "user id")
   .option("-a, --action <type>", "choose action")
   .option("-n, --name <type>", "user name")
   .option("-e, --email <type>", "user email")
   .option("-p, --phone <type>", "user phone");

  program.parse();
  const options = program.opts();

 invokeAction(options);