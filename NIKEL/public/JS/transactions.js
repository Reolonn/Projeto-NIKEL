const myModal = new bootstrap.Modal("#transactionModal");
let loggedvar = sessionStorage.getItem("logged");
const session = localStorage.getItem("keepsession");
let data = {
    transactions: []
};



logincheck();

getlist();

// _____________________

// ADD TRANSACTION 

document.getElementById("transaction-form").addEventListener("submit", function(e){
    e.preventDefault();
    
    const valor = parseFloat(document.getElementById("valueinput").value);
    const descrição = document.getElementById("descriptioninput").value;
    const date = document.getElementById("dateinput").value;
    const type = document.querySelector('input[name="typeinput"]:checked').value;


    data.transactions.unshift({
        value: valor,
        type: type,
        description: descrição,
        date: date
    })

    savedata(data);
    e.target.reset();
    myModal.hide();



    alert("Done!")
    window.location.reload();
})


function savedata(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}




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

// ______________________ 

// DELETE LAST 

document.getElementById("deletebutton").addEventListener("click", function(){

    const datauser2 = localStorage.getItem(loggedvar)
    if(datauser2) {
        data = JSON.parse(datauser2);
    }

    data.transactions.shift();

    savedata(data);
    window.location.reload();

});


// TRANSACTIONS ARRAY 

function getlist() {
    const info = data.transactions;
    let tipo = "Income"

    let tabledata = ``;


    for(let index = 0; index < info.length; index++) {
        tipo = "Income"
        if (info[index].type === "2"){
            tipo = "Outcome"
        }

        tabledata += `
            <tr>
                <th scope="row">${info[index].date}</th>
                <td>R$ ${info[index].value.toFixed(2)}</td>
                <td>${tipo}</td>
                <td>${info[index].description}</td>
            </tr>
        `
    }

    if(info.length){
        document.getElementById("tabelatotal").innerHTML = tabledata;
    }

}