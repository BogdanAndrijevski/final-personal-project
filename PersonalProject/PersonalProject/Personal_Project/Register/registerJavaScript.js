// $(document).ready(function () {
$(() => {
let isUserNameValid = false;
let isEmailValid = false;
let isPassValid = false;
let isConfirmPassValid = false;
let isRegisterBtnReady = false;
    // alert("register page");

//     $("#telefon").on("input", function(){
//         if(this.value.length === 4){
//             $(this).val(this.value + "-");
//         }
//     var numberArray = this.value.split("-");
//     var firstNumber = parseInt(numberArray[0]);
//     var secondNumber = parseInt(numberArray[1]);

//     if(numberArray.length != 2 || this.value.length != 8  || isNaN(firstNumber) || isNaN(secondNumber)){
//         $(this).css("border","1px solid red");
//     }
//     else{
//         $(this).css("border","1px solid black");
//         isPhoneNumberValid = true;
//     }

// });
function RegisterBtn() {
    // if(isConfirmPassValid === true){
    // if($("#txtConfirmPassword").val().length % 2 === 0  && $("#txtConfirmPassword").val().length> 0 ){
    if(isConfirmPassValid === true && isPassValid === true && isEmailValid === true  && isUserNameValid === true ){
        // alert();
        $("#btnRegister").css("border","1px solid #3bff00"); // green
        $("#btnRegister").css('color', '#3bff00'); // green
        isRegisterBtnReady = true;
    }
    else{
        $("#btnRegister").css("border","1px solid #ff4949"); // red
        $("#btnRegister").css('color', '#ff4949'); // red
        isRegisterBtnReady = false;
    }
}


    $("#txtUserName").on("input", function(){
        $("#txtUserName").css("border-bottom","1px solid #ff4949"); // red
        isUserNameValid = false;
        RegisterBtn();

    // $("#txtUserName").change(function(){
    // $("#txtUserName").focusout(function(){
  
        // $.ajax({
        //     url: 'Register/TestRegister',
        //     method: 'GET',
        //     // headers: {
        //     //     'Authorization': 'Bearer '
        //     //         + sessionStorage.getItem("accessToken")
        //     // },
        //     success: function (data) {
        //         alert(data);
        //         console.log(data)
        //     },
        //     error: function (jQXHR) {
        //     }
        // });


       
            $.ajax({
                url: 'Register/isUserNameAvailable',
                method: 'POST',
                //headers: {
                //    'Authorization': 'Bearer '
                //        + sessionStorage.getItem("accessToken")
                //},
                contentType: 'application/json',
                dataType: "text",

                // data: JSON.stringify(666),
                data: JSON.stringify($("#txtUserName").val()),

                success: function (_data) {
                    console.log(_data);
                    var isAvailable = (_data == 'true');

                    if(isAvailable == true && $("#txtUserName").val().length > 0)
                    // if( 2 > 1 )
                    {
                        // alert();
                        $("#txtUserName").css("border-bottom","1px solid #3bff00"); // green
                        isUserNameValid = true;
                        RegisterBtn();

                    }
                    else{
                        $("#txtUserName").css("border-bottom","1px solid #ff4949"); // red
                        isUserNameValid = false;
                    RegisterBtn();

                    }
                   
                },
                error: function (jQXHR) {
                }
            });
      
    // if(this.value.length % 2 == 0){
    //     $(this).css("border-bottom","1px solid #ff4949"); // red
    // }
    // else{
    //     $(this).css("border-bottom","1px solid #3bff00"); // green
    //     // isPhoneNumberValid = true;
    // }

    });

    function confirmPass() {
        if($("#txtConfirmPassword").val() ===  $("#txtPassword").val() && isPassValid === true){
            $("#txtConfirmPassword").css("border-bottom","1px solid #3bff00"); // green
            isConfirmPassValid = true;
        }
        else{
            $("#txtConfirmPassword").css("border-bottom","1px solid #ff4949"); // red
            isConfirmPassValid = false;
        }
    }
    $("#txtConfirmPassword").on("input", function(){
      
        // if($("#txtConfirmPassword").val() ===  $("#txtPassword").val() && isPassValid === true){
        //     $("#txtConfirmPassword").css("border-bottom","1px solid #3bff00"); // green
        //     isConfirmPassValid = true;
        // }
        // else{
        //     $("#txtConfirmPassword").css("border-bottom","1px solid #ff4949"); // red
        //     isConfirmPassValid = false;
        // }
        confirmPass();
        RegisterBtn();
        });
        
    $("#txtPassword").on("input", function(){
        let pass = this.value;
      //=====================================================================

        var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
//            ^                                    ^   
//   console.log(format.test("My@string-with(some%text)") + "<br/>");
//   console.log(format.test("My string with spaces") + "<br/>");
//   console.log(format.test("MyStringContainingNoSpecialChars"));
//   console.log(format.test(String(pass)));
      //=====================================================================
        function hasNumber(str) {
            for( let i = 0; i < str.length; i++){
                    // console.log(str.charAt(i));
                    if(!isNaN(str.charAt(i))){           //if the string is a number, do the following
                        return true;
                        // return 
                    }
                }
      return false;
        }
        //=========================================
        function hasUpperCase(str) {
            if(str.toLowerCase() != str) {
                return true;
            }
            return false;
        }
        //=========================================
     
        if( this.value.length >= 6 && hasUpperCase(pass) && hasNumber(String(pass)) && format.test(String(pass)) ){
            $(this).css("border-bottom","1px solid #3bff00"); // green
            isPassValid = true;
        }
        else{
            $(this).css("border-bottom","1px solid #ff4949"); // red
            isPassValid = false
        }
        confirmPass();
        RegisterBtn();

        });


    $("#txtEmail").on("input", function(){

        if(this.value.includes("@")){

            let email = this.value.split("@");
            let firstBit = email[0];
            let secdondBit = email[1];
    
            // console.log(firstBit);
            // console.log(secdondBit);
            if(firstBit &&secdondBit ){
            $(this).css("border-bottom","1px solid #3bff00"); // green
            isEmailValid = true;
            }
            else{
                $(this).css("border-bottom","1px solid #ff4949"); // red
                isEmailValid = false;
            }
        }
        else{
            $(this).css("border-bottom","1px solid #ff4949"); // red
            isEmailValid = false;
        }
        RegisterBtn();
    
        });

    
    // $("#txtUserName").on("input", function(){
    //     //     if(this.value.length === 4){
    //     //         $(this).val(this.value + "-");
    //     //     }
    //     // var numberArray = this.value.split("-");
    //     // var firstNumber = parseInt(numberArray[0]);
    //     // var secondNumber = parseInt(numberArray[1]);
    
    //     // if(numberArray.length != 2 || this.value.length != 8  || isNaN(firstNumber) || isNaN(secondNumber)){
    //     if(this.value.length % 2 == 0){
    //         $(this).css("border","1px solid red");
    //     }
    //     else{
    //         $(this).css("border","1px solid black");
    //         // isPhoneNumberValid = true;
    //     }
    
    //     });


    //Close the bootstrap alert
    $('#linkClose').click(function () {
        $('#divError').hide('fade');
    });

    $(document).on('click', 'div', function () {
        $('#divError').hide('fade');
        // console.log("asd");
    });

    $(document).on('click', '#bg', function () {
        $('#divError').hide('fade');
        // console.log("asd");
    });

    // Save the new user details
    $('#btnRegister').click(function () {
        //$('#successModal').modal('show'); // for testing purposes
        if(isRegisterBtnReady === true){
        $.ajax({
            url: '/api/account/register',
            method: 'POST',
            data: {
                UserName: $('#txtUserName').val(),
                email: $('#txtEmail').val(),
                password: $('#txtPassword').val(),
                confirmPassword: $('#txtConfirmPassword').val()
            },
            success: function () {
                // alert("OK");
                $('input').val('');
                 isUserNameValid = false;
                 isEmailValid = false;
                 isPassValid = false;
                 isConfirmPassValid = false;
                 isRegisterBtnReady = false;
                //  $("#txtConfirmPassword, #txtUserName, #txtEmail, #txtPassword").css("border-bottom","1px solid #ff4949"); // red
                 $("input").css("border-bottom","1px solid #ff4949"); // red
                 $("#btnRegister").css('border',"1px solid #ff4949") // red
                 $("#btnRegister").css('color', '#ff4949'); // red
                $('#successModal').modal('show');
            },
            error: function (jqXHR) {
               // alert("not OK");
                $('#divErrorText').text(jqXHR.responseText);
                $('#divError').show('fade');
            }
        });
    }
    });
});