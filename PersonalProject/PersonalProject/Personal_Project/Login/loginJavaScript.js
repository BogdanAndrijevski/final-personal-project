$(document).ready(function () {

    $('#GetMySomeThing').click(function () {
        $.ajax({
            url: 'GetMySomeThing',
            method: 'GET',
            contentType: 'application/json',
            success: function (data) {
                console.log(data);
            },
            error: function (jQXHR) {
            }
        });
    });

    //Close the bootstrap alert
    $('#linkClose').click(function () {
        $('#divError').hide('fade');
    });

    $(document).on('click', 'div', function () {
        $('#divError').hide('fade');
        console.log("asd");
    });
   
    $(document).on('click', '#bg', function () {
        $('#divError').hide('fade');
        console.log("asd");
    });
   
    // Save the new user details
    $('#btnLogin').click(function () {

        $.ajax({
            url: '/token',
            method: 'POST',
            contentType: 'application/json',
            data: {
                //email: $('#txtEmail').val(),
                username: $('#txtUserName').val(),
                password: $('#txtPassword').val(),
                grant_type: 'password'
                //confirmPassword: $('#txtConfirmPassword').val()
            },
            success: function (response) {
                sessionStorage.setItem("accessToken", response.access_token);
                sessionStorage.setItem("userName", response.userName);
                //window.location.href = "Data.html";
                window.location.href = "Main_Page_Personal_Project/main.html";

            },
            error: function (jqXHR) {
                $('#divErrorText').text(jqXHR.responseText);
                $('#divError').show('fade');
            }
        });
    });
});