const KEYS ={
    contacts:'contacts',
    contactId:'contactId'
}

export function insertContact(data) {
    let contacts=getAllContacts();
    data['id'] = generateContactId()
    contacts.push(data)
    localStorage.setItem(KEYS.contacts,JSON.stringify(contacts))
}

export function generateContactId() {
    if (localStorage.getItem(KEYS.contactId) == null)
        localStorage.setItem(KEYS.contactId, '0')
    var id = parseInt(localStorage.getItem(KEYS.contactId))
    localStorage.setItem(KEYS.contactId, (++id).toString())
    return id;
}


export function getAllContacts() {
    if (localStorage.getItem(KEYS.contacts) == null)
        localStorage.setItem(KEYS.contacts, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.contacts));
}

export function deleteContact(id) {
    let contacts = getAllContacts();
    contacts = contacts.filter(x => x.id !== id)
    localStorage.setItem(KEYS.contacts, JSON.stringify(contacts));
}

export function updateContacts(data) {
    let contacts = getAllContacts();
    let recordIndex = contacts.findIndex(x => x.id === data.id);
    contacts[recordIndex] = { ...data }
    localStorage.setItem(KEYS.contacts, JSON.stringify(contacts));
}