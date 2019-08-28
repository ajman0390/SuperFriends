"use strict";

$(function () {
    let urlParams = new URLSearchParams(location.search);
    let TeamId = urlParams.get("TeamId");

    let courseObjs;
    $.getJSON("/api/teams/" + TeamId,
        function (data) {
            courseObjs = data;
            
            createDetailsTable(courseObjs, TeamId);
            createStudentTable(courseObjs, TeamId);            
        })
})

function createTeamDetailsCard(serviceId) {
    $.getJSON(`/api/teams/${serviceId}`, function (team) {
        $('#cardImg').attr('src', 'img/' + team.Image );
        $('#cardImg').attr('alt', team.ServiceName + 'Image' );
        $('#cardFront').html(team.ServiceName);
        $('#cardTitle').html(team.ServiceName); 
        $('#cardTime').html('(' + team.Minutes + ' Minutes)'); 
        $('#cardText1').html(team.Description);
        $('#cardText2').html('$' + Number(team.Price).toFixed(2));
        $('#serviceCard').delay('10').fadeIn();
    })
}

function createDetailsTable(courseObjs, TeamId) {

    // create rows
    createRow("Team ID", courseObjs.TeamId);
    createRow("Team Name", courseObjs.TeamName);
    createRow("Team League", courseObjs.League);
    createRow("Team Max TeamMembers", courseObjs.MaxTeamMembers);
    createRow("Team Min Age", courseObjs.MinMemberAge);
    createRow("Team Max Age", courseObjs.MaxMemberAge);
    createRow("Team Gender", courseObjs.TeamGender);
    //createRow("Team Location", courseObjs.Location);

    // create Details Link
    let regLink = "<a href='register.html?TeamId=" +
        TeamId +
        "'class='btn btn-outline-primary btn-lg' id='registerBtn'>Register</a>";
    $("#regDiv").append(regLink);
}

function createStudentTable(courseObjs, TeamId) {
    // create Student Table
    let teamMembersLen = courseObjs.Members.length;
    if (teamMembersLen > 0) {
        for (let i = 0; i < teamMembersLen; i++) {
            createStudentRow(courseObjs.Members[i].MemberName, courseObjs.Members[i].SecretIdentity, TeamId);
        }
    }
}

/*
* This funciton to create rows in Table
*/
function createRow(title, value) {
    let row = "<tr><td class='titleTbl'>" + title + '</td><td>' + value + '</td></tr>';
    $("#tblbody").append(row);
}

/*
* This funciton to create rows in Student Table
*/
function createStudentRow(title, value, TeamId) {
    let uri = `/unregister.html?TeamId=${TeamId}&studentname=${title}&email=${value}`;
    uri = encodeURI(uri);
    let studentRow = '<tr><td class="titleTbl">' + title + '</td><td>' + value + '</td><td><div class="text-center"><a href="' + uri + '"id="unregBtn" class="btn btn-danger btn-sm">Unregister</a></div></td></tr>';
    $("#tblbodyStudent").append(studentRow);
}