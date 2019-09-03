"use strict";

$(function() {
  // Populates dropdown with leagues.
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
  $("#editTeamBtn").on("click", changeBtns);
  $("#regTeamBtn").on("click", function() {
    if (validateTeamForm()) {
    $.post("api/teams", $("#regTeamForm").serialize(), function(data) {
      let postData = JSON.parse(data);
      location.href = "teams.html?TeamId=" + postData.TeamId;
    });
  }     
  });

  $("#cancelBtn").on("click", function() {
    location.href = "teams.html";
  });

});

function changeBtns() {
  $("#editTeamBtn").addClass('hidden') //css('display', 'none');
  $("#regTeamBtn").removeClass('hidden');
  $("#resetBtn").removeClass('hidden');
  $("*", "#regTeamForm").removeAttr('readonly');
  $("#teamId").attr('readonly', true);
  $("*", "#regTeamForm").attr('disabled', false);
}