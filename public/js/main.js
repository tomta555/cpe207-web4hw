class Saved_form {
    constructor(subject, name, email, message, gender, phone) {
        this.subject = subject;
        this.name = name;
        this.email = email;
        this.message = message;
        this.gender = gender;
        this.phone = phone;
    }
}

class UI {
    static displaySaved_form() {

        const forms = Store.getForm();
        forms.forEach((sform) => UI.addNewSavedForm(sform));
    }

    static addNewSavedForm(sform) {
        const list = document.querySelector('#saved-form-list');
        const row = document.createElement('tbody');

        row.innerHTML = `
        
        <tr id="saved-subject">
        <th>Subject</th>
        <td>${sform.subject}</td>
        </tr>
        <tr id="saved-name">
        <th>Name</th>
        <td>${sform.name}</td>
        </tr>
        <tr id="saved-email">
        <th>E-mail</th>
        <td>${sform.email}</td>
        </tr>
        <tr id="saved-message">
        <th>Message</th>
        <td>${sform.message}</td>
        </tr>
        <tr id="saved-gender">
        <th>Gender</th>
        <td>${sform.gender}</td>
        </tr>
        <tr id="saved-phone">
        <th>Phone</th>
        <td>${sform.phone}</td> 
        <td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>
        </tr>
          `;

        list.appendChild(row);
    }

    static deleteForm(el) {
        // if element contains .delete class
        if (el.classList.contains('delete')) {
            //   a -> td -> tr -> tbody
            el.parentElement.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.ff-form');
        const form = document.querySelector('#input-form');
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#subject').value = '';
        document.querySelector('#name').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#message').value = '';
        document.querySelector('#gender').value = 'Select';
        document.querySelector('#phone').value = '';
    }
}

// Store Class: Handles Storage
class Store {
    static getForm() {
        let forms;
        if (localStorage.getItem('forms') === null) {
            forms = [];
        } else {
            forms = JSON.parse(localStorage.getItem('forms'));
        }
        return forms;
    }

    static addForm(sform) {
        const forms = Store.getForm();
        forms.push(sform);
        localStorage.setItem('forms', JSON.stringify(forms));
    }

    static removeForm(phone) {
        const forms = Store.getForm();

        forms.forEach((sform, index) => {
            if (sform.phone === phone) {
                forms.splice(index, 1);
            }
        });
        localStorage.setItem('forms', JSON.stringify(forms));
    }
}

document.addEventListener('DOMContentLoaded', UI.displaySaved_form);

//Submit
document.querySelector('#input-form').addEventListener('submit', (e) => {
    //Prevent actual submit action
    e.preventDefault();

    const subject = document.querySelector('#subject').value;
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;
    const gender = document.querySelector('#gender').value;
    const phone = document.querySelector('#phone').value;

    if (subject === '' || name === '' || email === '' || message === '' || gender === 'Select' || phone === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {

        const forms = new Saved_form(subject, name, email, message, gender, phone);

        UI.addNewSavedForm(forms);

        Store.addForm(forms);

        UI.showAlert('Form Saved', 'success');

        UI.clearFields();
    }
});

document.querySelector('#saved-form-list').addEventListener('click', (e) => {

    UI.deleteForm(e.target);

    Store.removeForm(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert('Form Removed', 'success');
});