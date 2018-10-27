$(() => {

if (sessionStorage.getItem('accessToken') === null) {
    window.location.href = "Login.html";
}

$('#userNameDropdown').text(sessionStorage.getItem('userName'));

$('#btnLogoff').click(function () {
    sessionStorage.removeItem('accessToken');
    window.location.href = "../Login.html";
  });

//===================================================================

let paramOne = 0;
let forNext = 0;

let haha = 0;
let sorting = "none";
let searchTerm = "";


GetTheScoreBoardData();



$('#carSort').click(function () {
    $("#search").val("");
    searchTerm = "";
    paramOne = 0;
    sorting = "car";
    GetTheScoreBoardData(paramOne, sorting); 
});


$('#pacSort').click(function () {
    $("#search").val("");
    searchTerm = "";
    paramOne = 0;
    sorting = "pacman";
    GetTheScoreBoardData(paramOne, sorting); 
});


$('#ReputationSort').click(function () {
    $("#search").val("");
    searchTerm = "";
    paramOne = 0;
    sorting = "reputation";
    GetTheScoreBoardData(paramOne, sorting); 
});


$('#NameSort').click(function () {
    $("#search").val("");
    searchTerm = "";
    paramOne = 0;
    sorting = "name";
    GetTheScoreBoardData(paramOne, sorting); 
});

$(document).on('input', "#search", function () {
    paramOne = 0;
    searchTerm = $("#search").val();
    GetTheScoreBoardData(paramOne, sorting, searchTerm);
});


$('#nextBtn').click(function () {
    if (forNext > 15) {

        paramOne += 15;
        GetTheScoreBoardData(paramOne, sorting, searchTerm);
        }

});


$('#prevBtn').click(function () {
    if (paramOne !== 0) {
        paramOne -= 15;
        GetTheScoreBoardData(paramOne, sorting, searchTerm);
    }
  
});


function GetTheScoreBoardData(_id = 0, _sort = "", _search = "") {

        myData = {
            sort: _sort,
            search: _search
        }

    $.ajax({
        url: "ScoreBoardTable" + "?id=" + _id,
        method: 'POST', 
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer '
                + sessionStorage.getItem("accessToken")
        },
        dataType: 'json',
        data: JSON.stringify(myData),
        success: function (data) {
            makeMyTable(data);
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}


function makeMyTable(data) {
    $("#tBody").html("");
    forNext = data.length;
    let endIndex;

    if (forNext === 16) { endIndex = data.length - 1 }
    else { endIndex = data.length }

    for (let index = 0; index < endIndex; index++) {

        $("#tBody").append(
            "<tr>" +
            "<td class='td-Name' >" + data[index].Name + "</td>" +
            "<td class='td-Rep' >" + data[index].Reputation + "</td>" +
            "<td class='td-Lvl' >" + data[index].Level + "</td>" +
            "<td class='td-CarScore'>" + data[index].CarBestScore + "</td>" +
            "<td class='td-PacManScore'>" + data[index].PacManBestScore + "</td>" +

            "</tr>");
    }
}
//===================================================================

// ForTestingPurposes
// GetScoreBoardInfo();

function GetScoreBoardInfo() {
        $.ajax({
            url: 'ScoreBoardInfo',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '
                    + sessionStorage.getItem("accessToken")
            },
            success: function (data) {
                //alert(data);
                console.log(data);
            },
            error: function (jQXHR) {
            }
        });
  
}

}); // end of jQuery(document).ready(function()