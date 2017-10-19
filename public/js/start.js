/* Copyright G. Hemingway @2017 - All rights reserved */
"use strict";

let gameType = "klondyke";
function onLoad() {
    let buttons = document.getElementsByClassName('btn');
    buttons[0].addEventListener('click', onStart, false );
    // Handle making draw active/inactive based on game selected
    $("input[type='radio']").click(() => {
        gameType = $("input[name='game']:checked").val();
        $('#draw').prop("disabled", gameType === 'hearts');
    });
}

function onStart(event) {
    event.preventDefault();

    gameType = $("input[name='game']:checked").val();

    const data = {
        game: gameType,
        draw: '1',
        color: 'red'
    };
    $.ajax({
        url: "/v1/game",
        method: "post",
        data: data,
        success: function(data) {
            window.location = `/game.html?id=${data.id}`;
        },
        error: function(err) {
            let errorEl = document.getElementById('errorMsg');
            errorEl.innerHTML = `Error: ${err.responseJSON.error}`;
        }
    });
}