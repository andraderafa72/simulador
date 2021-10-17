const containerFaq = document.querySelector(".container-faq");
const resposta = document.querySelector(".container-faq .answer");
const pergunta = document.querySelector(".container-faq .question");

containerFaq.addEventListener('click', e => {
  if(containerFaq.classList.contains('visible')){
    containerFaq.classList.remove('visible')
    pergunta.classList.remove('visible')
    resposta.classList.remove('visible')
  } else {
    containerFaq.classList.add('visible')
    pergunta.classList.add('visible')
    resposta.classList.add('visible')
  }
})