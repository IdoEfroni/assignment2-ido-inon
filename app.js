var context;
var context2;
//objects
var shape = new Object();
var glowObject = new Object();


var ghosts;


var board;
var board2;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval = null;
var interval2;
var interval3;
var interval4;
var song;
//ido added
var List = new Array();
var personP = { userName: "p", password: "p", firstName: "p", lastName: "p", email: "p@gmai.com", date: "11/9/93" };
List.push(personP);

//characters
var myImage = new Image();
myImage.src = 'pacManRight.png';

var cherry = new Image();
cherry.src = 'cherry.png';
var glow = new Image();
glow.src = 'glow.gif';

var ghost1Img = new Image();
ghost1Img.src = 'ghost1.png';
var ghost2Img = new Image();
ghost2Img.src = 'ghost2.png';
var ghost3Img = new Image();
ghost3Img.src = 'ghost3.png';
var ghost4Img = new Image();
ghost4Img.src = 'ghost4.png';

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
sessionStorage.setItem("leftKey", "37");
sessionStorage.setItem("upKey", "38");
sessionStorage.setItem("rightKey", "39");
sessionStorage.setItem("downKey", "40");
var leftKey = 37;
var upKey = 38;
var rightKey = 39;
var downKey = 40;

$(document).ready(function () {
	var c1 = document.getElementById('canvas')
	context = c1.getContext("2d");
	var c2 = document.getElementById('canvas2');
	context2 = c2.getContext("2d");

	$("#preferencesForm").submit(function (e) {
		e.preventDefault();
		preferences();
	});

	$("#commentForm").submit(function (e) {
		e.preventDefault();
		validation();
	})

	//Start the PakMan game
	Initialize();
});

$(document).on("click", "container", function (event) {
	$(this).hide(); // hide when clicked
	$('.modal-backdrop').hide();
	$('container').hide();

});

//close about on escape key
$(document).keydown(function (e) {
	var code = e.keyCode || e.which;
	if (code == 27) {
		$("#myModal").hide();
		$('.modal-backdrop').hide();
	}
});



/**
 * this function initialize the divs screen and display the welcome screen 
 *
 */
function Initialize() {
	document.getElementById("Welcome").style.display = 'block';
	document.getElementById("score").style.display = 'none';
	document.getElementById("lives").style.display = 'none';
	document.getElementById("time").style.display = 'none';
	document.getElementById("game").style.display = 'none';
	document.getElementById("newGame").style.display = 'none';
	document.getElementById("Login").style.display = 'none';
	document.getElementById("Register").style.display = 'none';
	document.getElementById("Preferences").style.display = 'none';
	document.getElementById("gameDetails").style.display = 'none';

	//var personP = { userName: "p", password: "p", fullName: "p.p", email: "p@gmai.com", date: "11/9/93" }
	//List.push(personP);
}
/**
 * this function displat the welcome screen 
 */
function Welcome() {
	var x = document.getElementById("Welcome");
	if (x.style.display === "none") {
		x.style.display = "block";
		document.getElementById("score").style.display = 'none';
		document.getElementById("lives").style.display = 'none';
		document.getElementById("time").style.display = 'none';
		document.getElementById("game").style.display = 'none';
		document.getElementById("newGame").style.display = 'none';
		document.getElementById("Login").style.display = 'none';
		document.getElementById("Register").style.display = 'none';
		document.getElementById("Preferences").style.display = 'none';
		document.getElementById("gameDetails").style.display = 'none';

		//} else {
		//	x.style.display = "none";
	}
}
/**
 * this function open the registration form div 
 */
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
	document.getElementById("newGame").style.display = 'none';
	document.getElementById("Preferences").style.display = 'none';
	document.getElementById("gameDetails").style.display = 'none';


}
/**
 * this function validate the registration form details 
 */
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
	} else {
		List.push(tempPerson);
		Login();
	}
}
/**
 * this function verify if the user is in the system 
 * @param {*} str 
 */
function isInSystem(str) {
	for (var i = 0; i < List.length; i++) {
		if (List[i].userName == str) {
			return false;
		}
	}
	return true;
}
/**
 * this function verify if the string contain only letters in the alfa bet
 * @param {*} str 
 */
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
/**
 * this function display the login div
 */
function Login() {
	if (document.getElementById("Login").style.display === "none") {
		document.getElementById("Login").style.display = 'block';
	}
	if (document.getElementById("Welcome").style.display != 'none') {
		document.getElementById("Welcome").style.display = 'none';
	}
	if (document.getElementById("Register").style.display == 'block') {
		document.getElementById("Register").style.display = 'none';
	}
	if (document.getElementById("Preferences").style.display == 'block') {
		document.getElementById("Preferences").style.display = 'none';
	}
	document.getElementById("gameDetails").style.display = 'none';

	$("#LoginForm").submit(function (e) {
		e.preventDefault();
	})
	/**
	document.getElementById("score").style.display = 'none';
	document.getElementById("time").style.display = 'none';
	document.getElementById("game").style.display = 'none';
	 */
}
/**
 * thid function verify the user details when the user try to log in
 */
function tryToLog() {
	var userN = $('#Login').find('input[name="UserNameLog"]').val();
	var userP = $('#Login').find('input[name="PasswordLog"]').val();
	if (userN == "" || userP == "" || userN == null || userP == null) {
		alert("please fill the missing fileds");
		$('#Login').find('input[name="UserNameLog"]').val("");
		$('#Login').find('input[name="PasswordLog"]').val("");
		return false;
	} else {
		for (var i = 0; i < List.length; i++) {
			if (List[i].userName == userN && List[i].password == userP) {
				$('#gameDetails').find('output[name="displayUserName"]').val(userN);
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


/**
 * this function show the preferences div
 */
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

	document.getElementById("score").style.display = 'none';
	document.getElementById("time").style.display = 'none';
	document.getElementById("lives").style.display = 'none';
	document.getElementById("game").style.display = 'none';


}
/**
 * this function set the details of the preferences form in the global veriable of the game
 */
function preferences() {

	foodNum = $('#Preferences').find('input[name="PelletsNumInputName"]').val();
	fiveFoodColor = $('#Preferences').find('input[name="fivePellet"]').val();
	fifteenFoodColor = $('#Preferences').find('input[name="fifteenPellet"]').val();
	twentyFiveFoodColor = $('#Preferences').find('input[name="twentyfivePellet"]').val();
	timeLimit = $('#Preferences').find('input[name="timeLimit"]').val();
	monsterAmount = $('#Preferences').find('input[name="monsterInputName"]').val();
	if (foodNum == "" || fiveFoodColor == "" || fifteenFoodColor == "" || twentyFiveFoodColor == "" || timeLimit == "" || monsterAmount == "") {
		alert("please enter all of the missing details");
	} else {
		if (upKey!=38) {
			$('#gameDetails').find('output[name="displayUpKey"]').val(String.fromCharCode((96 <= upKey && upKey <= 105) ? upKey - 48 : upKey));
		} if (downKey!=40) {
			$('#gameDetails').find('output[name="displayDownKey"]').val(String.fromCharCode((96 <= downKey && downKey <= 105) ? downKey - 48 : downKey));
		} if (rightKey!=39) {
			$('#gameDetails').find('output[name="displayRighthKey"]').val(String.fromCharCode((96 <= rightKey && rightKey <= 105) ? rightKey - 48 : rightKey));
		} if (leftKey!=37) {
			$('#gameDetails').find('output[name="displayLeftKey"]').val(String.fromCharCode((96 <= leftKey && leftKey <= 105) ? leftKey - 48 : leftKey));
		}
		$('#gameDetails').find('output[name="displayPelletsNum"]').val(foodNum);
		$('#gameDetails').find('input[name="displayFivePellet"]').val(fiveFoodColor);
		$('#gameDetails').find('input[name="displayFifteenPellet"]').val(fifteenFoodColor);
		$('#gameDetails').find('input[name="displayTwentyfivePellet"]').val(twentyFiveFoodColor);
		$('#gameDetails').find('output[name="displayTimeLimit"]').val(timeLimit);
		$('#gameDetails').find('output[name="displayMonsters"]').val(monsterAmount);
		StartGame();
	}

}
/**
 * this function randomaize the values in the preferece form 
 */
function RandomValues() {
	foodNum = getRandomInt(50, 90);
	$('#Preferences').find('input[name="PelletsNumInputName"]').val(foodNum);
	$('#Preferences').find('output[name="PelletsNumOutPutName"]').val(foodNum);
	fiveFoodColor = getRandomColor;
	$('#Preferences').find('input[name="fivePellet"]').val(fiveFoodColor);
	fifteenFoodColor = getRandomColor;
	$('#Preferences').find('input[name="fifteenPellet"]').val(fifteenFoodColor);
	twentyFiveFoodColor = getRandomColor;
	$('#Preferences').find('input[name="twentyfivePellet"]').val(twentyFiveFoodColor);
	timeLimit = getRandomInt(60, 1000);
	$('#Preferences').find('input[name="timeLimit"]').val(timeLimit);
	monsterAmount = getRandomInt(1, 4);
	$('#Preferences').find('input[name="monsterInputName"]').val(monsterAmount);
	$('#Preferences').find('output[name="monsterOutPutName"]').val(monsterAmount);
}
/**
 * this function randomize a random number according to the min and max allowed values 
 * @param {the min value} min 
 * @param {the max value} max 
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * this function get a random color
 */
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
/** 
function setRandomColor() {
	$("#colorpad").css("background-color", getRandomColor());
}
*/
/**
 * this function set the up key press 
 * @param {*} event 
 */
function functionUpKey() {
	upKey = event.keyCode;
	//sessionStorage.setItem("upKey", upKey.toString());
}
/**
 * this function set the down key press 
 * @param {*} event 
 */
function functionDownKey() {
	downKey = event.keyCode;
	//sessionStorage.setItem("downKey", downKey.toString());
}
/**
 * this function set the left key press 
 * @param {*} event 
 */
function functionLeftKey() {
	leftKey = event.keyCode;
	//sessionStorage.setItem("leftKey", leftKey.toString());
}
/**
 * this function set the right key prees 
 * @param {*} event 
 */
function functionRightKey() {
	rightKey = event.keyCode;
	//sessionStorage.setItem("rightKey", rightKey.toString());

}
/**
 * this function display the start div 
 */
function StartGame() {


	document.getElementById("Welcome").style.display = 'none';
	document.getElementById("Login").style.display = 'none';
	document.getElementById("Register").style.display = 'none';
	document.getElementById("Preferences").style.display = 'none';
	document.getElementById("score").style.display = 'block';
	document.getElementById("lives").style.display = 'block';
	document.getElementById("time").style.display = 'block';
	document.getElementById("game").style.display = 'block';
	document.getElementById("newGame").style.display = 'block';
	document.getElementById("gameDetails").style.display = 'block';

	if (interval != null) {
		gameEnded();
	}
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
	food_current = 0;
	var food_remain = foodNum;
	var pacman_remain = 1;
	start_time = new Date();
	fiveFood = { value: 5, frequency: 0.6, amount: 0 };
	fiveFood.currentPercent = 0 - fiveFood.frequency;
	fifteenFood = { value: 15, frequency: 0.3, amount: 0 };
	fifteenFood.currentPercent = 0 - fifteenFood.frequency;
	twentyFiveFood = { value: 25, frequency: 0.1, amount: 0 };
	twentyFiveFood.currentPercent = 0 - twentyFiveFood.frequency;
	lives = 5;

	let foodArray = [fiveFood, fifteenFood, twentyFiveFood];
	for (var i = 0; i < 20; i++) {
		board[i] = new Array();
		board2[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 20; j++) {
			if (
				((i == 0 || j == 0 || i == 19 || j == 19)) ||
				//((j==8) && (i==0 ||i==1 ||i==2 || i==3)) ||
				//((j==8) && (i==19 ||i==18 ||i==17 || i==16)) ||
				//((j==11) && (i==0 ||i==1 ||i==2 || i==3) ) ||
				//((j==11) && (i==19 ||i==18 ||i==17 ||i==16) ) ||
				(((j >= 3) && (j <= 5)) && ((i >= 3) && (i <= 5))) ||
				(((j >= 14) && (j <= 16)) && ((i >= 14) && (i <= 16))) ||
				(((j >= 3) && (j <= 5)) && ((i >= 14) && (i <= 16))) ||
				(((j >= 14) && (j <= 16)) && ((i >= 3) && (i <= 5))) ||
				(((i >= 9) && (i <= 10)) && ((j >= 4) && (j <= 7))) ||
				(((i >= 9) && (i <= 10)) && ((j >= 12) && (j <= 15)))

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
	while (pacman_remain != 0) {
		let emptyCellPac = findRandomEmptyCell(board);
		shape.i = emptyCellPac[0];
		shape.j = emptyCellPac[1];
		pacman_remain--;
		board[emptyCellPac[0]][emptyCellPac[1]] = 2;
		board2[emptyCellPac[0]][emptyCellPac[1]] = 2;

	}

	song = new Audio('pacManSong.mp3')
	song.play();
	generateGhosts();
	//ghostsUpdate();

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

	$(document).ready(function () {
		interval = setInterval(UpdatePosition, 100);
		interval4 = setInterval(ghostsUpdate, 500);
		interval2 = setInterval(putCherry, 7000);
		interval3 = setInterval(putGlow, 10000);
	})

}

function newGame() {

	if (!isEmpty(glowObject)) {
		board2[glowObject.i][glowObject.j] == 0;
		glowObject = new Object();
	}

	gameEnded();

	lives = 5;
	score = 0;

	Start();
}

function ghostsUpdate() {

	ghosts.forEach(ghost => ghostsPositionReset(ghost));
	ghosts.forEach(ghost => moveGhost(ghost));
}

function putGlow() {
	//remove previous cherry
	let hasGlow = false;
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			if (board2[i][j] == 50) {
				hasGlow = true;
			}
		}
	}
	if (hasGlow == false) {
		var emptyCell = findRandomEmptyCell(board);
		board2[1][1] = 50;
		glowObject.i = 1;
		glowObject.j = 1;
	}

}

function generateGhosts() {
	//board
	if (monsterAmount > 0) {
		board2[18][18] = 11;

		var ghost1 = new Object();
		ghost1.num = 11;

		ghost1.i = 18;
		ghost1.j = 18;

		ghosts = [ghost1]
	}
	if (monsterAmount > 1) {
		board2[1][1] = 12;

		var ghost2 = new Object();
		ghost2.num = 12;

		ghost2.i = 1;
		ghost2.j = 1;

		ghosts = [ghost1, ghost2]
	}
	if (monsterAmount > 2) {
		board2[1][18] = 13;

		var ghost3 = new Object();
		ghost3.num = 13;

		ghost3.i = 1;
		ghost3.j = 18;

		ghosts = [ghost1, ghost2, ghost3]

	}
	if (monsterAmount > 3) {
		board2[18][1] = 14;

		var ghost4 = new Object();
		ghost4.num = 14;

		ghost4.i = 18;
		ghost4.j = 1;

		ghosts = [ghost1, ghost2, ghost3, ghost4]
	}


}

function putCherry() {
	//remove previous cherry
	let hasCherry = false;
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			if (board[i][j] == 100) {
				board[i][j] = 0;
				hasCherry = true;
			}
		}
	}
	if (hasCherry == false) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 100;
	}

}

function foodDistribution(foodArray) {
	//let foodPercent = [5:foodArray[fiveFoodColor].currentPercent, 15:foodArray[fifteenFoodColor].currentPercent,25:foodArray[twentyFiveFoodColor].currentPercent];
	foodArray.sort(function (a, b) { return a.currentPercent - b.currentPercent });
	foodArray[0].amount++;
	return foodArray[0].value;

}

function updateFrequency() {
	fiveFood.currentPercent = (fiveFood.amount / food_current) - fiveFood.frequency;
	fifteenFood.currentPercent = (fifteenFood.amount / food_current) - fifteenFood.frequency;
	twentyFiveFood.currentPercent = (twentyFiveFood.amount / food_current) - twentyFiveFood.frequency;

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
		myImage.src = 'pacManDown.png';
		return 2;
	}
	if (keysDown[leftKey]) {
		myImage.src = 'pacManLeft.png';
		return 3;
	}
	if (keysDown[rightKey]) {
		myImage.src = 'pacManRight.png';
		return 4;
	}
}

//drawing the objects that placed on the board 
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
				context.drawImage(myImage, center.x - 15, center.y - 15, 35, 35);
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
				context.drawImage(cherry, center.x - 15, center.y - 15, 30, 30);
			} if (board2[i][j] == 50) {
				context2.drawImage(glow, center.x - 15, center.y - 15, 30, 30);
			} if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 15, center.y - 15, 30, 30);
				context.fillStyle = "rgba(0, 0, 255, 0.4)";
				//color
				context.fill();
			}
			if (board2[i][j] == 11) {
				context2.drawImage(ghost1Img, center.x - 15, center.y - 15, 35, 35);
			}
			if (board2[i][j] == 12) {
				context2.drawImage(ghost2Img, center.x - 15, center.y - 15, 35, 35);
			}
			if (board2[i][j] == 13) {
				context2.drawImage(ghost3Img, center.x - 15, center.y - 15, 35, 35);
			}
			if (board2[i][j] == 14) {
				context2.drawImage(ghost4Img, center.x - 15, center.y - 15, 35, 35);
			}
		}
	}
}


// interval that updates the positions of the object on the board
function UpdatePosition() {
	if (!isEmpty(shape)) {

		board[shape.i][shape.j] = 0;

		var x = GetKeyPressed();
		moveObject(x, shape);


		if (board[shape.i][shape.j] == 5) {
			score = score + 5;
			food_current--;
		}
		if (board[shape.i][shape.j] == 15) {
			score = score + 15;
			food_current--;
		}
		if (board[shape.i][shape.j] == 25) {
			score = score + 25;
			food_current--;
		}
		if (board[shape.i][shape.j] == 100) {
			score = score + 100;
		}

		board[shape.i][shape.j] = 2; // update pacman position
	}

	if (!isEmpty(glowObject)) {
		let iGlow = glowObject.i;
		let jGlow = glowObject.j;

		let glowMove = getRandomInt(1, 4);
		while (!validMove(glowMove, glowObject)) {
			glowMove = getRandomInt(1, 4);
			//ghostsUpdate();
		}
		board2[iGlow][jGlow] = 0;
		moveObject(glowMove, glowObject);


		if (shape.i == glowObject.i && shape.j == glowObject.j) {
			board2[glowObject.i][glowObject.j] = 2;
			score = score + 50;
			glowObject = new Object();
		}
		else {
			board2[glowObject.i][glowObject.j] = 50; // update pacman position
		}

	}

	ghosts.forEach(ghost => checkFail(ghost));

	var currentTime = new Date();
	time_elapsed = ((timeLimit * 1000) - (currentTime - start_time)) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (food_current == 0 || time_elapsed <= 0 || lives == 0) {
		Draw();
		gameEnded();
		if (lives == 0) {
			window.alert("Loser!");

		}
		else if (time_elapsed <= 0) {
			if (score <= 100) {
				window.alert("You are better than " + score + " points!")

			}
			else {
				window.alert("Game over");
			}
		}
		else {
			window.alert("Winner!!!");

		}

	} else {
		Draw();
	}
}

function gameEnded() {

	if (!isEmpty(glowObject)) {
		board2[glowObject.i][glowObject.j] == 0;
		glowObject = new Object();
	}

	clearInterval(interval);
	interval = null;
	clearInterval(interval2);
	interval2 = null;
	clearInterval(interval3);
	interval3 = null;
	clearInterval(interval4);
	interval4 = null;


	song.pause();
	song.currentTime = 0;

	song = new Audio();
}

//check if monsters ate pacman and do operations accordingly
function checkFail(ghost) {
	if (ghost.i == shape.i && ghost.j == shape.j) {
		lives--;
		var death = new Audio("pacManDie.mp3");
		death.play();
		score = score - 10;
		if (lives > 0) {

			ghosts.forEach(ghost => ghostsPositionReset(ghost))
			generateGhosts();

			emptyCell = findRandomEmptyCell(board);
			board[emptyCell[0]][emptyCell[1]] = 2;
			board[shape.i][shape.j] = 0;
			shape.i = emptyCell[0];
			shape.j = emptyCell[1];
		}
	}

}

function ghostsPositionReset(ghost) {
	board2[ghost.i][ghost.j] = 0;
}

function moveGhost(ghost) {
	let x;
	if ((shape.i - ghost.i < 0) && (shape.j - ghost.j < 0)) {
		x = tossCoin(1, 3);
	}
	if ((shape.i - ghost.i < 0) && (shape.j - ghost.j >= 0)) {
		x = tossCoin(2, 3);
	}
	if ((shape.i - ghost.i >= 0) && (shape.j - ghost.j < 0)) {
		x = tossCoin(1, 4);
	}
	if ((shape.i - ghost.i >= 0) && (shape.j - ghost.j > 0)) {
		x = tossCoin(2, 4);
	}
	moveObject(x, ghost);
	board2[ghost.i][ghost.j] = ghost.num;
}

function tossCoin(value1, value2) {
	var chosenValue = Math.random() < 0.5 ? value1 : value2;
	return chosenValue;
}

function validMove(x, obj) {
	if (x == 1) {
		if (obj.j > 0 && board[obj.i][obj.j - 1] != 4 && !isCellGhost(obj.i, obj.j - 1)) {
			return true;
		}
	}
	if (x == 2) {
		if (obj.j < 19 && board[obj.i][obj.j + 1] != 4 && !isCellGhost(obj.i, obj.j + 1)) {
			return true;
		}
	}
	if (x == 3) {
		if (obj.i > 0 && board[obj.i - 1][obj.j] != 4 && !isCellGhost(obj.i - 1, obj.j)) {
			return true;
		}
	}
	if (x == 4) {
		if (obj.i < 19 && board[obj.i + 1][obj.j] != 4 && !isCellGhost(obj.i + 1, obj.j)) {
			return true;
		}
	}
	return false;
}

function isCellGhost(i, j) {
	if (board2[i][j] == 11 || board2[i][j] == 12 ||
		board2[i][j] == 13 || board2[i][j] == 14) {
		return true;
	}
	return false;
}

function moveObject(x, obj) {
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
	for (var key in obj) {
		if (obj.hasOwnProperty(key))
			return false;
	}
	return true;
}
