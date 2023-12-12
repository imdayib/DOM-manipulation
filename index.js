//select all element

let firstName = document.querySelector("#FirstName");
let lastName = document.querySelector("#LastName");
let password = document.querySelector("#Password");
let confirmPassword = document.querySelector("#Confirm password");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");

let form = document.querySelector("#register");
let successAlert = document.querySelector("#successAlert");
let dangerAlert = document.querySelector("#dangerAlert");
let passwordHepler = document.querySelector("#passwordHepler");
let confirmPasswordHelper = document.querySelector("#confirmPasswordHepler");
let table = document.querySelector("#userTable tbody");

let searchInput = document.querySelector("#search-input");

let newID = 1;
GenerateID();
document.addEventListener("DOMContentLoaded", getUsers);
table.addEventListener("click",removeRow);




//submit event
form.addEventListener("submit",(event)=>{
    event.preventDefault();

    if(checkEmptyFeild(firstName) && checkEmptyFeild(lastName) && checkEmptyFeild(Password) && 
    checkEmptyFeild(ConfirmPassword) && checkEmptyFeild(email) && checkEmptyFeild(phone))
    {
        if(!checkPasswordLength()){
            checkPasswordLength();
            return;
        }
        if(!checkConfirmPassword()){
            checkConfirmPassword();
            return;
        }
        registerNewUser(firstName,lastName,password,email,phone);

        successAlert.textContent = "thank you successfully Register";
        successAlert.classList.add("d-block");

        form.reset();
    }else{
        checkEmptyFeild(firstName);
        checkEmptyFeild(lastName);
        checkEmptyFeild(Password);
        checkEmptyFeild(ConfirmPassword);
        checkEmptyFeild(email);
        checkEmptyFeild(phone);
    }

   
});

//search input
searchInput.addEventListener("keyup", filter);

//function check the empty feilds

function checkEmptyFeild(feild){
    if(feild.value == ""){
        feild.classList.add("border","border-danger");
        dangerAlert.textContent = "All Feild Must Not Empty...";
        dangerAlert.classList.add("d-block");

    return;
    }else{
        feild.classList.remove("border-danger");
        dangerAlert.classList.remove("d-block");
        return true;
    }

}

function checkPasswordLength(){
    if(password.value.length <6){
        password.classList.add("border","border-warning");
        passwordHepler.textContent = "Password must be at least 6 characters ";
        passwordHepler.classList.add("text-danger");
        return false;
    }else{
        password.classList.remove("border-warning");
        passwordHepler.textContent = "";
        return true;

    }
}
function checkConfirmPassword(){
    if(ConfirmPassword.value != password.value){
        password.classList.add("border","border-warning");
        confirmPasswordHelper.textContent = "Must be same ... ";
        confirmPasswordHepler.classList.add("text-danger");
        return false;

    }else{
        password.classList.remove("border-warning");
        confirmPasswordHepler.textContent = "";
        return true;


    }
}

function registerNewUser(firstName,lastName,password,email,phone){
    let user = `<tr><td>${newID}</td><td>${firstName.value}</td> <td>${lastName.value}</td>
    <td>${password.value}</td><td>${email.value}</td><td>${phone.value}</td>
    <td><button class="btn btn-danger"><i class="fa fa-trash"></i> Remove</button></td>
    </tr>`;

    table.innerHTML += user;

    saveLocalStorage(user);
}
function saveLocalStorage(user) {
    let usr;
    if(localStorage.getItem("user") === null){
        usr = [];
    }else{
        usr = JSON.parse(localStorage.getItem("user"));
    }
    usr.push(user);
    localStorage.setItem("user",JSON.stringify(usr));
}
function getUsers(){
    let usr;
    if(localStorage.getItem("user") === null){
        usr = [];
    }else{
        usr = JSON.parse(localStorage.getItem("user"));
    }
    usr.forEach(Element=>{
        table.innerHTML += Element;
    })
}
function GenerateID(){
    let usr;
    if(localStorage.getItem("user") === null){
        usr = []
        newID = 1;
    }else{
        usr = JSON.parse(localStorage.getItem("user"));
    }
    usr.forEach(function(users){
        newID = users.substring(8,users.indexOf('</td>'));
        newID++;
    });
}
function removeRow(event){
    // console.log(event.target);
    if(event.target.classList[0] == "btn"){
        event.target.parentElement.parentElement.remove();
        removeUserFromList(event.target.parentElement.parentElement.firstChild.innerHTML)
    }

}

function  removeUserFromList(user){
    let usr;
    if(localStorage.getItem("user") === null){
        usr = []
    }else{
        usr = JSON.parse(localStorage.getItem("user"));
    }
    usr.forEach(function(users,index){
        if(users.substring(8,users.indexOf('</td>')) == user) {
            usr.splice(index,1);

        }

    });
    localStorage.setItem("user",JSON.stringify(usr));
}

//filter functions
function filter(){
    let filter,searchTable,tr,td,i;
    filter = searchInput.value.toUpperCase();
    searchTable = document.querySelector("#userTable");
    tr = searchTable.getElementsByTagName("tr");
    for(i=1; i<tr.length; i++) {
        tr[i].style.display = "none";
        td = tr[i].getElementsByTagName("td");
        for( var j=0; j<td.length; j++) {
            var cell = tr[i].getElementsByTagName("td")[j];
            if(cell){
                if(cell.innerHTML.toUpperCase().indexOf(filter)> -1){
                    tr[i].style.display = "";
                    break;

                }
            }

        }
    }
}