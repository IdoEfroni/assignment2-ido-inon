var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
//ido added
var List = new Array();
var personP = { userName: "p", password: "p", firstName: "p", lastName: "p", email: "p@gmai.com", date: "11/9/93" };
List.push(personP);
///
var myImage = new Image();
myImage.src = 'pacManRight.png';

////vars for the game
var foodNum = 0;
var fiveFoodColor;
var fifteenFoodColor;
var twentyFiveFoodColor;
var timeLimit = 60;
var monsterAmount = 1;
sessionStorage.setItem("leftKey", "37");
sessionStorage.setItem("upKey", "38");
sessionStorage.setItem("rightKey", "39");
sessionStorage.setItem("downKey", "40");
var leftKey = 37;
var upKey = 38;
var rightKey = 39;
var downKey = 40;

$(document).ready(function () {
	context = canvas.getContext("2d");
	//Start the PakMan game
	//Initialize();
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

$(document).on("click", "container",function(event) {
	$(this).hide(); // hide when clicked
	$('.modal-backdrop').hide();
	$('container').hide();

  });

//close about on escape key
$(document).keydown(function(e) {
	var code = e.keyCode || e.which;
	if (code == 27){
		 $("#myModal").hide();
		 $('.modal-backdrop').hide();
	}
  });

 
  
function Initialize() {
	document.getElementById("Welcome").style.display = 'block';
	document.getElementById("score").style.display = 'none';
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
	document.getElementById("time").style.display = 'none';
	document.getElementById("game").style.display = 'none';

	$("#commentForm").submit(function (e) {
		e.preventDefault();
		validation();
	})

}
function validation() {
	var UserNameR = $('#Register').find('input[name="UserName"]').val();
	var cemail = $('#Register').find('input[name="email"]').val();
	var Password = $('#Register').find('input[name="Password"]').val();
	var firstName = $('#Register').find('input[name="firstName"]').val();
	var SecondName = $('#Register').find('input[name="SecondName"]').val();
	var BirthDate = $('#Register').find('input[name="BirthDate"]').val();
	var letters = /^[0-9a-zA-Z]+$/;
	var tempPerson = { userName: UserNameR, password: Password, firstName: firstName, lastName: SecondName, email: cemail, date: BirthDate };
	if (UserName == "" || cemail == "" || Password == "" || firstName == "" ||
		SecondName == "" || BirthDate == "") {
		return false;
	} else if (!document.getElementById("Password").value.match(letters)) {
		alert("please enter correct password that contain only number and letters");
		return false;
	} else if (isAlpha(firstName) == false) {
		alert("please enter correct first name");
		return false;

	} else if (isAlpha(SecondName) == false) {
		alert("please enter correct last name");
		return false;
	}
	else if (isInSystem(UserNameR) == false) {
		alert("user Name alrady exist");
		return false;
	}else{
	List.push(tempPerson);
	Login();
	}
}

function isInSystem(str) {
	for (var i = 0; i < List.length; i++) {
		if (List[i].userName == str) {
			return false;
		}
	}
	return true;
}

function isAlpha(str) {
	var code, i, len;
	for (i = 0, len = str.length; i < len; i++) {
		code = str.charCodeAt(i);
		if (!(code > 64 && code < 91) && !(code > 96 && code < 123)) { // lower alpha (a-z)
			return false;
		}
	}
	return true;
}

function Login() {

	if (document.getElementById("Login").style.display === "none") {
		document.getElementById("Login").style.display = 'block';
	}
	if (document.getElementById("Welcome").style.display != 'none') {
		document.getElementById("Welcome").style.display = 'none';
	}
	if (document.getElementById("Register").style.display != 'none') {
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
	var userP = $('#Login').find('input[name="PasswordLog"]').val();

	//var userN = document.getElementById("UserNameLog").value;
	//var UserP = document.getElementById("PasswordLog").value;
	if (userN == "" || userP == "" || userN == null || userP == null) {
		alert("please fill the missing fileds");
		$('#Login').find('input[name="UserNameLog"]').val("");
		$('#Login').find('input[name="PasswordLog"]').val("");
		return false;
	} else {
		for (var i = 0; i < List.length; i++) {
			if (List[i].userName == userN && List[i].password == userP) {
				showPreferences();
				return true;
			}
		}
		alert("please enter correct User-name/Password");
			$('#Login').find('input[name="UserNameLog"]').val("");
			$('#Login').find('input[name="PasswordLog"]').val("");
			return false;
	}
}
function showPreferences() {
	//clear the screen 
	var x = document.getElementById("Preferences");
	if (x.style.display == 'none') {
		document.getElementById("Preferences").style.display = 'block';

	}
	var Welcome = document.getElementById("Welcome");
	var Login = document.getElementById("Login");
	var Register = document.getElementById("Register");

	if (Welcome.style.display == 'block') {
		Welcome.style.display = 'none'
	} if (Login.style.display == 'block') {
		Login.style.display = 'none'
	} if (Register.style.display == 'block') {
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
	if (foodNum == "" || fiveFoodColor == "" || fifteenFoodColor == "" || timeLimit == "" || monsterAmount == "") {
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
	sessionStorage.setItem("upKey", upKey.toString());
}
function functionDownKey(event) {
	downKey = event.which || event.keyCode;
	sessionStorage.setItem("downKey", downKey.toString());

}
function functionLeftKey(event) {
	leftKey = event.which || event.keyCode;
	sessionStorage.setItem("leftKey", leftKey.toString());

}
function functionRightKey(event) {
	rightKey = event.which || event.keyCode;
	sessionStorage.setItem("rightKey", rightKey.toString());

}

function StartGame() {
	document.getElementById("Welcome").style.display = 'none';
	document.getElementById("Login").style.display = 'none';
	document.getElementById("Register").style.display = 'none';
	document.getElementById("Preferences").style.display = 'none';
	document.getElementById("score").style.display = 'block';
	document.getElementById("time").style.display = 'block';
	document.getElementById("game").style.display = 'block';
	Start();
}

/**
 * this is the original function 
 */
function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
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
	if (keysDown[38]) {
		myImage.src = 'pacManUp.png';
		return 1;
	}
	if (keysDown[40]) {
		myImage.src = 'pacManDown.png';
		return 2;
	}
	if (keysDown[37]) {
		myImage.src = 'pacManLeft.png';
		return 3;
	}
	if (keysDown[39]) {
		myImage.src = 'pacManRight.png';
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.drawImage(myImage, center.x - 30, center.y - 30, 60, 60);
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
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}













