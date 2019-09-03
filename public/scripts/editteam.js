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

            $("#updateTeamBtn").on("click", function() {
                $.ajax({
                    url: "/api/teams", // your api url
                    data: $("#editTeamForm").serialize(),
                    method: "PUT", // method is any HTTP method
                })
                    .done(function() {
                        alert("Editing Team");
                        location.href = "details.html?TeamId=" + TeamId;
                    });
            });
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
    // if (1 == 0) {
    //on the "save" / register button click
    $.ajax({
        url: "/api/teams", // your api url
        data: $("#editTeamForm").serialize(),
        method: "PUT", // method is any HTTP method
    })
        .done(function() {
            alert("Editing Team");
            location.href = "details.html?TeamId=" + TeamId;
        });
    
    // } else {
    //     return;
    // }
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




