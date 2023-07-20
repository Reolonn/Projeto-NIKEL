const emailModal = new bootstrap.Modal("#seeemailmodal");
const passwordModal = new bootstrap.Modal("#areyousuremodal");

let loggedvar = sessionStorage.getItem("logged");
const session = localStorage.getItem("keepsession");
let data = {
    transactions: []
};



logincheck();

getname();


// LOG OUT 

document.getElementById("logout").addEventListener("click", function() {
    
    localStorage.removeItem("keepsession")
    sessionStorage.removeItem("logged")

    window.location.href = "login.html"

})


function logincheck (){
    if(session){
        sessionStorage.setItem("logged", session)
        loggedvar = session;
    }

    if(!loggedvar) {
        window.location.href = "login.html"
        alert("Please log in")
        return;
    }

    const dataUser = localStorage.getItem(loggedvar);
    if(dataUser) {
    data = JSON.parse(dataUser);
    }
}

// _________________

function savedata(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

// CHANGE EMAIL

document.getElementById("changeemailform").addEventListener("submit", function(e){
    e.preventDefault();

    const newemail = document.getElementById("newemail").value;

    localStorage.removeItem(data.login)

    data.login = newemail

    console.log(newemail)
    console.log(data)

    savedata(data);

    sessionStorage.removeItem("logged");
    sessionStorage.setItem("logged", data.login);
    
    if(session){
        localStorage.removeItem("keepsession")
        localStorage.setItem("keepsession", data.login)
    }

    e.target.reset();

    alert("Email changed sucessfully!")

});

document.getElementById("seeemailbutton").addEventListener("click", function(){

    document.getElementById("showemail").innerHTML = `<p>${data.login}</p>`

})


// CHANGE PASSWORD 

document.getElementById("changepasswordform").addEventListener("submit", function(e){

    const newpassword1 = document.getElementById("newpassword1").value;
    const newpassword2 = document.getElementById("newpassword2").value;
    const oldpassword = document.getElementById("changepasswordcheck").value;

    if(oldpassword === data.password){
        if(newpassword1 === newpassword2){
            
            data.password = newpassword1;
    
            savedata(data);
    
            alert("Password changed succesfully!")
        }else{
            alert("New passwords are not the same.")
        };

    }else{
        alert("Oops, current password is incorrect.")
    }; 


});

// ____________

function getname(){
    const name = data.name;

    document.getElementById("accountheader").innerHTML = `<h1>Hello ${name}!</h1>`;
}