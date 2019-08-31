$(function () {
    let urlParams = new URLSearchParams(location.search);
    let TeamId = urlParams.get("TeamId");
    let MemberId = urlParams.get("MemberId");

    let memberObj;
    $.getJSON("/api/teams/" + TeamId + "/members/" + MemberId,
        function (data) {
            memberObj = data;

            console.log(memberObj);

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
    $("#updatePowersBtn").on("click", addPowers);

    /*
    * This function to post student inputs 
    * and send user back to details.html
    */
    $("#updateMemberBtn").on("click",
        function () {
            // POST to server with student input data, send user back to details.html
            $.post("/api/teams/" + TeamId + "/members", $("#memberForm").serialize(),
                function (data) {})
            window.location.assign("/details.html?TeamId=" + TeamId);

        });


    $("#cancelBtn").on("click", function () {
        window.location.assign("/details.html?TeamId=" + TeamId);
    });
});

function validateForm(TeamId) {

    // Validate student name and email inputs 
    const namePattern = /[-'a-zA-Z]/

    if (!(namePattern.test($("#studentname").val().trim()))) {
        $("#errorMsg").html("Please fill out name field");
        $("#errorMsg").show();
        $("#studentname").focus();
        return;
    } else {
        if ($("#email").val() == "") {
            $("#errorMsg").html("Please fill out all fields");
            $("#errorMsg").show();
            $("#email").focus();
            return;
        } else {
            const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

            if (emailPattern.test($("#email").val())) {
                $("#errorMsg").hide();
            } else {
                $("#errorMsg").html("Please enter valid email address");
                $("#errorMsg").show();
                $("#email").focus();
                return;
            }
        }
    }
}

function createPowersList(memberObj) {

    let powerObj;
    $.getJSON("/api/powers",
        function (data) {
            powerObj = data;

            for (let k = 0; k < powerObj.length; k++) {
                let dropItem = `<option value=${powerObj[k]}>${powerObj[k]}</option>`;
                $("#membersuperpowers").append(dropItem);
            }
        });
        
    const powersLen = memberObj.SuperPowers.length;
    for (let j = 0; j < powersLen; j++) {
        let delPowerBtn = `<button type="button" class="delPowerBtn btn btn-outline-danger btn-sm m-2 hidden" id="deletePowerBtn` + [j] + `">Delete</button>`;
        console.log(memberObj.SuperPowers[j]);
        
        let listItem = `<li class="mt-3">${memberObj.SuperPowers[j]}${delPowerBtn}</li>`
        $("#membersuperpowersList").append(listItem);
    }

    for (let i = 0; i < powersLen; i++) {
        // Delete SuperPower in List ~ Ongoing ~
        $("#deletePowerBtn" + i).on("click", function () {
            $(this).parent('li').remove();
        });
    }
}

function addPowers() {
    let delPowerBtn = `<button type="button" class="delPowerBtn btn btn-outline-danger btn-sm m-2" id="deletePowerBtn">Delete</button>`;

    if ($("#membersuperpowers").val() != 'zero') {
        let addedPower = $("#membersuperpowers option:selected").text();
        let addedPowerListItem = `<li class="mt-3">${addedPower}${delPowerBtn}</li>`;
        $("#membersuperpowersList").append(addedPowerListItem);
    } else {
        return;
    }
}



function changeBtns() {
    $("#editMemberBtn").addClass('hidden') //css('display', 'none');
    $("#updateMemberBtn").removeClass('hidden');
    $("#resetBtn").removeClass('hidden');
    $("*", "#memberForm").removeAttr('readonly');
    $("#teamId").attr('readonly', true);
    $("*", "#memberForm").attr('disabled', false);
    $("#membersuperpowersList li button").removeClass('hidden');
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