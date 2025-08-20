//Varibles 
const inputName = document.getElementById("name");
const inputMail = document.getElementById("mail");
const inputBtnSubmit = document.getElementById('to-send');
 const email = {
    name: "",
    mail: "",
 };


 document.addEventListener("DOMContentLoaded", function(){
    //validar campos input
  inputName.addEventListener("blur", validate);
  inputMail.addEventListener("blur", validate);
 })

 function validate(e){
  if(e.target.value.trim() === ""){
    email[e.target.id] = "";
    checkEmail();
    return;
  }

  if(e.target.id === "mail" && !validateMail(e.target.value)){
    showAlert("Invalid email", e.target.parentElement)
    email[e.target.id] = "";
    checkEmail();

    return;
  }
  clearReference(e.target.parentElement);
  email[e.target.id] = e.target.value.trim().toLowerCase();
  checkEmail();
}

function showAlert(message, reference){
    const errorP = document.createElement("P");
    clearReference(reference)

    errorP.textContent = message;
    errorP.classList.add("alert-red");
    reference.appendChild(errorP);

    setTimeout(()=>{
        errorP.remove();
    },3000)
}

function clearReference(reference){
    const alertElementP = reference.querySelector(".alert-red");
    console.log(alertElementP);
    if(alertElementP){
        alertElementP.remove();
    }
}

function checkEmail(){
  if(Object.values(email).includes("")){
    inputBtnSubmit.classList.add("opacity-50");
    inputBtnSubmit.classList.remove("btn", "btn-naranjado");
    inputBtnSubmit.disabled = true;

  }else{
    inputBtnSubmit.classList.remove("opacity-50");
    inputBtnSubmit.classList.add("btn", "btn-naranjado");
    inputBtnSubmit.disabled = false;
  }
}

function validateMail(mail){
  const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const result = regex.test(mail);
    return result;
}