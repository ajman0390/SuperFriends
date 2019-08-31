"use strict";

$(function () {
    let urlParams = new URLSearchParams(location.search);
    let TeamId = urlParams.get("TeamId");

    let teamObj;
    $.getJSON("/api/teams/" + TeamId,
        function (data) {
            teamObj = data;

            createTeamDetailsCard(teamObj, TeamId);
            createMemberCards(teamObj, TeamId);

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

    let uri = `/editteam.html?TeamId=${TeamId}`;
    uri = encodeURI(uri);
    
    let editLink = `<a href="${uri}" class="btn btn-sm btn-outline-secondary">Edit</a>`
    $("#editBtnArea").append(editLink);

    $('#serviceCard').delay('10').fadeIn();

}

function createMemberCards(teamObjs, TeamId) {
    // create Student Table
    let teamMembersLen = teamObjs.Members.length;
    if (teamMembersLen > 0) {
        for (let i = 0; i < teamMembersLen; i++) {
            createMemberCard(teamObjs.Members[i], TeamId);
        }
    }
}

function createMemberCard(teamMember, TeamId) {
    let uri = `/member.html?TeamId=${TeamId}&memberid=${teamMember.MemberId}`;
    uri = encodeURI(uri);

    let urb = `/member.html?TeamId=${TeamId}&memberid=${teamMember.MemberId}`;
    urb = encodeURI(urb);


    let memberCard = `
    <div class="col-md-4 ">
        <div class="card mb-4 shadow-sm" id="membercard">
            <div class="card-body card-block">

            <div class="face front">

                <h3 class="card-title text-center">${teamMember.MemberName}</h3>
            
                <img class="card-img-top memberImgs" id="card${teamMember.MemberName}Img" src="img/${teamMember.Image}" alt="${teamMember.MemberName} Image">
                <p class="card-text">${teamMember.Description}</p>
                
                <div class="card-bottom d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" id="view${teamMember.MemberName}Btn" class="btn btn-sm btn-outline-secondary">View</button>
                        <a href=${uri} class="btn btn-sm btn-outline-secondary">Edit</a>
                    </div>
                    <small class="text-muted">${teamMember.Gender}</small>
                </div>

                </div>
                <div class="face back">Back</div>
              
            </div>
        </div>
    </div>`;
    $("#memberCardDiv").append(memberCard);
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

    // create Details Link
    let regLink = "<a href='register.html?TeamId=" +
        TeamId +
        "'class='btn btn-outline-primary btn-lg' id='registerBtn'>Register</a>";
    $("#regDiv").append(regLink);
}
/*
* This funciton to create rows in Table
*/
function createRow(title, value) {
    let row = "<tr><td class='titleTbl'>" + title + '</td><td>' + value + '</td></tr>';
    $("#tblbody").append(row);
}