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

            $("#inputTeamDropdown").on("change", function () {
                if ($("#inputTeamDropdown").val() == "zero") {
                    clearTable();
                    return;
                } else {
                    $.getJSON(("/api/teams/byleague/" + $("#inputTeamDropdown").val()),
                        function (data) {
                            let teamObjs = data;
                            clearTable();
                            let teamLen = teamObjs.length;
                            for (let i = 0; i < teamLen; i++) {
                                createRow(teamObjs[i]);
                            }
                        });
                }
            });
        })
});

/*
* This clears results table in Table
*/
function clearTable() {
    $("#tblbody").empty();
    $("#courseSearchTable").hide();
}

/*
* This function shows all course results in the Table
*/
$("#showAllBtn").on("click", function () {
    clearTable();
    $("#inputTeamDropdown").val("zero");

    $.getJSON("/api/teams",
        function (allCourses) {
            let allCoursesLen = allCourses.length;

            for (let i = 0; i < allCoursesLen; i++) {
                createRow(allCourses[i]);
            }
        });
});

/*
* This funciton to create rows in Table
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
    $("#courseSearchTable").show();
}; ;

// Reset Btn
$("#resetBtn").on("click", function () {
    clearTable();
    $("#courseSearchTable").hide();
    $("#inputTeamDropdown").val("zero");
});

// Popovers
$(document).ready(function(){
    $('[data-toggle="popover"]').popover({
        placement : 'top',
        trigger : 'hover'
    });
});