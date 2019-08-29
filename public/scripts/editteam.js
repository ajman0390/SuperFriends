"use strict";

//document ready event handler
$(function () {
    let urlParams = new URLSearchParams(location.search);
    let TeamId = urlParams.get("TeamId");

    let teamObj;
    $.getJSON("/api/teams/" + TeamId,
        function (data) {
            teamObj = data;

            $("#TeamId").val(TeamId);
            $("#courseCategory").val(teamObj.Category);
            $("#courseTitle").val(teamObj.Title);
            $("#courseFee").val(teamObj.Fee);
            $("#courseStartDate").val(teamObj.StartDate);
            $("#courseEndDate").val(teamObj.EndDate);
            $("#courseMeets").val(teamObj.Meets);
            $("#courseLocation").val(teamObj.Location);

            $("#updateCourseBtn").on("click", function () {
                let validationResult = validateForm();
                if (validationResult) {
                    //on the "save" / register button click
                    $.ajax({
                        url: '/api/courses', // your api url
                        data: $("#editCourseForm").serialize(),
                        method: 'PUT', // method is any HTTP method
                        success: function () {
                            alert("Working");
                            document.location.href = "instructor.html?TeamId=" + TeamId;
                        }
                    });
                } else {
                    return;
                }
            });

        });

    //go back button click event
    $("#cancelAddCourseBtn").on("click", function () {
        window.location.assign("/details.html?TeamId=" + TeamId);
    });
});


/* 
* Reset Btn to clear student inputfields
*/
$("#resetBtn").on("click",
    function () {
        $("#studentname").val("");
        $("#email").val("");
        $("#errorMessages").empty();
        $("#errorMsg").hide();
    });