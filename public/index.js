



var modalBtn = document.getElementById('create-survey-button');
var cancelBtn = document.getElementsByClassName('modal-cancel-button')[0];
var acceptBtn = document.getElementsByClassName('modal-accept-button')[0];
modalBtn.addEventListener('click', openModal);
cancelBtn.addEventListener('click', closeModal);
acceptBtn.addEventListener('click', openModal);

function openModal(){

	twitText.value = "";
    twitAuthor.value = "";
    modal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');

}

function closeModal(){

	modal.classList.add('hidden');
    modalBackdrop.classList.add('hidden');

}