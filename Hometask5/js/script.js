var comments = [];
const $http = new Http('http://89.108.65.123:8080'); // создаем инстанс HTTP-клиента

const init = async () => {
    await getComments();
    renderInfo();
    addListeners();
}

const addListeners = () => { 
    const productForm = document.querySelector('#sendForm') 
    productForm.addEventListener('submit', addComment) 
    const likes = document.querySelectorAll(".like")
    likes.forEach((item)=> {
        item.addEventListener("click", addLike)
    })
    const comms = document.querySelectorAll(".del")
    comms.forEach((item) => {
        item.addEventListener("click", delComm)
    })
  }

const getComments = async () => { 
    try { 
      const com = await $http.get('/comments');
      com.forEach( (item) => {
          comments.push(item)
      })
    renderInfo();
    } catch (e) {
      console.error(e)
    }
  }


const renderInfo = () => {
    const list = document.querySelector('.list-group');
    list.innerHTML = '';
    comments.forEach((commItem) => {
        list.innerHTML += `<a href="#" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">${commItem.comment_id}</h5><small class="del" idelem="${commItem.comment_id}">Delete</small></div><p class="mb-1">${commItem.text}</p><small class="like" id="${commItem.comment_id}">Likes: ${commItem.likes}</small>`;
    })
}

const addComment = async (e) => {
    e.preventDefault()
    const text = document.querySelector('#exampleFormControlTextarea1').value;
    if (text != ""){
        const queryString = `text=${text}`
        const request = await $http.post('/comments', queryString);
        comments.push(request);
        document.querySelector('#exampleFormControlTextarea1').value = "";
        renderInfo();
        addListeners();
    } else {
        alert("Впишите текст в поле!")
        return;
    }
}

const addLike = async (e) => {
    const queryString = `comment_id=${e.target.id}`
    const request = await $http.patch('/comments',queryString);
    comments.forEach((item) => {
        if (item.comment_id == request.comment_id){
            item.likes++;
        }
    })
    renderInfo();
    addListeners();
}

const delComm = async (e) => {
    const queryString = `comment_id=${e.target.attributes[1].value}`
    const request = await $http.delete('/comments',queryString);
    comments.forEach((item) => {
        if (item.comment_id == request.comment_id){
            comments.splice(comments.indexOf(item),1);
        }
    })
    renderInfo();
    addListeners();
}

  document.addEventListener('DOMContentLoaded', init)
