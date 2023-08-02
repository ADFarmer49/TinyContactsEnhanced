function contactSetup(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
}

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function listContacts() {
    const displayContacts = document.getElementById('displayContacts');
    displayContacts.innerHTML = '';

    // Creating the table headers //
    let labelsRow = document.createElement('tr');
    let nameLabelCell = document.createElement('th');
    nameLabelCell.textContent = "NAME";
    labelsRow.appendChild(nameLabelCell);
    let emailLabelCell = document.createElement('th');
    emailLabelCell.textContent = "EMAIL";
    labelsRow.appendChild(emailLabelCell);
    let phoneLabelCell = document.createElement('th');
    phoneLabelCell.textContent = "PHONE";
    labelsRow.appendChild(phoneLabelCell);
    displayContacts.appendChild(labelsRow);

    // Using a for loop to add contacts to list //
    contacts.forEach(function(contact, index) {
        let name = contact.name;
        let email = contact.email;
        let phone = contact.phone;

        let row = document.createElement('tr');
        let nameCell = document.createElement('td');
        nameCell.textContent = name;
        row.appendChild(nameCell);
        let emailCell = document.createElement('td');
        emailCell.textContent = email;
        row.appendChild(emailCell);
        let phoneCell = document.createElement('td');
        phoneCell.textContent = phone;
        row.appendChild(phoneCell);
        let actionsCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() { deleteContact(index); });
        actionsCell.appendChild(deleteButton);
        row.appendChild(actionsCell);

        displayContacts.appendChild(row);
    });
}

function addNewContact() {
    let name = document.getElementById('inputName').value;
    let email = document.getElementById('inputEmail').value;
    let phone = document.getElementById('inputPhone').value;
    let contact = new contactSetup(name, email, phone);
    contacts.push(contact);
    // Setting up local storage //
    localStorage.setItem('contacts', JSON.stringify(contacts));
    listContacts();
    // Clearing input boxes //
    document.getElementById('inputName').value = "";
    document.getElementById('inputEmail').value = "";
    document.getElementById('inputPhone').value = "";
}


function deleteContact(index) {
    contacts.splice(index, 1);
    // Deleting contact from local storage //
    localStorage.setItem('contacts', JSON.stringify(contacts));
    listContacts();
}

// Call the listContacts function when the page is loaded to display any saved contacts
window.addEventListener('load', listContacts);

