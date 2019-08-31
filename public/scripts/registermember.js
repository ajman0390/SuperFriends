"use strict";

$(function () {
  let urlParams = new URLSearchParams(location.search);
  let TeamId = urlParams.get("TeamId");

  let teamObj;
  $.getJSON("/api/teams/" + TeamId,
    function (data) {
      teamObj = data;

      // $("#teamid").val(TeamId);
      // $("#memberid").val(teamObj.MemberId);
      $("#teamname").val(teamObj.TeamName);
      // $("#secretidentity").val(teamObj.SecretIdentity);
      // $("#contactname").val(teamObj.ContactName);
      // $("#email").val(teamObj.Email);
      // $("#managerEmail").val(teamObj.ManagerEmail);
      // $("#maxTeamMembers").val(teamObj.MaxTeamMembers);
      // $("#phone").val(teamObj.Phone);
      // $("#maxAge").val(teamObj.Age);
      // $("#teamGender").val(teamObj.Gender);

      //createPowersList(memberObj);

    });
  $("#addMemberBtn").on("click", function () {
    $.post("api/teams/" + TeamId + "/members", $("#registerMember").serialize());
    window.location.href = "details.html?TeamId=" + TeamId; // redirect after submit 
  });

});