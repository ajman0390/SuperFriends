"use strict";

$(function () {
  let urlParams = new URLSearchParams(location.search);
  let TeamId = urlParams.get("TeamId");

  // Populates dropdown with leagues.
  $.getJSON("/api/leagues", function (data) {
    let leagueObjs = data;

    // Create Leauges Dropdown list
    const legLen = leagueObjs.length;
    for (let i = 0; i < legLen; i++) {
      $("#teamLeague").append($("<option>", {
        value: leagueObjs[i].Code,
        text: leagueObjs[i].Name
      }));
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

      // Set Values
      $("#teamLeague").val(teamObj.League);
      $("#teamname").val(teamObj.TeamName);
      createPowersList(teamObj);

    });
  $("#regMemberBtn").on("click", function () {
    if (validateMemberForm(teamObj)) {
      $.post("api/teams/" + TeamId + "/members", $("#registerMember").serialize(),
        function () {
          alert("Member added!");
          window.location.href = "details.html?TeamId=" + TeamId; // redirect 
        });
    }
  });

  // Cancel Btn
  $("#cancelBtn").on("click", function () {
    window.location.assign("/details.html?TeamId=" + TeamId);
  });
});

/*
* This function creates the multi select dropdown in the Form 
*/
function createPowersList() {
  let powerObj;
  $.getJSON("/api/powers",
    function (data) {
      powerObj = data;

      for (let i = 0; i < powerObj.length; i++) {
        $("#membersuperpowers").append($("<option>", {
          value: powerObj[i],
          text: powerObj[i]
        }));

      }
    });
}