$(document).ready( () => {
    // Задание1
    // На сайте в форме обратной связи добавьте следующие поля:
    //     a) поле даты рождения;
    //     b) ошибочные поля подсветить с помощью какого-нибудь эффекта, например, Bounce.
    $("#datepicker").datepicker({
        dateFormat: 'dd/mm/yy',
        showAnim:'slide',
        showButtonPanel:true,
        showOn:'button',
        buttonText:'Выбор даты'
    });
     // Задание2
    //     Все возвращаемые ошибки выводить с помощью виджета Dialog. 
    $("#dialog1").dialog({
        autoOpen: false
    });

    $("#dialog2").dialog({
        autoOpen: false
    });
    //Не стал кастомизировать диалоги, не было времени

    document.querySelector("#submit").addEventListener("click", ()=>{
        var date = document.querySelector("#datepicker").value;
        if(checkDate(date)){
            document.querySelector("#datepicker").value = "";
            $("#dialog2").dialog("open");
        } else {
            document.querySelector("#datepicker").value = "";
            $("#datepicker").effect("bounce","slow");
            $("#dialog1").dialog("open");
        }
    })

function checkDate(value) {
    var arrD = value.split("/");
    arrD[1] -= 1;
    var d = new Date(arrD[2], arrD[1], arrD[0]);
    if ((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
        return true;
    } else {
        return false;
    }
} 
    // Задание3
    //     Создать карусель популярных товаров в шапке.
    var $imgs = $("li")
    var currentPosition = 0;
    $("#left").on("click",()=>{
         if(currentPosition>0){
             currentPosition -=1;
             $imgs.each((i)=>{
                $imgs.css("display","none")
                $imgs.eq(currentPosition).css("display","inline")
             })
         } else {
            currentPosition = 4;
            $imgs.css("display","none")
            $imgs.eq(currentPosition).css("display","inline")
         }
    })

    $("#right").on("click",()=>{
        if(currentPosition<($imgs.length-1)){
            currentPosition +=1;
            $imgs.each((i)=>{
                $imgs.css("display","none")
                $imgs.eq(currentPosition).css("display","inline")
             })
        } else {
            currentPosition = 0
            $imgs.css("display","none")
            $imgs.eq(currentPosition).css("display","inline")
        }
    })

    // Задание4
    // * C помощью jQuery UI добавить возможность перемещать товар прямо в корзину мышью.
})