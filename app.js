var context;
var context2;
var shape = new Object();
var glowObject = new Object();
var board;
var board2;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var interval2;
var interval3;
//ido added
var List = new Array();
var personP = { userName: "p", password: "p", fullName: "p.p", email: "p@gmai.com", date: "11/9/93" };
List.push(personP);
///
var myImage = new Image();
var cherry = new Image();
myImage.src = 'pacManRight.png';
cherry.src = 'cherry.png';

var glow = new Image();
glow.src = 'glow.gif';

////vars for the game
var food_current = -1;
var foodNum = 0;
var fiveFoodColor;
var fifteenFoodColor;
var twentyFiveFoodColor;
var fiveFood;
var fifteenFood;
var twentyFiveFood;
var timeLimit = 60;
var monsterAmount = 1;
var lives = 5;
sessionStorage.setItem("leftKey","37");
sessionStorage.setItem("upKey","38");
sessionStorage.setItem("rightKey","39");
sessionStorage.setItem("downKey","40");
var leftKey = 37;
var upKey = 38;
var rightKey = 39;
var downKey = 40;




$(document).ready(function () {
	var c1 = document.getElementById('canvas')
	context = c1.getContext("2d");
	var c2 = document.getElementById('canvas2');
  	context2 = c2.getContext("2d");


	//Start the PakMan game
	Initialize();
	/* 	var personP = { userName: "p", password: "p" ,fullName:"p.p",email:"p@gmai.com",date:"11/9/93" }
		List.push(personP);
		document.getElementById("Login").style.display = 'none';
		document.getElementById("Register").style.display = 'none';
		document.getElementById("Preferences").style.display = 'none';
		document.getElementById("Welcome").style.display = 'none';
	 */
	//Register();

	//Start();
});

function Initialize() {
	document.getElementById("Welcome").style.display = 'block';
	document.getElementById("score").style.display = 'none';
	document.getElementById("lives").style.display = 'none';
	document.getElementById("time").style.display = 'none';
	document.getElementById("game").style.display = 'none';
	document.getElementById("Login").style.display = 'none';
	document.getElementById("Register").style.display = 'none';
	document.getElementById("Preferences").style.display = 'none';
	var personP = { userName: "p", password: "p", fullName: "p.p", email: "p@gmai.com", date: "11/9/93" }
	List.push(personP);
}

function Welcome() {
	var x = document.getElementById("Welcome");
	if (x.style.display === "none") {
		x.style.display = "block";
		document.getElementById("score").style.display = 'none';
		document.getElementById("lives").style.display = 'none';
		document.getElementById("time").style.display = 'none';
		document.getElementById("game").style.display = 'none';
		document.getElementById("Login").style.display = 'none';
		document.getElementById("Register").style.display = 'none';
		document.getElementById("Preferences").style.display = 'none';
		//} else {
		//	x.style.display = "none";
	}
}

function Register() {

	var x = document.getElementById("Register");
	//if (x.style.display === "none") {
	x.style.display = "block";
	document.getElementById("Welcome").style.display = 'none';
	document.getElementById("Login").style.display = 'none';
	document.getElementById("score").style.display = 'none';
	document.getElementById("lives").style.display = 'none';
	document.getElementById("time").style.display = 'none';
	document.getElementById("game").style.display = 'none';

}
function tryRegister() {


}

function Login() {
	var x = document.getElementById("Login");
	//if (x.style.display === "none") {
	x.style.display = "block";
	if(	document.getElementById("Welcome").style.display != 'none'){
	document.getElementById("Welcome").style.display = 'none';
	}
	if(	document.getElementById("Register").style.display != 'none'){
	document.getElementById("Register").style.display = 'none';
	}
	/**
	document.getElementById("score").style.display = 'none';
	document.getElementById("time").style.display = 'none';
	document.getElementById("game").style.display = 'none';
	 */
}

function tryToLog() {
	var userN = $('#Login').find('input[name="UserNameLog"]').val();
	var UserP = $('#Login').find('input[name="PasswordLog"]').val();

	//var userN = document.getElementById("UserNameLog").value;
	//var UserP = document.getElementById("PasswordLog").value;
	if (userN == "" || UserP == "" || userN == null || UserP == null) {
		alert("please fill the missing fileds");
		$('#Login').find('input[name="UserNameLog"]').val("");
		$('#Login').find('input[name="PasswordLog"]').val("");
	} else {
		for (var i = 0; i < List.length; i++) {
			if (List[i].userName == userN && List[i].password == UserP) {
				showPreferences();
			} else {
				alert("please enter correct User-name/Password");
				$('#Login').find('input[name="UserNameLog"]').val("");
				$('#Login').find('input[name="PasswordLog"]').val("");
			}
		}
	}
}
function showPreferences() {
		//clear the screen 
		var x = document.getElementById("Preferences");
		if(x.style.display=='none'){
			document.getElementById("Preferences").style.display = 'block';

		}
		var Welcome = document.getElementById("Welcome");
		var Login = document.getElementById("Login");
		var Register = document.getElementById("Register");

		if(Welcome.style.display =='block'){
			Welcome.style.display = 'none'
		}if(Login.style.display =='block'){
			Login.style.display = 'none'
		}if(Register.style.display =='block'){
			Register.style.display = 'none'
		}
		/*
		document.getElementById("Preferences").style.display = 'block';
		document.getElementById("Welcome").style.display = 'none';
		document.getElementById("Login").style.display = 'none';
		document.getElementById("Register").style.display = 'none';
		*/
}
function preferences() {

	foodNum = $('#Preferences').find('input[name="PelletsNum"]').val();
	fiveFoodColor = $('#Preferences').find('input[name="fivePellet"]').val();
	fifteenFoodColor = $('#Preferences').find('input[name="fifteenPellet"]').val();
	twentyFiveFoodColor = $('#Preferences').find('input[name="twentyfivePellet"]').val();
	timeLimit = $('#Preferences').find('input[name="timeLimit"]').val();
	monsterAmount = $('#Preferences').find('input[name="monsterAmount"]').val();
	if (foodNum == "" || fiveFoodColor == "" || fifteenFoodColor == ""||twentyFiveFoodColor =="" || timeLimit == "" || monsterAmount == "") {
		alert("please enter all of the missing details");
	} else {
		StartGame();
	}
	
}

function RandomValues() {
	foodNum = getRandomInt(50, 90);
	$('#Preferences').find('input[name="PelletsNum"]').val(foodNum);
	fiveFoodColor = getRandomColor;
	$('#Preferences').find('input[name="fivePellet"]').val(fiveFoodColor);
	fifteenFoodColor = getRandomColor;
	$('#Preferences').find('input[name="fifteenPellet"]').val(fifteenFoodColor);
	twentyFiveFoodColor = getRandomColor;
	$('#Preferences').find('input[name="twentyfivePellet"]').val(twentyFiveFoodColor);
	timeLimit = getRandomInt(60, 1000);
	$('#Preferences').find('input[name="timeLimit"]').val(timeLimit);
	monsterAmount = getRandomInt(1, 4);
	$('#Preferences').find('input[name="monsterAmount"]').val(monsterAmount);
}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function setRandomColor() {
	$("#colorpad").css("background-color", getRandomColor());
}

function functionUpKey(event) {
	upKey = event.which || event.keyCode;
	sessionStorage.setItem("upKey",upKey.toString());
}
function functionDownKey(event) {
	downKey = event.which || event.keyCode;
	sessionStorage.setItem("downKey",downKey.toString());

}
function functionLeftKey(event) {
	leftKey = event.which || event.keyCode;
	sessionStorage.setItem("leftKey",leftKey.toString());

}
function functionRightKey(event) {
	rightKey = event.which || event.keyCode;
	sessionStorage.setItem("rightKey",rightKey.toString());

}

function StartGame() {
	document.getElementById("Welcome").style.display = 'none';
	document.getElementById("Login").style.display = 'none';
	document.getElementById("Register").style.display = 'none';
	document.getElementById("Preferences").style.display = 'none';
	document.getElementById("score").style.display = 'block';
	document.getElementById("lives").style.display = 'block';
	document.getElementById("time").style.display = 'block';
	document.getElementById("game").style.display = 'block';
	Start();
}

/**
 * this is the original function 
 */
function Start() {
	board = new Array();
	board2 = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 400;
	food_current=0;
	var food_remain = foodNum;
	var pacman_remain = 1;	
	start_time = new Date();
	fiveFood= {value:5,frequency:0.6, amount:0};
	fiveFood.currentPercent = 0-fiveFood.frequency;
	fifteenFood = {value:15,frequency:0.3, amount:0};
	fifteenFood.currentPercent = 0-fifteenFood.frequency;
	twentyFiveFood = {value:25,frequency:0.1, amount:0};
	twentyFiveFood.currentPercent = 0-twentyFiveFood.frequency;

	let foodArray = [fiveFood,fifteenFood,twentyFiveFood];
	for (var i = 0; i < 20; i++) {
		board[i] = new Array();
		board2[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 20; j++) {
			if (
				((i==0 || j==0 || i==19 || j==19) && (j!=9) && (j!=10)) ||
				((j==8) && (i==0 ||i==1 ||i==2 || i==3)) ||
				((j==8) && (i==19 ||i==18 ||i==17 || i==16)) ||
				((j==11) && (i==0 ||i==1 ||i==2 || i==3) ) ||
				((j==11) && (i==19 ||i==18 ||i==17 ||i==16) ) ||
				(((j>=3) && (j<=5)) && ((i>=3) && (i<=5))) ||
				(((j>=14) && (j<=16)) && ((i>=14) && (i<=16))) ||
				(((j>=3) && (j<=5)) && ((i>=14) && (i<=16))) ||
				(((j>=14) && (j<=16)) && ((i>=3) && (i<=5))) ||
				(((i>=9) && (i<=10)) && ((j>=4) && (j<=7))) ||
				(((i>=9) && (i<=10)) && ((j>=12) && (j<=15)))

				) {
				board[i][j] = 4;
				board2[i][j] = 4;
			}

			 else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = foodDistribution(foodArray);
					board2[i][j] = 0;
					food_current++;
					updateFrequency(food_current);
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
					board2[i][j] = 2;
				} else {
					board[i][j] = 0;
					board2[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = foodDistribution(foodArray);
		board2[emptyCell[0]][emptyCell[1]] = 0;
		food_remain--;
		food_current++;
		updateFrequency(food_current)
	}

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);

	$(document).ready(function(){
		interval = setInterval(UpdatePosition, 100);
		interval2 = setInterval(putCherry, 7000);
		interval3 = setInterval(putGlow, 10000);
	})

}

function putGlow(){
	//remove previous cherry
	let hasGlow= false;
	for(var i =0;i<20;i++){
		for(var j=0;j<20;j++){
			if(board2[i][j]==50){
				hasGlow = true;
			}
		}
	}
	if(hasGlow==false){
		var emptyCell = findRandomEmptyCell(board);
		board2[emptyCell[0]][emptyCell[1]] = 50;
		glowObject.i = emptyCell[0];
		glowObject.j = emptyCell[1];
	}

}

function putCherry(){
	//remove previous cherry
	let hasCherry= false;
	for(var i =0;i<20;i++){
		for(var j=0;j<20;j++){
			if(board[i][j]==100){
				board[i][j] =0;
				hasCherry = true;
			}
		}
	}
	if(hasCherry==false){
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 100;
	}

}

function foodDistribution(foodArray){
	//let foodPercent = [5:foodArray[fiveFoodColor].currentPercent, 15:foodArray[fifteenFoodColor].currentPercent,25:foodArray[twentyFiveFoodColor].currentPercent];
	foodArray.sort(function(a,b){return a.currentPercent-b.currentPercent});
	foodArray[0].amount++;
	return foodArray[0].value;

}

function updateFrequency(){
	fiveFood.currentPercent = (fiveFood.amount/food_current)-fiveFood.frequency;
	fifteenFood.currentPercent = (fifteenFood.amount/food_current)-fifteenFood.frequency;
	twentyFiveFood.currentPercent = (twentyFiveFood.amount/food_current)-twentyFiveFood.frequency;


}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[upKey]) {
		myImage.src = 'pacManUp.png';
		return 1;
	}
	if (keysDown[downKey]) {
		myImage.src ='pacManDown.png';
		return 2;
	}
	if (keysDown[leftKey]) {
		myImage.src ='pacManLeft.png';
		return 3;
	}
	if (keysDown[rightKey]) {
		myImage.src ='pacManRight.png';
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	canvas2.width = canvas2.width;
	lblScore.value = score;
	lblLives.value = lives;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			var center = new Object();
			center.x = i * 30 + 15;
			center.y = j * 30 + 15;
			if (board[i][j] == 2) {
				context.drawImage(myImage,center.x-15,center.y-15,35,35);
				/*
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
				*/
			} if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = fiveFoodColor; //color
				context.fill();
			} if (board[i][j] == 15) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = fifteenFoodColor; //color
				context.fill();
			} if (board[i][j] == 25) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = twentyFiveFoodColor; //color
				context.fill();
			} if (board[i][j] == 100) {
				context.drawImage(cherry,center.x-15,center.y-15,30,30);
			} if (board2[i][j] == 50) {
				context.drawImage(glow,center.x-15,center.y-15,30,30);
			} if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 15, center.y -15, 30, 30);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	
	var x = GetKeyPressed();
	moveObject(x,shape);
	

	if (board[shape.i][shape.j] == 5) {
		score= score+5;
		food_current--;
	}
	if (board[shape.i][shape.j] == 15) {
		score=score+15;
		food_current--;
	}
	if (board[shape.i][shape.j] == 25) {
		score=score +25;
		food_current--;
	}
	if (board[shape.i][shape.j] == 100) {
		score=score +100;
	}

	board[shape.i][shape.j] = 2; // update pacman position

	if(!isEmpty(glowObject)){
		let iGlow = glowObject.i;
		let jGlow = glowObject.j;

		board2[iGlow][jGlow] = 0;
		let glowMove = getRandomInt(1,4); 
		moveObject(glowMove,glowObject);

		
		if(shape.i == glowObject.i && shape.j == glowObject.j){
			board2[glowObject.i][glowObject.j] = 2;
			score = score +50;
			glowObject = new Object();
		}
		else{
			board2[glowObject.i][glowObject.j] = 50; // update pacman position
		}

	}


	var currentTime = new Date();
	time_elapsed = ((timeLimit*1000)-(currentTime - start_time)) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (food_current == 0 || time_elapsed<=0) {
		Draw();
		window.clearInterval(interval);
		window.clearInterval(interval2);
		window.clearInterval(interval3);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

function moveObject(x,obj){
	if (x == 1) {
		if (obj.j > 0 && board[obj.i][obj.j - 1] != 4) {
			obj.j--;
		}
	}
	if (x == 2) {
		if (obj.j < 19 && board[obj.i][obj.j + 1] != 4) {
			obj.j++;
		}
	}
	if (x == 3) {
		if (obj.i > 0 && board[obj.i - 1][obj.j] != 4) {
			obj.i--;
		}
	}
	if (x == 4) {
		if (obj.i < 19 && board[obj.i + 1][obj.j] != 4) {
			obj.i++;
		}
	}
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}