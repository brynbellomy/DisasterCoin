/* Copyright G. Hemingway @2017 - All rights reserved */
"use strict";

function onLoad() {
    let button = document.getElementById('submitBtn');
    button.addEventListener('click', onRegister, false );
}

function validPassword(password) {
    if (!password || password.length < 8) {
        return { error: 'password length must be > 7' };
    }
    else if (!password.match(/[0-9]/i)) {
        return { error: 'password must contain a number' };
    }
    else if (!password.match(/[a-z]/)) {
        return { error: 'password a lowercase letter' };
    }
    else if (!password.match(/\@|\!|\#|\$|\%|\^/i)) {
        return { error: 'password must contain @, !, #, $, % or ^' };
    }
    else if (!password.match(/[A-Z]/)) {
        return { error: 'password an uppercase letter' };
    }
    return undefined;
}

function onRegister(event) {
    event.preventDefault();
    const data = {
        username:       document.getElementById('username').value,
        first_name:     document.getElementById('first_name').value,
        last_name:      document.getElementById('last_name').value,
        city:           document.getElementById('city').value,
        primary_email:  document.getElementById('primary_email').value,
        password:       document.getElementById('password').value
    };
    let $error = $('#errorMsg');
    let pwdInvalid = validPassword(data.password);
    if (!data.username || data.username.length > 16 || data.username.length < 6 || !data.username.match(/^[a-z0-9]+$/i)) {
        $error.html('Error: malformed username');
    } else if (pwdInvalid) {
        $error.html(`Error: ${pwdInvalid.error}`);
    } else if (!data.primary_email.match(/\@/) || !data.primary_email.match(/\./)) {
        $error.html(`Error: malformed email`);
    } else
        $.ajax({
        url: "/v1/user",
        method: "post",
        data: data,
        success: function(data) {
            window.location = `/profile.html?username=${data.username}`;
        },
        error: function(err) {
            let errorEl = document.getElementById('errorMsg');
            errorEl.innerHTML = `Error: ${err.responseJSON.error}`;
        }
    });
}