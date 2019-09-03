"use strict";

$(function () {
  let urlParams = new URLSearchParams(location.search);
  let TeamId = urlParams.get("TeamId");

  // Populates dropdown with leagues.
  $.getJSON("/api/leagues", function(data) {
    let leagueObjs = data;

    // Create Input League Dropdown list
    const legLen = leagueObjs.length;
    for (let i = 0; i < legLen; i++) {
        $("#teamLeague").append("<option value='" + leagueObjs[i].Code + "'>" + leagueObjs[i].Name + "</option>");
    }

  });

  let teamObj;
  $.getJSON("/api/teams/" + TeamId,
    function (data) {
      teamObj = data;

      $("#teamLeague").val(teamObj.League);
      $("#teamname").val(teamObj.TeamName);

    });
  $("#regMemberBtn").on("click", function () {
    $.post("api/teams/" + TeamId + "/members", $("#registerMember").serialize(), 
    function() {
      alert("Member added!");
      window.location.href = "details.html?TeamId=" + TeamId; // redirect 
    });
    
  });

  $("#cancelBtn").on("click", function () {
    window.location.assign("/details.html?TeamId=" + TeamId);
  });
});