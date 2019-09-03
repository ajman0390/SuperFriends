"use strict";

function validateTeamForm() {
    let errorArray = [];
    if ($("#teamName").val().trim() == "") {
        errorArray[errorArray.length] = "Please enter a valid Team Name"
    }
    if ($("#maxteammembers").val().trim() == "") {
        errorArray[errorArray.length] = "Please enter a valid number of Max Team Members"
    }
    if ($("#minAge").val().trim() == "") {
        errorArray[errorArray.length] = "Please enter a valid number of Minimum Age for Members"
    }
    if ($("#maxAge").val().trim() == "") {
        errorArray[errorArray.length] = "Please enter a valid number of Maximum Age for Members"
    }
    if ($("#managerName").val().trim() == "") {
        errorArray[errorArray.length] = "Please enter a valid Team Manager Name"
    }
    if ($("#managerPhone").val().trim() == "") {
        errorArray[errorArray.length] = "Please enter a valid Team Manager Phone Number"
    }
    if ($("#manageremail").val().trim() == "") {
        errorArray[errorArray.length] = "Please enter a valid Team Manager Email"
    }
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    if (emailPattern.test($("#manageremail"))) {
        errorArray[errorArray.length] = "Please enter a valid Team Manager Email"
    }

    if (($("#teamLeague").val().trim() == "") || ($("#teamLeague").val() == "zero")) {
        errorArray[errorArray.length] = "Please select a valid Team League"
    }

    if (errorArray.length == 0) {
        return true;
    } else {

        $("#errorMessages").empty();
        for (let i = 0; i < errorArray.length; i++) {
            $("<li>" + errorArray[i] + "</li>").appendTo($("#errorMessages"));
        }
        return false;
    }
}

function validateMemberForm() {
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    const phonePattern = /^[2-9]\d{2}-\d{3}-\d{4}$/

    let errorArray = [];
    if ($("#membername").val().trim() == "") {
        errorArray[errorArray.length] = "Please enter a valid Member Name"
    }
    if ($("#secretidentity").val().trim() == "") {
        errorArray[errorArray.length] = "Please enter a valid Member Secret Identity"
    }
    if ($("#age").val().trim() == "") {
        errorArray[errorArray.length] = "Please enter a valid Member Age"
    }
    if ($("#gender").val() == "Any") {
        errorArray[errorArray.length] = "Please enter a valid Member Gender"
    }
    if ($("#contactname").val().trim() == "") {
        errorArray[errorArray.length] = "Please enter a valid Member Contact Name"
    }
    if ($("#email").val().trim() == "") {
        errorArray[errorArray.length] = "Please enter a valid Member Email"
    } else if (emailPattern.test($("#email"))) {
        errorArray[errorArray.length] = "Please enter a valid Member Email"
    }

    if ($("#phone").val().trim() == "") {
        errorArray[errorArray.length] = "Please enter a valid Member Phone Number"
    } else if (phonePattern.test($("#phone"))) {
        errorArray[errorArray.length] = "Please enter a valid Member Phone Number"
    }
    
    

    if (errorArray.length == 0) {
        return true;
    } else {

        $("#errorMessages").empty();
        for (let i = 0; i < errorArray.length; i++) {
            $("<li>" + errorArray[i] + "</li>").appendTo($("#errorMessages"));
        }
        return false;
    }
}


function valiForm(TeamId) {

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