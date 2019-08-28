"use strict";

$(function () {
    let leagueObjs;
    $.getJSON("/api/leagues",
        function (data) {
            leagueObjs = data;

            // Create Input Category Dropdown list
            const leagueLen = leagueObjs.length;
            for (let i = 0; i < leagueLen; i++) {
                $("#leageArea").append("<div class='col-lg-3 text-center'><h2 id=top" + leagueObjs[i].Code + ">" + leagueObjs[i].Name + "</h2><p id=para" + leagueObjs[i].Code + ">" + leagueObjs[i].Description + "</p></div>")
            }
        })
    });

    $("#searchBtn").on("click", function(){
        location.href = "teams.html";
    })