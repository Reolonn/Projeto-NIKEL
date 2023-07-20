const myModal = new bootstrap.Modal("#transactionModal");
let loggedvar = sessionStorage.getItem("logged");
const session = localStorage.getItem("keepsession");
let data = {
    transactions: []
};


logincheck();

getincomes();
getoutcomes();
gettotal();


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

// ________

document.getElementById("showall").addEventListener("click", function(){
    window.location.href = "transactions.html"
})

// __________________________


// TRANSACTIONS ARRAY 

function getincomes(){
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "1")
    if(cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if(cashIn.length > 5){
            limit = 5;
        } else{
            limit = cashIn.length;
        }


        for (let index = 0; index < limit; index++) {
            cashInHtml += `
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                        <div class="container">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${cashIn[index].description}</p>
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    <p>${cashIn[index].date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            `
        }

        document.getElementById("incomelist").innerHTML = cashInHtml;

    }
}

function getoutcomes(){
    const transactions = data.transactions;

    const cashOut = transactions.filter((item) => item.type === "2")
    if(cashOut.length) {
        let cashOutHtml = ``;
        let limit = 0;

        if(cashOut.length > 5){
            limit = 5;
        } else{
            limit = cashOut.length;
        }


        for (let index = 0; index < limit; index++) {
            cashOutHtml += `
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="fs-2">R$ ${cashOut[index].value.toFixed(2)}</h3>
                        <div class="container">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${cashOut[index].description}</p>
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    <p>${cashOut[index].date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            `
        }

        document.getElementById("outcomelist").innerHTML = cashOutHtml;

    }
}


function gettotal () {
    const transactions = data.transactions;
    let total = 0

    transactions.forEach((item) => {
        if(item.type === "1") {
            total += item.value;
        }
        if(item.type === "2") {
            total -= item.value;
        }
    })

    document.getElementById("total").innerHTML = `R$${total.toFixed(2)}` 

}