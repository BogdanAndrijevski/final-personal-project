$(() => {

    if (sessionStorage.getItem('accessToken') === null) {
        window.location.href = "Login.html";
    }

    $('#userNameDropdown').text(sessionStorage.getItem('userName'));

    
$('#btnLogoff').click(function () {
    sessionStorage.removeItem('accessToken');
    window.location.href = "../Login.html";
});

getProfilePageInfo();

    
    //  Ne raboti
     $('#deleteUserBtn').click(function () {
         //   alert();
         $.ajax({
             url: 'Profile/DeleteUser',
             method: 'DELETE',
             headers: {
             'Authorization': 'Bearer '
                 + sessionStorage.getItem("accessToken")
             },
             success: function (data) {
                 sessionStorage.removeItem('accessToken');
                 window.location.href = "../Login.html";
               // console.log(data)
             },
             error: function (jQXHR) {
             }
         });
     });
    
function getProfilePageInfo() {
    
    $.ajax({
        url: 'Profile/getProfilePageInfo',
        method: 'GET',
        headers: {
           'Authorization': 'Bearer '
               + sessionStorage.getItem("accessToken")
        },
        success: function (data) {
        console.log(data);
        $('#UserName-Profile-P-Value').html(data.username);
        $('#levelProfile-Profile-P-Value').html(data.level);
        $('#experiance-Profile-P-Value').html(data.experiance);
        $('#reputation-Profile-P-Value').html(data.reputation);
        $('#carGameBestScore-Profile-P-Value').html(data.carGameBestScore);
        $('#pacmanGameBestScore-Profile-P-Value').html(data.pacmanGameBestScore);
        // console.log(data.avatarPicture);
        if(data.avatarPicture){
                document.getElementById("uploadPreview").src = data.avatarPicture;
         }
        },
        error: function (jQXHR) {
        }
    });
}
//====================================================================================
$("#uploadImage").on("change", PreviewImage);

function PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);
    // console.log(document.getElementById("uploadImage").files[0]);
    oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
       
    };
};


//====================================================================================

 
 $('#but_upload').click(function () {

    var img = document.createElement("img");

    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

    oFReader.onload = function (oFREvent) {
        img.src = oFREvent.target.result;
    };

    img.onload = function () {
        var c = document.createElement('canvas');
        c.height = 50; // ako go nema ova ako e golema slikata nema da se usnimi
        c.width = 50; // ako go nema ova ako e golema slikata nema da se usnimi
        var ctx = c.getContext('2d');
        //--------------------------------------------------------------------------------
        //---------------------------- ne ja skejla --- ja razvlekuva do c.height = 50; i  c.width = 50;

        // ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, 50, 50);
        //--------------------------------------------------------------------------------
        //---------------------------- za da ja usnimi vo razmer -- da skejla a ne da ja rezvlece
        //var c = ctx.canvas;
        var hRatio = c.width / img.width;
        var vRatio = c.height / img.height;
        var ratio = Math.min(hRatio, vRatio);
        var centerShift_x = (c.width - img.width * ratio) / 2;
        var centerShift_y = (c.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);  
    //--------------------------------------------------------------------------------

        var base64String = c.toDataURL();

        console.log(base64String);

        $.ajax({
            url: 'Profile/Avatar',
            method: 'POST', // ako e "POST" a veke ima informacija na toa pole moze da pravi problem
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer '
                    + sessionStorage.getItem("accessToken")
            },
            dataType: "text",
            data: JSON.stringify(base64String),

            success: function (_data) {
           
                // mi paga povikot so ova
                // for load avatar
                // let image = new Image();
                // image.src = _data;
            },
            error: function (jQXHR) {
            }
        });

    };
    return false;
});

    
}); // end of jQuery(document).ready(function()
