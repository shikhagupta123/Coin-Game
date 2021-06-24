var one = prompt("Player one: Enter your name: You will be BLUE: ");
var oneColor = 'rgb(255, 0, 0)';
var two = prompt("Player two: Enter your name: You will be RED: ");
var twoColor = 'rgb(0, 0, 255)';
var game_on = true;
var table = $('table tr');


function changeColor(rowIndex,colIndex,color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function returnColor(rowIndex,colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
  var colorReport = returnColor(5,colIndex);
  for(var row =5;row>=0;row--){
    colorReport = returnColor(row,colIndex);
    if(colorReport==='rgb(128, 128, 128)'){
      return row;
    }
  }
}
function colorMatchCheck(i,ii,iii,iv){
  return (i===ii && i===iii && i===iv && i!=='rgb(128, 128, 128)' && i!==undefined);
}

function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        return true;
      }else {
        continue;
      }
    }
  }
}



var currentPlayer = 1;
var currentName = one;
var currentColor = oneColor;

$('h3').text(currentName+" it is your turn, please pick a column to drop your chip.");

$(".board button").on("click",function(){


  var col = $(this).closest('td').index();

  var bottomAvail = checkBottom(col);

  changeColor(bottomAvail,col,currentColor);

  if(horizontalWinCheck()||verticalWinCheck()||diagonalWinCheck()){
    $("h1").text(currentName+" you win the game!!");
    $("h1").css("color","green");
    $("h2").fadeOut("fast");
    $("h3").fadeOut("fast");
    $("table").fadeOut("fast");
  }

  currentPlayer = currentPlayer*-1;
  if(currentPlayer===1){
    currentName = one;
    currentColor = oneColor;
    $('h3').text(currentName+" it is your turn, please pick a column to drop your chip.");
  }else{
    currentName = two;
    currentColor = twoColor;
    $('h3').text(currentName+" it is your turn, please pick a column to drop your chip.");
  }


})
