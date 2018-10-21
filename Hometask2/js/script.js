const BASE_URL = 'http://89.108.65.123';

let button = document.getElementById('getlistbtn');
let sendform = document.getElementById('messageForm');

const getUsers = () => {
    fetch(`${BASE_URL}/user`).then((result) => {
        return result.json();
    }).then((array) => {
        clearUL();
        for(var i=0; i<array.length; i++){
            console.log(array[i]);
            if(array[i].hasOwnProperty('name')&&(array[i].hasOwnProperty('email'))&&(array[i].hasOwnProperty('age'))){
                var newLi = document.createElement('li');
                newLi.classList.add("list-group-item");
                newLi.innerHTML = i+1 + ". " + array[i].name;
                newLi.style.cursor = "pointer";
                newLi.addEventListener("click", getUserById, false);
                var ourList = document.querySelector(".list-group");
                ourList.appendChild(newLi);
            }
        }
    }).catch((error) => {
        console.log('Error! ' + error);
    })
}

const getUserById = (e) => {
    fetch(`${BASE_URL}/user/${e.target.textContent[0]}`).then((result) => {
        return result.json()
    }).then((usr) => {
        if (usr.hasOwnProperty("name")&&(usr.hasOwnProperty('email'))&&(usr.hasOwnProperty('age'))){
            alert(`Имя пользователя: ${usr.name}\nEmail: ${usr.email}\nВозраст: ${usr.age}`);
        } else {
            throw error("Кривой пользователь");
        }
    }).catch((error) => {
        console.log(error);
    })
}

const sendUser = (user) => {
    console.log(user);
    fetch(`${BASE_URL}/user/`,{
        method: 'POST',
        body: JSON.stringify(user)
    }).then(() => {
        getUsers();
    }).catch((error) => {
        console.log(error);
    })
}

const clearUL = () => {
    var ul = document.querySelector(".list-group");
    if (ul.childNodes.length>0){
        for(var i=ul.childNodes.length; i>0;i--){
            ul.removeChild(ul.childNodes[i-1]);
        }
    }
    
}

button.addEventListener("click", getUsers, false);
sendform.addEventListener("submit", (e) =>{
    e.preventDefault();
    var uname = document.getElementById('name').value;
    var uemail = document.getElementById('email').value;
    var uage = document.getElementById('age').value;
    if(uage<0 || uage>120){
        throw new Error("Трудно поверить в такой возраст.");
    }
    
    var userobj ={
        name: uname,
        email: uemail,
        age: Number(uage)
    }
    sendUser(userobj)
}, false);

// const getMessage = () => {
//   fetch(`${BASE_URL}/getMessage`).then((result) => {
//     return result.text();
//   }).then((text) => {
//     textArea.innerHTML = text
//   }).catch((error) => {
//     console.error(error);
//   })
// }

// const sendMessage = (message) => {
//   fetch(`${BASE_URL}/sendMessage`, {
//     method: 'POST',
//     body: message
//   }).then(() => {
//     getMessage();
//   }).catch((error) => {
//     console.error(error);
//   })
// }

// getMessage()
// form.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const message = messageInput.value;
//   sendMessage(message);
// })