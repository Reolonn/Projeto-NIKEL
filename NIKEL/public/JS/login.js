const myModal = new bootstrap.Modal("#registerModal");
let loggedvar = sessionStorage.getItem("logged");
const session = localStorage.getItem("keepsession");


loggedcheck();


// LOGIN

document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const logemail = document.getElementById("logininput").value;
    const logpassword = document.getElementById("passwordinput").value;
    const logchecksession = document.getElementById("sessioncheck").checked;



    const account = getlogemail(logemail);

    if(!account) {
        alert("Couldn't find account")
        return;
    }

    if(account){

        if(logpassword !== account.password){
            alert("User or password is incorrect")
            return;
        }
        if(logpassword == account.password) {
            savesession(logemail, logchecksession);

            window.location.href = "home.html"

        }
    }
    
})



function savesession(sessionemail, sessioncheck){
    if(sessioncheck) {
        localStorage.setItem("keepsession", sessionemail)
    }

    if(!sessioncheck){
        sessionStorage.setItem("logged", sessionemail)
    }

}


function loggedcheck(){
    if(session){
        sessionStorage.setItem("logged", session);
        loggedvar = session;
    }

    if(loggedvar) {
        savesession(loggedvar, session);

        window.location.href = "home.html"
    }
}



function getlogemail(datae){
    const floginfo = localStorage.getItem(datae);


    if(floginfo) {
        return JSON.parse(floginfo)
    }
    if(!floginfo) {
        return "";
    }


}





// SIGN UP

document.getElementById("signin-form").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("namecreateinput").value;
    const newemail = document.getElementById("emailcreateinput").value;
    const newpassword1 = document.getElementById("passwordcreateinput1").value;
    const newpassword2 = document.getElementById("passwordcreateinput2").value;
    if(newemail.length <= 5) {
        alert("Please enter a valid email");
        return;
    }

    if(localStorage.getItem(newemail)) {
        myModal.hide();
        e.target.reset();
        alert("You already have an account. Please log in.");
        return;
    }

    if(newpassword1 !== newpassword2){
        alert("Passwords are not the same.")
        return;
    }

    if(newpassword1.length <= 4) {
        alert("Please enter a password larger than 4 characters");
        return;
    }


    saveaccount({
        name: name,
        login: newemail,
        password: newpassword1,
        transactions: []
    })


    myModal.hide();
    e.target.reset();
    alert("Account created succesfully")
});


function saveaccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

