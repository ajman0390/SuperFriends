"use strict";

$(function () {
  let urlParams = new URLSearchParams(location.search);
  let TeamId = urlParams.get("TeamId");

  // Populates dropdown with leagues.
  $.getJSON("/api/leagues", function (data) {
    let leagueObjs = data;

    // Create Input League Dropdown list
    const legLen = leagueObjs.length;
    for (let i = 0; i < legLen; i++) {
      $("#teamLeague").append("<option value='" + leagueObjs[i].Code + "'>" + leagueObjs[i].Name + "</option>");
    }

    // Age Dropdown
    for (let i = 1; i < 101; i++) {
      let newOption = $("<option>", { value: i, text: i });
      $("#age").append(newOption);
  }

  });

  let teamObj;
  $.getJSON("/api/teams/" + TeamId,
    function (data) {
      teamObj = data;

      $("#teamLeague").val(teamObj.League);
      $("#teamname").val(teamObj.TeamName);
      createPowersList(teamObj);

    });
  $("#regMemberBtn").on("click", function () {
    if (validateMemberForm()) {
    $.post("api/teams/" + TeamId + "/members", $("#registerMember").serialize(),
      function () {
        alert("Member added!");
        window.location.href = "details.html?TeamId=" + TeamId; // redirect 
      });

    }

  });

  $("#cancelBtn").on("click", function () {
    window.location.assign("/details.html?TeamId=" + TeamId);
  });
});

function createPowersList(teamObj) {

  let powerObj;
  $.getJSON("/api/powers",
    function (data) {
      powerObj = data;

      for (let k = 0; k < powerObj.length; k++) {
        $("#membersuperpowers").append($("<option>", {
          value: powerObj[k],
          text: powerObj[k]
        }));

    }
    });

}