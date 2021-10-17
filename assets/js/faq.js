const containerFaq = document.querySelectorAll(".container-faq");
const resposta = document.querySelectorAll(".container-faq .answer");
const pergunta = document.querySelectorAll(".container-faq .question");

containerFaq.forEach((container, index) => {
  container.addEventListener('click', e => {
    if(containerFaq[index].classList.contains('visible')){
      containerFaq[index].classList.remove('visible')
      pergunta[index].classList.remove('visible')
      resposta[index].classList.remove('visible')
    } else {
      containerFaq[index].classList.add('visible')
      pergunta[index].classList.add('visible')
      resposta[index].classList.add('visible')
    }
  });
})