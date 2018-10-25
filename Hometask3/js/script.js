var btn = document.getElementById('startbtn');
btn.addEventListener('click', () => {

    var str  = document.getElementById('task1');
    // console.log(str.textContent);

    str.innerHTML = str.textContent.replace("\'","\"");

    var str2 = document.getElementById('task2');
    // console.log(str.textContent);

    var reg = /'(?!t)/gmi; //По идее вот такая регулярка была бы более верной /(?<!aren)'(?!t)/gmi но JS не поддерживает поиск назад https://stackoverflow.com/questions/4200157/javascript-regular-expression-exception-invalid-group

    str2.innerHTML = str2.textContent.replace(reg,"\"");
})

var btns = document.getElementById('btn_submit');
btns.addEventListener('click', () => {
    var inname = document.getElementById('username');
    var inphone = document.getElementById('phone-nomber');
    var inemail = document.getElementById('email');
//rounded
    if(!inname.value.match(/[A-Z,a-z]/)) {
        alert('Имя задано не верно!');
        inname.classList.add('border-danger');
        inname.classList.add('rounded');
    } else if (!inphone.value.match(/\+7\(\d{3,}\)\d{3}-\d{4}/)) {
        alert('Номер телефона задан не верно!');
        inphone.classList.add('border-danger');
        inphone.classList.add('rounded');
    } else if (!inemail.value.match(/.*@mail\.ru/)) {
        alert('Email задан не верно!');
        inemail.classList.add('border-danger');
        inemail.classList.add('rounded');
    } else {
        inname.classList.remove('border-danger');
        inphone.classList.remove('border-danger');
        inemail.classList.remove('border-danger');
        alert('Валидация успешна');
    }
})