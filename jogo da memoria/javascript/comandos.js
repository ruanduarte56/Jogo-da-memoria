var nome=document.querySelectorAll('.login-input')[0]
var enviar=document.querySelectorAll(".login_button")[0]
var form=document.querySelectorAll('.login-form')[0]

function mostrar({target}){
  if(target.value.length>=2){
    enviar.removeAttribute('disabled')
  }
  else{
    enviar.setAttribute('disabled','')
  }
}



function cancelar(event){
    event.preventDefault();
    localStorage.setItem("play",nome.value);
    window.location='game.html';
    
}

nome.addEventListener('input',mostrar)
form.addEventListener('submit',cancelar)
