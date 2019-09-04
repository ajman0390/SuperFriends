"use strict";

$(function () {
    let urlParams = new URLSearchParams(location.search);
    let TeamId = urlParams.get("TeamId");

    createDropDown();

    let teamObj;
    $.getJSON("/api/teams/" + TeamId,
        function (data) {
            teamObj = data;

            // Set Values for Team Info
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

            $(function() {
                let $radios = $('input:radio');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value=' + teamObj.SuperStatus + ']').prop('checked', true);
                }
            });

            // Create Member Cards
            createMemberCards(teamObj, TeamId);

            // Delete Member 
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

            // Edit Team Btn 
            $("#editTeamBtn").on("click", function () {
                window.location.assign("/editteam.html?TeamId=" + TeamId);
            });

            // Cancel Btn 
            $("#cancelBtn").on("click", function () {
                window.location.assign("/teams.html");
            });

        });
});

/*
* This function creates the Member Cards by calling createMemberCard 
* for each Team Member and passing the team member Object 
*
* @param (teamObjs) - The Team Object
* @param (TeamId) - The Team ID number from urlParams
* 
*/
function createMemberCards(teamObjs, TeamId) {
    // create Student Table
    let teamMembersLen = teamObjs.Members.length;
    if (teamMembersLen > 0) {
        for (let i = 0; i < teamMembersLen; i++) {
            createMemberCard(teamObjs.Members[i], TeamId);
        }
    }
}

/*
* This function creates the Member Card for each Team Member 
*
* @param (teamMember) - The Team Member Object from the selected teamObj
* @param (TeamId) - The Team ID number from urlParams
* 
*/
function createMemberCard(teamMember, TeamId) {
    let uri = `/member.html?TeamId=${TeamId}&MemberId=${teamMember.MemberId}`;
    uri = encodeURI(uri);

    // Start to Member Cards
    $("#memberCardDiv").append($("<div>", {
        class: "col-md-4"
    }))
    $("#memberCardDiv div:last").append($("<div>", {
        class: "card mb-4 shadow-sm membercard",
        id: "membercard" + teamMember.MemberId
    }))
    $("#memberCardDiv div:last").append($("<div>", {
        class: "card-body card-block"
    }))
    
    // Member Card Title
    $("#memberCardDiv div:last").append($("<h3>", {
        class: "card-title text-center",
        text: teamMember.MemberName
    }))

    // Check for Member Image 
    if (teamMember.Image != undefined) {
        $("#memberCardDiv div:last").append($("<img>", {
            class: "card-img-top memberImgs",
            id: "card" + teamMember.MemberId + "Img",
            src: "img/" + teamMember.Image,
            alt: teamMember.MemberName + "Img"
        }))
    } else {
        $("#memberCardDiv div:last").append($("<img>", {
            class: "card-img-top memberImgs",
            id: "card" + teamMember.MemberId + "Img",
            src: "img/SuperHeroBlank.png", // If no Member Image, set image to a default image
            alt: teamMember.MemberName + "Img"
        }))
    }

    // Check for Member Description
    if (teamMember.Description != undefined) {
        $("#memberCardDiv div:last").append($("<p>", {
            class: "card-text",
            text: teamMember.Description
        }))
    } else {
        $("#memberCardDiv div:last").append($("<p>", {
            class: "card-text",
            text: "Descriptive text can go here." // If no Member Description, set text to a default message
        }))
    }

    // Add Btns at bottom of Member Cards
    $("#memberCardDiv div:last").append($("<div>", {
        class: "card-bottom d-flex justify-content-between align-items-center"
    }))
    $("#memberCardDiv div:last").append($("<div>", {
        class: "btn-group"
    }))
    // Edit Member Btn
    $("#memberCardDiv div:last").append($("<a>", {
        class: "btn btn-sm btn-outline-primary",
        text: "Edit",
        href: uri
    }))
    // Delete Member Btn
    $("#memberCardDiv div:last").append($("<a>", {
        class: "btn btn-sm btn-outline-danger",
        text: "Delete",
        href: "#",
        id: "deleteMember" + teamMember.MemberId
    }))

}

/*
* This function populates the Leagues Dropdown  
*/
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