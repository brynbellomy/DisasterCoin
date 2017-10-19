/* Copyright G. Hemingway @2017 - All rights reserved */
"use strict";

function getUrlVars() {
    let vars = [], hash;
    let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(let i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function onLoad() {
    setTimeout(function() {
        let vars = getUrlVars();
        $.ajax({
            url: `/v1/user/${vars.username}`,
            method: "get",
            success: function(data) {
                // Setup the page
                $('#username').html(data.username);
                $('#first_name').html(data.first_name);
                $('#last_name').html(data.last_name);
                $('#city').html(data.city);
                $('#primary_email').html(data.primary_email);
                $('#games_count').html(`Games Played (${data.games.length}):`);
                let $games = $('#games');
                data.games.forEach(game => {
                    let date = new Date(game.start);
                    const url = game.active ? `/game.html?id=${game.id}` : `/results.html?id=${game.id}`;
                    $games.append(`<tr>
                        <th><a href=${url}>${game.active?"Active":"Complete"}</a></th>
                        <th>${date.toLocaleString()}</th>
                        <th>${game.moves}</th>
                        <th>${game.score}</th>
                        <th>${game.game}</th>
                    </tr>`);
                });
            },
            error: function(err) {
                let errorEl = document.getElementById('errorMsg');
                errorEl.innerHTML = `Error: ${err.responseJSON.error}`;
            }
        });
    }, 1000);
}