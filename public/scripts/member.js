$(function () {
    let urlParams = new URLSearchParams(location.search);
    let TeamId = urlParams.get("TeamId");
    let MemberId = urlParams.get("MemberId");

    createPowersMultiList();

    // Age Dropdown
    for (let i = 1; i < 101; i++) {
        let newOption = $("<option>", { value: i, text: i });
        $("#age").append(newOption);
    }

    let memberObj;
    $.getJSON("/api/teams/" + TeamId + "/members/" + MemberId,
        function (data) {
            memberObj = data;

            $("#teamid").val(TeamId);
            $("#memberid").val(memberObj.MemberId);
            $("#membername").val(memberObj.MemberName);
            $("#secretidentity").val(memberObj.SecretIdentity);
            $("#contactname").val(memberObj.ContactName);
            $("#email").val(memberObj.Email);
            $("#managerEmail").val(memberObj.ManagerEmail);
            $("#maxTeamMembers").val(memberObj.MaxTeamMembers);
            $("#phone").val(memberObj.Phone);
            $("#age").val(memberObj.Age);
            $("#gender").val(memberObj.Gender);
            $("#membersuperpowers").val(memberObj.Superpower)

            console.log(memberObj.SuperStatus)

            $(":radio[value=" + memberObj.SuperStatus + "]").attr("checked",true);
        });

    $("#teamId").val(TeamId);
    $("#membername").val(memberid);

    $("#editMemberBtn").on("click", changeBtns);

    /*
    * This function to post student inputs 
    * and send user back to details.html
    */
    $("#updateMemberBtn").on("click",
        function () {
            if (validateMemberForm()) {
            $.ajax({
                url: "/api/teams/" + TeamId + "/members", // your api url
                data: $("#memberForm").serialize(),
                method: 'PUT', // method is any HTTP method
                success: function () {
                    alert("Updating Member");
                    document.location.href = "details.html?TeamId=" + TeamId;
                }
            });
        }
        });

    $("#cancelBtn").on("click", function () {
        window.location.assign("/details.html?TeamId=" + TeamId);
    });
});

function createPowersMultiList() {

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


function changeBtns() {
    $("#editMemberBtn").addClass('hidden') //css('display', 'none');
    $("#updateMemberBtn").removeClass('hidden');
    $("#resetBtn").removeClass('hidden');
    $("*", "#memberForm").removeAttr('readonly');
    $("#teamId").attr('readonly', true);
    $("*", "#memberForm").attr('disabled', false);
    $("#membersuperpowers li button").removeClass('hidden');
    $("#updatePowersBtn").removeClass('hidden');
    //$("#membersuperpowersList li").attr('contenteditable', true);
    //$("#membersuperpowersList li").css('background-color', 'white');
}


/* 
* Reset Btn to clear student inputfields
*/
$("#resetBtn").on("click",
    function () {
        $("#studentname").val("");
        $("#email").val("");
        $("#errorMsg").hide();
    });