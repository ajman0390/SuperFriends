"use strict";

$(function () {
    let urlParams = new URLSearchParams(location.search);
    let TeamId = urlParams.get("TeamId");

    let teamObj;
    $.getJSON("/api/teams/" + TeamId,
        function (data) {
            teamObj = data;

            createTeamDetailsCard(teamObj, TeamId);
            createStudentTable(teamObj, TeamId);

        })
})

function createTeamDetailsCard(teamObj, TeamId) {

    $('#cardImg').attr('src', 'img/' + teamObj.Image);
    $('#cardImg').attr('alt', teamObj.TeamName + 'Image');
    $('#cardFront').html(teamObj.TeamName);
    $('#cardTitle').html(teamObj.TeamName);
    $('#cardTime').html(teamObj.League);
    $('#cardText1').html(teamObj.ManagerName);
    $('#cardText2').html(teamObj.MaxTeamMembers);
    $('#serviceCard').delay('10').fadeIn();

}

function createDetailsTable(teamObjs, TeamId) {

    // create rows
    createRow("Team ID", teamObjs.TeamId);
    createRow("Team Name", teamObjs.TeamName);
    createRow("Team League", teamObjs.League);
    createRow("Team Max TeamMembers", teamObjs.MaxTeamMembers);
    createRow("Team Min Age", teamObjs.MinMemberAge);
    createRow("Team Max Age", teamObjs.MaxMemberAge);
    createRow("Team Gender", teamObjs.TeamGender);
    //createRow("Team Location", teamObjs.Location);

    // create Details Link
    let regLink = "<a href='register.html?TeamId=" +
        TeamId +
        "'class='btn btn-outline-primary btn-lg' id='registerBtn'>Register</a>";
    $("#regDiv").append(regLink);
}

function createStudentTable(teamObjs, TeamId) {
    // create Student Table
    let teamMembersLen = teamObjs.Members.length;
    if (teamMembersLen > 0) {
        for (let i = 0; i < teamMembersLen; i++) {
            createStudentRow(teamObjs.Members[i].MemberName, teamObjs.Members[i].SecretIdentity, TeamId);
            createMemberCard(teamObjs.Members[i], TeamId);
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

function createMemberCard(teamMember, TeamId) {
    let memberCard = `
    <div class="col-md-4" >
        <div class="card mb-4 shadow-sm">
            <div class="card-body">
                <h3 class="card-title text-center">${teamMember.MemberName}</h3>
            
                <img class="card-img-top memberImgs" id="card${teamMember.MemberName}Img" src="img/${teamMember.Image}" alt="${teamMember.MemberName} Image">
                <p class="card-text">${teamMember.Description}</p>
                
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-muted">9 mins</small>
                </div>
              
            </div>
        </div>
    </div>`;
    $("#memberCardDiv").append(memberCard);
}