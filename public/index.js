


var modal = document.getElementById('create-survey-modal');
var modalBackdrop = document.getElementById("modal-backdrop");
var modalCloseBtn = document.getElementsByClassName('modal-close-button')[0];
var modalBtn = document.getElementById('create-survey-button');
var cancelBtn = document.getElementsByClassName('modal-cancel-button')[0];
var acceptBtn = document.getElementsByClassName('modal-accept-button')[0];

var surveyTitle = document.getElementById("survey-title-input");
var question1 = document.getElementById("survey-q1-input");
var question2 = document.getElementById("survey-q2-input");
var question3 = document.getElementById("survey-q3-input");
var question4 = document.getElementById("survey-q4-input");
var question5 = document.getElementById("survey-q5-input");

modalBtn.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);
acceptBtn.addEventListener('click', createSurvey);

function openModal(){

	surveyTitle.value = "";
    question1.value = "";
    question2.value = "";
    question3.value = "";
    question4.value = "";
    question5.value = "";
    modal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');

}

function closeModal(){

	modal.classList.add('hidden');
    modalBackdrop.classList.add('hidden');

}

function createSurvey(){

	if ((surveyTitle.value == "") || (question1.value == "") || (question2.value == "") || (question3.value == "") || (question4.value == "") || (question5.value == "")) {

    	alert("Survey is incomplete!!!");
    	return;

  	}

}



