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

            // Set values in Form
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

            $(":radio[value=" + teamObj.SuperStatus + "]").attr('checked',true);

            // Change Btns
            $("#editTeamBtn").on("click", changeBtns);

            // Send Form after validation to edit a team
            $("#updateTeamBtn").on("click", function () {
                if (validateTeamForm(teamObj)) {
                    $.ajax({
                        url: "/api/teams", // your api url
                        data: $("#editTeamForm").serialize(),
                        method: "PUT", // method is any HTTP method
                    })
                        .done(function () {
                            alert("Editing Team");
                            location.href = "details.html?TeamId=" + TeamId;
                        });
                }
            });
        });

    // Cancel Btn 
    $("#cancelBtn").on("click", function () {
        window.location.assign("/details.html?TeamId=" + TeamId);
    });
});

/*
* This function changes the btns on the Form 
*/
function changeBtns() {
    $("#editTeamBtn").addClass('hidden') //css('display', 'none');
    $("#updateTeamBtn").removeClass('hidden');
    $("#resetBtn").removeClass('hidden');
    $("*", "#editTeamForm").removeAttr('readonly');
    $("#teamId").attr('readonly', true);
    $("*", "#editTeamForm").attr('disabled', false);
}

/*
* This function sends the submitted form to edit team api after form validation 
*/
function sendForm() {
    $.ajax({
        url: "/api/teams", // your api url
        data: $("#editTeamForm").serialize(),
        method: "PUT", // method is any HTTP method
    })
        .done(function () {
            alert("Editing Team");
            location.href = "details.html?TeamId=" + TeamId;
        });
}

/*
* This function creates the Leauges Dropdown list 
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




