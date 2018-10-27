//============================== Consts ==================================

let RC = {};

RC.car = $('#car');
RC.car_1 = $('#car_1');
RC.car_2 = $('#car_2');
RC.car_3 = $('#car_3');
RC.car_4 = $('#car_4');
RC.car_5 = $('#car_5');
RC.car_6 = $('#car_6');
RC.car_7 = $('#car_7');
RC.car_8 = $('#car_8');
RC.car_9 = $('#car_9');


RC.line_1 = $('#line_1');
RC.line_2 = $('#line_2');
RC.line_3 = $('#line_3');
RC.line_4 = $('#line_4');
RC.line_5 = $('#line_5');
RC.line_6 = $('#line_6');

RC.Game = {};

RC.Game.animID; 

RC.Game.restart_div = $('#restart_div');
RC.Game.start_div = $('#start_div');
RC.Game.restart_btn = $('#restart');
RC.Game.score2 = $('#score');
RC.Game.my_score = 0;

//saving some initial setup

RC.Sizes = {};
var container01 = document.getElementById("container");
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
container01.appendChild(canvas);
canvas.width = 600;
canvas.height = 400;

RC.Sizes.container = $('#container');
RC.Sizes.container_width = parseInt(RC.Sizes.container.width());
RC.Sizes.container_height = parseInt(RC.Sizes.container.height());

RC.Sizes.car_width = parseInt(RC.car.width());
RC.Sizes.car_height = parseInt(RC.car.height());

RC.Game.game_over = false;

RC.Game.score_counter = 1;

RC.Game.speed = 2;
RC.Game.line_speed = 5;

RC.Game.is_Pause_Resume_Available = false;


RC.Move = {};

RC.Move.right = false;
RC.Move.left = false; 
RC.Move.up = false; 
RC.Move.down = false; 



/* ------------------------------GAME CODE STARTS HERE------------------------------------------- */

 /* Move the cars */
 $(document).on('keydown', function(e) {
    if (RC.Game.game_over === false) {
        let key = e.keyCode;
        if (key === 37 && RC.Move.left === false) {
            RC.Move.left = requestAnimationFrame(RC.left);
        } else if (key === 39 && RC.Move.right === false) {
            RC.Move.right = requestAnimationFrame(RC.right);
        } else if (key === 38 && RC.Move.up === false) {
            RC.Move.up = requestAnimationFrame(RC.up);
        } else if (key === 40 && RC.Move.down === false) {
            RC.Move.down = requestAnimationFrame(RC.down);
        }
    }
});

$(document).on('keyup', function(e) {
    if (RC.Game.game_over === false) {
        let key = e.keyCode;
        if (key === 37) {
            cancelAnimationFrame(RC.Move.left);
            RC.Move.left = false;
        } else if (key === 39) {
            cancelAnimationFrame(RC.Move.right);
            RC.Move.right = false;
        } else if (key === 38) {
            cancelAnimationFrame(RC.Move.up);
            RC.Move.up = false;
        } else if (key === 40) {
            cancelAnimationFrame(RC.Move.down);
            RC.Move.down = false;
        }
    }
});


RC.left = function () {
    if (RC.Game.game_over === false && parseInt(RC.car.css('left')) > 0) {
        RC.car.css('left', parseInt(RC.car.css('left')) - 5);
        RC.Move.left = requestAnimationFrame(RC.left);
    }
}

RC.right = function () {
    if (RC.Game.game_over === false && parseInt(RC.car.css('left')) < RC.Sizes.container_width - RC.Sizes.car_width) {
        RC.car.css('left', parseInt(RC.car.css('left')) + 5);
        RC.Move.right = requestAnimationFrame(RC.right);
    }
}

RC.up = function () {
    if (RC.Game.game_over === false && parseInt(RC.car.css('top')) > 0) {
        RC.car.css('top', parseInt(RC.car.css('top')) - 3);
        RC.Move.up = requestAnimationFrame(RC.up);
    }
}

RC.down = function () {
    if (RC.Game.game_over === false && parseInt(RC.car.css('top')) < RC.Sizes.container_height - RC.Sizes.car_height) {
        RC.car.css('top', parseInt(RC.car.css('top')) + 3);
        RC.Move.down = requestAnimationFrame(RC.down);
    }
}

/* Move the cars and lines */


function repeat() {

    if (RC.collision(RC.car, RC.car_1) || RC.collision(RC.car, RC.car_2) || RC.collision(RC.car, RC.car_3)
    || RC.collision(RC.car, RC.car_4) || RC.collision(RC.car, RC.car_5) || RC.collision(RC.car, RC.car_6)
    || RC.collision(RC.car, RC.car_7) || RC.collision(RC.car, RC.car_8) || RC.collision(RC.car, RC.car_9)) {
        RC.stop_the_game();
        RC.Game.is_Pause_Resume_Available = false; // samo ova e novo - return si stoi
   
    RC.Game.start_div.fadeIn(1000);
   
    CarGameEndGameUpdate(6, RC.Game.my_score);


        // alert();
        return;
    }

    RC.Game.score_counter++;

    if (RC.Game.score_counter % 20 == 0) {
        RC.Game.my_score = RC.Game.my_score + 1;
        RC.Game.score2.html(RC.Game.my_score);
     
    }
    if (RC.Game.score_counter % 500 == 0) {
        RC.Game.speed++;
        RC.Game.line_speed++;
    }

    RC.car_down(RC.car_1);
    RC.car_down(RC.car_2);
    RC.car_down(RC.car_3);
    RC.car_down(RC.car_4);
    RC.car_down(RC.car_5);
    RC.car_down(RC.car_6);
    RC.car_down(RC.car_7);
    RC.car_down(RC.car_8);
    RC.car_down(RC.car_9);

    RC.line_down(RC.line_1);
    RC.line_down(RC.line_2);
    RC.line_down(RC.line_3);

    RC.line_down(RC.line_4);
    RC.line_down(RC.line_5);
    RC.line_down(RC.line_6);

    context.font = "20px myThirdFont";


    RC.Game.animID = requestAnimationFrame(repeat);
}

RC.car_down = function (car) {
    let car_current_top = parseInt(car.css('top'));
    if (car_current_top > RC.Sizes.container_height) {
        car_current_top = -200;
        let car_left = parseInt(Math.random() * (RC.Sizes.container_width - RC.Sizes.car_width));
        car.css('left', car_left);
    }
    car.css('top', car_current_top + RC.Game.speed);
}


RC.car_down3 = function (car, _top, _left) {
    car.css({top: _top, left: _left});
}
RC.line_down = function (line) {
    var line_current_top = parseInt(line.css('top'));
    if (line_current_top > RC.Sizes.container_height) {
        line_current_top = -300;
    }
    line.css('top', line_current_top + RC.Game.line_speed);
}

RC.Game.restart_btn.click(function() {
   
    RC.Game.start_div.hide();
    RC.Sizes.container.show();
   
    location.reload();

});


RC.pause_resume = function () {
    if($('#Check').hasClass( "unPaused" )){
        let myClass = $('#Check').attr('class');
   
        console.log(myClass);
        $('#Check').removeClass( "unPaused" ).addClass( "Paused" );
       
        $('#i-pauseResume').removeClass( "fa fa-pause" ).addClass( "fa fa-play" );

         // pausing
        RC.stop_the_game();
        return; 
    }
    else if($('#Check').hasClass( "Paused" )){
        let myClass = $('#Check').attr('class');
  
        // alert(myClass);
        console.log(myClass);
        $('#Check').removeClass( "Paused" ).addClass( "unPaused" );
        // $('i').removeClass( "fa fa-play" ).addClass( "fa fa-pause" );
        $('#i-pauseResume').removeClass( "fa fa-play" ).addClass( "fa fa-pause" );
     
         // resuming
         RC.Game.game_over = false;
         RC.Game.animID = requestAnimationFrame(repeat);
    }
}
//===========================================================================
$(document).keydown(function(e) {
    if(e.key == "Escape" && RC.Game.is_Pause_Resume_Available === true) {
        RC.pause_resume();
    }
});
$("#Check").click(function () {
    if( RC.Game.is_Pause_Resume_Available === true) {
        RC.pause_resume();
    }
});

//===========================================================================
$("#Pause").click(function () {
   
    RC.stop_the_game();
});
$("#Resume").click(function () {
    
    RC.Game.game_over = false;
    RC.Game.animID = requestAnimationFrame(repeat);
});

$('#newStart2, #start ').click(function () {

    RC.Game.start_div.css("display","none")

    
    $('#Check').removeClass( "Paused" ).addClass( "unPaused" );
    RC.Game.is_Pause_Resume_Available = true;


    RC.stop_the_game();

    RC.car_down3(RC.car, 438, 423);
    RC.car_down3(RC.car_1, -80, randomNum(910));
    RC.car_down3(RC.car_2, -160, randomNum(910));
    RC.car_down3(RC.car_3, -240, randomNum(910));
    RC.car_down3(RC.car_4, -320, randomNum(910));
    RC.car_down3(RC.car_5, -400, randomNum(910));
    RC.car_down3(RC.car_6, -480, randomNum(910));
    RC.car_down3(RC.car_7, -560, randomNum(910));
    RC.car_down3(RC.car_8, -640, randomNum(910));
    RC.car_down3(RC.car_9, -720, randomNum(910));


    RC.Game.game_over = false;

    RC.Game.score_counter = 1;

    RC.Game.speed = 2;
    RC.Game.line_speed = 5;
   
    RC.Game.my_score = 0;
    
    RC.Game.animID = requestAnimationFrame(repeat);
   
    });

    function randomNum(_size) {
      return  Math.floor(Math.random() * _size) + 1  
    }

RC.stop_the_game = function () {
    
    RC.Game.game_over = true;
    cancelAnimationFrame(RC.Game.animID);
    cancelAnimationFrame(RC.Move.right);
    cancelAnimationFrame(RC.Move.left);
    cancelAnimationFrame(RC.Move.up);
    cancelAnimationFrame(RC.Move.down);

}

//=============================== GAME CODE ENDS HERE =================================

RC.collision = function ($div1, $div2) {
    let x1 = $div1.offset().left;
    let y1 = $div1.offset().top;
    let h1 = $div1.outerHeight(true);
    let w1 = $div1.outerWidth(true);
    let b1 = y1 + h1;
    let r1 = x1 + w1;
    let x2 = $div2.offset().left;
    let y2 = $div2.offset().top;
    let h2 = $div2.outerHeight(true);
    let w2 = $div2.outerWidth(true);
    let b2 = y2 + h2;
    let r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}



//==================================================================================================

$('#BackToMainManu, #BackToMainPage').click(function () {
    window.location.href = "../../main.html";
});

//==================================================================================================
$('#Test').click(function () {
    $.ajax({
        url: 'Test',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '
                + sessionStorage.getItem("accessToken")
        },
        success: function (data) {
            alert(data);
            console.log(data)
        },
        error: function (jQXHR) {
        }
    });
});





$('#CarsEndGameUpdate').click(function () {
    CarGameEndGameUpdate(6, 1500);
});

function CarGameEndGameUpdate(_exp, _score) {

    myData = {
        experiance: _exp,
        bestscore: _score
    }

    $.ajax({
        url: 'CarGameEndGameUpdate',
        method: 'POST', 
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer '
                + sessionStorage.getItem("accessToken")
        },
        dataType: 'json',
        data: JSON.stringify(myData),
     
        success: function (data) {
            console.log(data);
            // changeDivWidth(data.perc)
        },
        error: function (jQXHR) {
            console.log(jQXHR);
        }
    });


}