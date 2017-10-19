/* Copyright G. Hemingway @2017 - All rights reserved */
"use strict";

function onLoad() {
    let buttons = document.getElementsByClassName('btn');
    buttons[0].addEventListener('click', onLogin, false);
}

function onLogin(event) {
    event.preventDefault();
    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    $.ajax({
        url: "/v1/session",
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
