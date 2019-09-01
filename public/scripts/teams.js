"use strict";

$(function () {
    let leagueObjs;
    $.getJSON("/api/leagues",
        function (data) {
            leagueObjs = data;

            // Create Input Category Dropdown list
            const legLen = leagueObjs.length;
            for (let i = 0; i < legLen; i++) {
                $("#inputTeamDropdown").append("<option value='" + leagueObjs[i].Code + "'>" + leagueObjs[i].Name + "</option>")
            }

            // Age Dropdown
            for (let i = 1; i < 101; i++) {
                let newOption = $("<option>", { value: i, text: i });
                $("#Age").append(newOption);
            }

            $("#inputTeamDropdown").on("change", function () {
                if ($("#inputTeamDropdown").val() == "zero") {
                    clearTable();
                    return;
                } else {
                    clearTable();
                    createTableHead();
                    $.getJSON(("/api/teams/byleague/" + $("#inputTeamDropdown").val()),
                        function (data) {
                            let teamObjs = data;
                            let teamLen = teamObjs.length;
                            for (let i = 0; i < teamLen; i++) {
                                createRow(teamObjs[i]);
                            }
                        });
                }
            });

            $("#addTeamBtn").on("click", function () {
                window.location.assign("/registerteam.html?TeamId=" );
            });
        })
});

/*
* This clears results table in Table
*/
function clearTable() {
    $("#teamSearchTable").empty();
    $("#teamSearchTable").hide();
}

/*
* This function shows all course results in the Table
*/
$("#showAllBtn").on("click", function () {
    clearTable();
    createTableHead();
    $("#inputTeamDropdown").val("zero");
    $.getJSON("/api/teams",
        function (allTeams) {
            let allTeamsLen = allTeams.length;
            for (let i = 0; i < allTeamsLen; i++) {
                createRow(allTeams[i]);
            }
        });
});

/*
* This function to creates thead and tbody in Teams Table
*/
function createTableHead() {
    $("#teamSearchTable").append("<thead>");
    $("#teamSearchTable thead").append("<tr>", {
        title: ``
    });
    $("#teamSearchTable thead tr").append($("<th>", {text: "Team Name"}))
        .append($("<th>", {text: "Team Manager"}))
        .append($("<th>", {text: "Details"}));
        $("#teamSearchTable").append($("<tbody>", {id: "tblbody"}));     
}

/*
* This function to create rows in Table
*/
function createRow(teamObjs) {
    

    let tableRow =
        "<tr data-toggle='popover' title='" + teamObjs.TeamName + "'><td>" +
        teamObjs.TeamName +
        "</td><td>" +
        teamObjs.ManagerName +
        "</td>" +
        "<td><a href='details.html?TeamId=" +
        teamObjs.TeamId +
        "'>Details</a></td></tr>";
    $("#tblbody").append(tableRow);
    $("#teamSearchTable").show();
};;

// Reset Btn
$("#resetBtn").on("click", function () {
    clearTable();
    $("#teamSearchTable").hide();
    $("#inputTeamDropdown").val("zero");
    $("#Age").val("zero");
});



// Popovers
$(document).ready(function () {
    $('[data-toggle="popover"]').popover({
        placement: 'top',
        trigger: 'hover'
    });
});