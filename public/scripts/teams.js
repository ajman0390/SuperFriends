"use strict";

$(function () {
    let leaguesObj;
    $.getJSON("/api/leagues",
        function (data) {
            leaguesObj = data;

            // Create Leauges Dropdown list
            const legLen = leaguesObj.length;
            for (let i = 0; i < legLen; i++) {
                $("#inputTeamDropdown").append($("<option>", {
                    value: leaguesObj[i].Code,
                    text: leaguesObj[i].Name
                }));
            }

            // Age Dropdown
            // for (let i = 1; i < 101; i++) {
            //     let newOption = $("<option>", { value: i, text: i });
            //     $("#Age").append(newOption);
            // }

            // On Leagues Dropdown Change
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
                window.location.assign("/registerteam.html?TeamId=");
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
    $("#teamSearchTable").append($("<thead>", {
        class: "text-center"
    }));
    $("#teamSearchTable thead").append("<tr>", {
        class: "text-center"
    });
    $("#teamSearchTable thead tr").append($("<th>", { 
        text: "Team Name" 
    }))
        .append($("<th>", { 
            text: "Team Manager" 
        }))
        .append($("<th>", { 
            text: "Details" 
        }));
    $("#teamSearchTable").append($("<tbody>", { id: "tblbody", class: "text-center" }));
}

/*
* This function to create rows in Table
*/
function createRow(teamObjs) {

    $("#tblbody").append($("<tr>", { 
        title: teamObjs.TeamName
    }));
    $("#tblbody tr:last").append($("<td>", {
        text: teamObjs.TeamName
    }));
    $("#tblbody tr:last").append($("<td>", {
        text: teamObjs.ManagerName
    }));
    $("#tblbody tr:last").append($("<td>", {
        class: "text-center"
    }));
    $("#tblbody tr td:last").append($("<a>", {
        href: "details.html?TeamId=" +
        teamObjs.TeamId,
        text: "Details"
    }));
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