$(document).ready(function() {
    $(".switch_panel li").click(function(){
        $(".switch_panel li").removeClass('active')
        $(".text").removeClass("text_active")
        $(this).addClass("active")
    //    console.log($(".switch_panel li").index($(this)))
       $(".text").eq($(".switch_panel li").index($(this))).addClass('text_active')
    })

    
    

    $.ajax({
        url: 'http://89.108.65.123/cities',
        dataType: "json",
        success: (data, textStatus) => {
            var srclist = [];
            $.each(data, (i, val)=> {
                $("#exampleFormControlSelect1").append("<option>" + data[i].name + ", " + data[i].subject + "</option>")
                // console.log(data[i].name + ", " + data[i].subject)
                srclist.push[data[i].name + ", " + data[i].subject];
                // console.log(srclist)
            })
        }
    })
})

