"use strict";

$(function () {
    let urlParams = new URLSearchParams(location.search);
    let TeamId = urlParams.get("TeamId");

    createDropDown();

    let teamObj;
    $.getJSON("/api/teams/" + TeamId,
        function (data) {
            teamObj = data;

            console.log(teamObj.League)

            $("#teamId").val(teamObj.TeamId);
            $("#teamName").val(teamObj.TeamName);
            $("#teamLeague").val(teamObj.League);
            $("#managerName").val(teamObj.ManagerName);
            $("#managerPhone").val(teamObj.ManagerPhone);
            $("#manageremail").val(teamObj.ManagerEmail);
            $("#maxteammembers").val(teamObj.MaxTeamMembers);
            $("#minAge").val(teamObj.MinMemberAge);
            $("#maxAge").val(teamObj.MaxMemberAge);
            $("#teamGender").val(teamObj.TeamGender);

            createTeamDetailsCard(teamObj, TeamId);
            createMemberCards(teamObj, TeamId);

            // Delete Member Button
            for (let i = 0; i < teamObj.Members.length; i++) {
                $("#deleteMember" + teamObj.Members[i].MemberId).on("click", function () {
                    $.ajax({
                        url: "/api/teams/" + TeamId + "/members/" + teamObj.Members[i].MemberId,
                        method: "DELETE",
                        contentType: "application/json",
                        success: function () {
                            alert("Member Deleted!");
                            location.reload();
                        }
                    });

                })
            }

                // Delete Team
                $("#deleteTeam").on("click", function () {
                    $.ajax({
                        url: "/api/teams/" + TeamId,
                        method: "DELETE",
                        success: function () {
                            alert("Deleted Team!");
                            window.location.assign("/teams.html");
                        }
                    });
                });

                $('#addMemberBtn').on('click', function () {
                    window.location.assign("/registermember.html?TeamId=" + TeamId);
                });

                // cancel/back button 
    $("#editTeamBtn").on("click", function () {
        window.location.assign("/editteam.html?TeamId=" + TeamId);
    });

    // cancel/back button 
    $("#cancelBtn").on("click", function () {
        window.location.assign("/teams.html");
    });


            
        });
});


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

    let editLink = `<a href="${uri}" class="btn btn-sm btn-outline-primary">Edit</a>`
    $("#editBtnDiv").append(editLink);
    let deleteLink = `<a id="deleteTeam${TeamId}" class="btn btn-sm btn-outline-danger">Delete</a>`
    $("#deleteBtnDiv").append(deleteLink);

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
    let uri = `/member.html?TeamId=${TeamId}&MemberId=${teamMember.MemberId}`;
    uri = encodeURI(uri);

    let memberCard = `
    <div class="col-md-4 ">
        <div class="card mb-4 shadow-sm membercard" id="membercard${teamMember.MemberId}">
            <div class="card-body card-block">

                <h3 class="card-title text-center">${teamMember.MemberName}</h3>
            
                <img class="card-img-top memberImgs" id="card${teamMember.MemberId}Img" src="img/${teamMember.Image}" alt="${teamMember.MemberName} Image">
                <p class="card-text">${teamMember.Description}</p>
                
                <div class="card-bottom d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" id="view${teamMember.MemberId}Btn" class="btn btn-sm btn-outline-secondary">View</button>
                        <a href=${uri} class="btn btn-sm btn-outline-secondary">Edit</a>
                        <a href="#" id="deleteMember${teamMember.MemberId}" class="btn btn-sm btn-outline-secondary">Delete</a>
                    </div>
                    <small class="text-muted">${teamMember.Gender}</small>
                </div>
              
            </div>
        </div>
    </div>`;
    $("#memberCardDiv").append(memberCard);
}

function createDropDown() {
    let leaguesObj;
    $.getJSON("/api/leagues",
        function (data) {
            leaguesObj = data;

            // Create Leauges Dropdown list
            const legLen = leaguesObj.length;
            for (let i = 0; i < legLen; i++) {
                $("#teamLeague").append($("<option>", {
                    value: leaguesObj[i].Code,
                    text: leaguesObj[i].Name
                }));
            }
        })
}


/*
* This funciton to create rows in Table
*/
function createRow(title, value) {
    let row = "<tr><td class='titleTbl'>" + title + '</td><td>' + value + '</td></tr>';
    $("#tblbody").append(row);
}
