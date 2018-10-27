$(() => {

    if (sessionStorage.getItem('accessToken') === null) {
        window.location.href = "Login.html";
    }

    $('#userNameDropdown').text(sessionStorage.getItem('userName'));

    
$('#btnLogoff').click(function () {
    sessionStorage.removeItem('accessToken');
    window.location.href = "../Login.html";
  });

}); // end of jQuery(document).ready(function()
