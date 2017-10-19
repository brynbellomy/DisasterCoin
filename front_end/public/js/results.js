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
        if (vars.id) {
            $.ajax({
                url: `/v1/game/${vars.id}`,
                method: "get",
                success: function(data) {
                    // Setup the page
                    $('#duration').html(`${data.duration} seconds`);
                    $('#moves').html(data.moves.length);
                    $('#points').html(data.score);
                    $('#remaining').html(data.cards_remaining);
                    $('#active').html(`${data.active}`);
                    let $moves = $('tbody');
                    data.moves.forEach((move, index) => {
                        $moves.append(`<tr>
                            <th>${move.id ? move.id : index+1}</th>
                            <th>${move.duration} seconds</th>
                            <th>${move.player}</th>
                            <th>${move.move}</th>
                        </tr>`);
                    });
                },
                error: function(err) {
                    let errorEl = document.getElementById('errorMsg');
                    errorEl.innerHTML = `Error: ${err.responseJSON.error}`;
                }
            });
        }
    }, 1000);
}