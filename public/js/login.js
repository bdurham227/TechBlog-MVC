const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type' : 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert("nope!", response.statusText);
        }
    }
};
console.log("hi")
const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log("-------------------------------WORKING----------------------")

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    console.log('inside the signup handler')
    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type':'application/json' },
        });

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert(response.statusText);
        }
    }
};

document
.querySelector('.login-form')
.addEventListener('submit', loginFormHandler);


console.log("ello")
document
.querySelector('.signup-form')
.addEventListener('click', signupFormHandler)

// document
// .querySelector('#signup-form').addEventListener('submit', signupFormHandler)