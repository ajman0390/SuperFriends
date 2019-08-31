"use strict";

// document ready event handler
$(function () {
    let urlParams = new URLSearchParams(location.search);
    let TeamId = urlParams.get("TeamId");

    // Create Input Category Dropdown list
    createDropDown();

    let teamObj;
    $.getJSON("/api/teams/" + TeamId,
        function (data) {
            teamObj = data;

            

            $("#teamId").val(teamObj.TeamId);
            $("#teamName").val(teamObj.TeamName);
            $("#teamLeague").val(teamObj.League);
            $("#managerName").val(teamObj.ManagerName);
            $("#managerPhone").val(teamObj.ManagerPhone);
            $("#managerEmail").val(teamObj.ManagerEmail);
            $("#maxTeamMembers").val(teamObj.MaxTeamMembers);
            $("#minAge").val(teamObj.MinMemberAge);
            $("#maxAge").val(teamObj.MaxMemberAge);
            $("#teamGender").val(teamObj.TeamGender);

            $("#editTeamBtn").on("click", changeBtns);

            $("#updateTeamBtn").on("click", sendForm);
            //$("#deleteTeamBtn").on("click", deleteForm);

        });

    // cancel/back button 
    $("#cancelBtn").on("click", function () {
        window.location.assign("/details.html?TeamId=" + TeamId);
    });
});

function changeBtns() {
    $("#editTeamBtn").addClass('hidden') //css('display', 'none');
    $("#updateTeamBtn").removeClass('hidden');
    $("#resetBtn").removeClass('hidden');
    $("*", "#editTeamForm").removeAttr('readonly');
    $("#teamId").attr('readonly', true);
    $("*", "#editTeamForm").attr('disabled', false);
}

function sendForm() {
    //let validationResult = validateForm();
    if (1 == 0) {
        //on the "save" / register button click
        $.ajax({
            url: '/api/teams/', // your api url
            data: $("#editTeamForm").serialize(),
            method: 'PUT', // method is any HTTP method
            success: function () {
                alert("Working");
                document.location.href = "details.html?TeamId=" + TeamId;
            }
        });
    } else {
        return;
    }
}

// Delete Member
// $("#team" + teams[i].TeamId).on("click", function () {
//     confirm("Are you sure you want to delete this band?");
//     $.ajax({
//         url: "/api/teams/" + teams[i].TeamId,
//         method: "DELETE",
//         success: function () {
//             alert("Updated!");
//         }
//     });
//     location.href = "index.html";
// });

function createDropDown() {
    let leagueObjs;
    $.getJSON("/api/leagues",
        function (data) {
            leagueObjs = data;

            // Create Input Category Dropdown list
            const legLen = leagueObjs.length;
            for (let i = 0; i < legLen; i++) {
                $("#teamLeague").append("<option value='" + leagueObjs[i].Name + "'>" + leagueObjs[i].Name + "</option>")
            }
        })
}



/* 
* Reset Btn to clear member inputfields
*/
$("#resetBtn").on("click",
    function () {
        $("#membername").val("");
        $("#email").val("");
        $("#errorMessages").empty();
        $("#errorMsg").hide();
    }
);




