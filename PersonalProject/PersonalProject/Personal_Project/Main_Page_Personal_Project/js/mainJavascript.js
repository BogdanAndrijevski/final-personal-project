$(() => {

if (sessionStorage.getItem('accessToken') === null) {
    window.location.href = "Login.html";
}

$('#userNameDropdown').text(sessionStorage.getItem('userName'));


let body = $(`#backgroundPictureDiv`);
let backgrounds = new Array(
`url(backgrounds/image1.jpg)`,
`url(backgrounds/image2.jpg)`,
`url(backgrounds/image3.jpg)`,
`url(backgrounds/image4.jpg)`,
`url(backgrounds/image5.jpg)`,
`url(backgrounds/image6.jpg)`,
`url(backgrounds/image7.jpg)`,
`url(backgrounds/image8.jpg)`,
`url(backgrounds/image9.jpg)`,
);

let current = 0;

function nextBackground() {
body.css(`background`, backgrounds[current = ++current % backgrounds.length]);
setTimeout(nextBackground, 6000);
}

setTimeout(nextBackground, 6000);
body.css(`background`, backgrounds[0]); // za odma da mu stavi background // imam id od css samo e zakomentirano



changeColor(9000);
function changeColor(_param) {
  $(".playerInfoCoatOne").animate({ backgroundColor: getRandomColor() }, _param);
  setTimeout(changeColor, 9000, _param);
}

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



function TypeSomething(_typeWhat, _where) {
  
  let typed = new Typed(_where, {
    strings: [_typeWhat],
    typeSpeed: 80,
    backDelay: 15000,
  
    backSpeed: 5, 
    loop: true,
    showCursor: false,
    // startDelay: 3000
  });
  }

//=============================================================================================
//--------------------------------------- Functions--------------------------------------------
//=============================================================================================

 let myTimeout;
   let isBlack = true;


    window.onfocus = function() {
      console.log('focus')

      // dali ova bi pomognalo
      $(".playerInfoCoatTwo").css('background-color', 'black') // zaso nekad zaglavuva na transparent
      isBlack = true;


      clearTimeout(myTimeout);
      myAction();
    };

    window.onblur = function(){
      console.log('blur')
      clearTimeout(myTimeout);
      
      // $(".playerInfoCoatTwo").animate({ backgroundColor: "black" }, 20);
    };

    function animate() {
      $(".playerInfoCoatTwo").animate({
        backgroundColor: isBlack ? "transparent" : 'black'
      }, 20);
      isBlack = !isBlack;
    }

    function myAction(){

    

      const delay = ms => new Promise(res => myTimeout = setTimeout(res, ms)); 

      async function animateAndWait(msArr) {
        for (let i = 0; i < msArr.length; i++) {
          animate();
          await delay(msArr[i]);
        }
      }

      setTimeout(flashFunction, 3000);

        async function flashFunction() {
        
          await animateAndWait([300, 50, 150, 50, 50, 650]); 
        
          if (myRandomNumberBetween(1, 100) <= 20) {
            return delay(myRandomNumberBetween(9000, 18000))
              .then(flashFunction, console.log("Main Level 1"));
          }
          await animateAndWait([300, 400]); 
          if (myRandomNumberBetween(1, 100) <= 40) { 
            return delay(myRandomNumberBetween(9000, 18000))
              .then(flashFunction, console.log("Level 2"));
          }
         
          await animateAndWait([100, 100, 150, 10]); 
          delay(myRandomNumberBetween(9000, 18000))
            .then(flashFunction, console.log("Level 3"));
        }
      console.log('new cycle')
      $(".playerInfoCoatTwo").css('background-color', 'black'); 

    }

    myAction();

// console.log(myRandomNumberBetween(1, 5))
function myRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//===============================================================================================
UserUnfo();

function UserUnfo(params) {
  $.ajax({
    url: 'UserUnfo',
    method: 'GET',
    headers: {
        'Authorization': 'Bearer '
            + sessionStorage.getItem("accessToken")
    },
    success: function (data) {
      TypeSomething(data.Name, ".UserNameValuetype" );
      TypeSomething(String(data.Reputation), ".ReputationValuetype" );
      TypeSomething(String(data.UserLevel), ".LevelValuetype" )
      TypeSomething(String(data.Experience), ".ExperianceValuetype" )
      TypeSomething(String(data.CarGameBestScore), ".CarBestScoreValuetype" )
      TypeSomething(String(data.PackManGameBestScore), ".PackManBestScoreValuetype" )
      changeDivWidth(data.CalculatedPercentage);
      if(data.Avatar){
      document.getElementById("AvatarPicturePreview").src = String(data.Avatar);
      }
        console.log(data);
    },
    error: function (jQXHR) {
    }
});
}
 


//===============================================================================================

$('#btnLogoff').click(function () {
  sessionStorage.removeItem('accessToken');
  window.location.href = "../Login.html";
});

//===============================================================================================
function changeDivWidth(_params) {
  $("#innerPercentageDiv").animate({ width: `${_params}%` }, 2600);
}
//===============================================================================================

$(`#gameOne, #gameTwo` ).mouseenter(function() {
  shakeMe($(this));
});

function shakeMe(_div) {
  
  var div = _div
  var interval = 40;
  var distance = 3;
  var times = 4;

  $(div).css('position', 'relative');
  for (var iter = 0; iter < (times + 1) ; iter++) {
      $(div).animate({
          top: ((iter % 2 == 0 ? distance : distance * -1))
      }, interval);
  }                                                                                                          
  $(div).animate({ top: 0 }, interval);
  for (var iter = 0; iter < (times + 1) ; iter++) {
      $(div).animate({
          left: ((iter % 2 == 0 ? distance : distance * -1))
      }, interval);
  }                                                                                                          
  $(div).animate({ left: 0 }, interval);
}

//===============================================================================================
}); // end of jQuery(document).ready(function()
