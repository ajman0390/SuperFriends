$(function () {
    let urlParams = new URLSearchParams(location.search);
    let TeamId = urlParams.get("TeamId");
    let MemberId = urlParams.get("MemberId");

    $("#teamId").val(TeamId);
    $("#membername").val(MemberId);

    /*
    * This function to post student inputs 
    * and send user back to details.html
    */
    $("#regBtn").on("click",
        function () {

            // Validate student name and email inputs 
            const namePattern = /[-'a-zA-Z]/

            if ( !(namePattern.test($("#studentname").val().trim()))) {
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
            // POST to server with student input data, send user back to details.html
            $.post("/api/register", $("#studentForm").serialize(),
                function (data) { })
            window.location.assign("/details.html?TeamId=" + TeamId);

        });

        $("#cancelBtn").on("click", function () {
            window.location.assign("/details.html?TeamId=" + TeamId);
        });
});

function validateForm(TeamId) {
    // Validate student name and email inputs 
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