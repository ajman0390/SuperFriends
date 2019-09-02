"use strict";

$(function() {
  // Populates dropdown with leagues.
  $.getJSON("/api/leagues", function(data) {
    let leagueObjs = data;

    // Create Input League Dropdown list
    const legLen = leagueObjs.length;
    for (let i = 0; i < legLen; i++) {
        $("#teamLeague").append("<option value='" + leagueObjs[i].Code + "'>" + leagueObjs[i].Name + "</option>");
    }

  }); 
  $("#editTeamBtn").on("click", changeBtns);
  $("#regTeamBtn").on("click", function() {
    $.post("api/teams", $("#regTeamForm").serialize(), function(data) {
      postData = JSON.parse(data);
      location.href = "teams.html?TeamId=" + postData.TeamId;
    });
     
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