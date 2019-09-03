$(function () {
    let urlParams = new URLSearchParams(location.search);
    let TeamId = urlParams.get("TeamId");
    let MemberId = urlParams.get("MemberId");

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

            createPowersList(memberObj);

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


function createPowersList(memberObj) { 
    if ( (memberObj.Superpower == undefined) || (memberObj.Superpower.length < 0) ) {
        return;
    }
    
    const powersLen = memberObj.Superpower.length;
    for (let i = 0; i < powersLen; i++) {
        
        console.log(memberObj.Superpower[i]);

        $("#membersuperpowers").append($("<li>", {
            class: "mt-3",
            text: memberObj.Superpower[i],
            name: "membersuperpowers"
        }));

        $("#membersuperpowers li:last").append($("<button>", {
            class: "delPowerBtn btn btn-outline-danger btn-sm m-2 hidden",
            text: "Delete",
            id: "deletePowerBtn" + i
        }));

        $("#deletePowerBtn" + i).on("click", function() {
            $(this).parent('li').remove();
        });

        //memberObj.Superpower[i].val($("#membersuperpowers"))
    }

    createPowersMultiList();

    
}

function createPowersMultiList() {

    let powerObj;
    $.getJSON("/api/powers",
      function (data) {
        powerObj = data;
  
        for (let k = 0; k < powerObj.length; k++) {
          $("#membersuperpowersSelect").append($("<option>", {
            value: powerObj[k],
            text: powerObj[k]
          }));
  
      }
      });
  
  }

// function addPowers() {
//     let delPowerBtn = `<button type="button" class="delPowerBtn btn btn-outline-danger btn-sm m-2" id="deletePowerBtn">Delete</button>`;

//     if ($("#membersuperpowers").val() != 'zero') {
//         let addedPower = $("#membersuperpowers option:selected").text();
//         let addedPowerListItem = `<li class="mt-3">${addedPower}${delPowerBtn}</li>`;
//         $("#membersuperpowersList").append(addedPowerListItem);
//     } else {
//         return;
//     }
// }



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