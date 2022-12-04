var questions = [
    {
        text: "What css property is used for changing the type of font?",
        choices: ["font-size", "font-family", "font-weight", "font-style"], 
        answer: "font-family"
    },

    {
        text: "The condition of an if/else statement is enclosed with",
        choices: ["square brackets", "curly braces", "parenthesis", "quotes"],
        answer: "parenthesis"
    },

    {
        text: "Arrays in javascript can be used to store",
        choices: ["arrays", "strings", "numbers", "all of the above"], 
        answer: "all of the above"
    },

    {
        text: "Common data types do not include",
        choices: ["alerts", "numbers", "strings", "booleans"],
        answer: "alerts"
    },

]

var score = 0;
var time = 60;
var interval;
var questionNumber = 0;

localStorage.setItem("scores", "");

function start () {
    score = 0; 
    questionNumber = 0;
    time= 60;
    document.querySelector(".quiz-intro").style.display = "none";
    document.querySelector("#quiz-done").style.display = "none";
    document.querySelector("#scoreboard").style.display = "none";
    document.querySelector("#quiz-content").style.display = "block";
    interval = setInterval("updateTime()", 1000);
    showQuestion ();
}

function updateTime () {
    document.getElementById ("timer").innerHTML= "Timer: "+time; 
    time--; 
    if (time < 0 ) {
        clearInterval (interval); 
        endQuiz();
    }

 }

function showQuestion () {
    document.getElementById("question").innerHTML = questions [questionNumber].text;
    document.getElementById("a").textContent = questions [questionNumber].choices[0];
    document.getElementById("b").textContent = questions [questionNumber].choices[1];
    document.getElementById("c").textContent = questions [questionNumber].choices[2];
    document.getElementById("d").textContent = questions [questionNumber].choices[3];

}
function checkAnswer () {
    var answer = this.textContent; 
    if ( answer == questions [questionNumber].answer) {
        document.getElementById("feedback").innerHTML = "correct";
        score++; 
    } else {
        document.getElementById("feedback").innerHTML = "incorrect";
        time-=5;
    }
    questionNumber++; 
    if (questionNumber < questions.length) {
        showQuestion ();
    } else {
        clearInterval(interval);
        endQuiz();
    }
}

function endQuiz () {
    document.getElementById ("quiz-content").style.display = "none";
    document.getElementById ("quiz-done").style.display = "block";
    document.getElementById("result").innerHTML = "Score: "+score+"/"+questions.length;
    document.getElementById("initials").value="";

}

function submit () {
    var records = localStorage.getItem("scores");
    var scores = document.getElementById ("initials").value+" "+score;
    records+="<br>"+scores;
    // console.log(records)
    localStorage.setItem("scores", records);
    document.getElementById("scores").innerHTML=records;
    document.getElementById("scoreboard").style.display="block";
    document.getElementById("quiz-done").style.display="none";
    document.getElementById("feedback").innerHTML="";
}

function back () {
    document.querySelector(".quiz-intro").style.display="block";
    document.getElementById("scoreboard").style.display="none";
}

function clear () {
    document.getElementById("scores").innerHTML="";
    localStorage.setItem("scores", "");
}

function view () {
    document.getElementById("scoreboard").style.display="block";
    document.getElementById("quiz-content").style.display="none";
    document.getElementById("quiz-done").style.display="none";
    document.querySelector(".quiz-intro").style.display="none";
}


document.getElementById("start").addEventListener("click", start);
document.getElementById("a").addEventListener("click", checkAnswer);
document.getElementById("b").addEventListener("click", checkAnswer);
document.getElementById("c").addEventListener("click", checkAnswer);
document.getElementById("d").addEventListener("click", checkAnswer);

document.getElementById("submit").addEventListener("click", submit);
document.getElementById("go-back").addEventListener("click", back);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("view").addEventListener("click", view);
