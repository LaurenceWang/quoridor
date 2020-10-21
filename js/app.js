let m = 1;
let c = 1;
for (let y = 0; y < 19; y++) {

    for (let i = 0; i < 17; i++) {


        //  $(".plateau").append(`<div class='case' id="case${i+(17*y)}"> </div>`)
        // $(".plateau").append("<div class='case'> </div>")

        if (y % 2 == 0) {
            //    $(".plateau").append(`<div class='case' id="mur${i+(17*y)-(9*y)}"> </div>`)
            $(".plateau").append(`<div class='rectangle mur' id="mur${m}" data-mgauche=${m-1}  data-mdroite=${m+1}  data-mhaut=${m-9}  data-mbas=${m+9}> </div>`)
            m = m + 1;

            if (i % 2 == 0) {

                $(".rectangle").eq((y * 17) + i).css({
                    "width": "60",
                    "height": "10",
                  
                });

            } else {

                $(".rectangle").eq((y * 17) + i).css({
                    "width": "10",
                    "height": "10",
                    
                })

            }
        } else {

            if (i % 2 == 0) {

                $(".plateau").append(`<div class='rectangle case' id="${c}" data-vgauche=${c-1} data-vdroite=${c+1} data-vhaut=${c-9} data-vbas=${c+9}> </div>`)
                c = c + 1;
                $(".rectangle").eq((y * 17) + i).css({
                    "width": "60",
                    "height": "60"
                });

            } else {
                $(".plateau").append(`<div class='rectangle mur' id="mur${m}"> </div>`)
                m = m + 1;
                $(".rectangle").eq((y * 17) + i).css({
                    "width": "10",
                    "height": "60",
                   
                })
            }
        }


    }


}


let voisin = [];

$("#76").addClass('jouable');
$("#78").addClass('jouable');
$("#68").addClass('jouable');
$(".jouable").addClass("pionShadow");

$("body").on("click", ".jouable", function () {
   
    $(".jouable").removeClass('pionShadow');
    $(".jouable").removeClass('jouable');
   
    if($(".pion1").hasClass('active')){
    $(".pion1").removeClass('pion1');
    $(".active").removeClass('active')
    $(".pion2").addClass('active');
    $(this).addClass('pion1');


}

else if($(".pion2").hasClass('active')){  
    $(".pion2").removeClass('pion2');
    $(".active").removeClass('active');
    $(".pion1").addClass('active');
    $(this).addClass('pion2');
    
  
}

    voisin = [$(".active").attr("data-vgauche"),$(".active").attr("data-vhaut"), $(".active").attr("data-vdroite"),$(".active").attr("data-vbas")];
    $("#"+voisin[0]).addClass('jouable');
    $("#"+voisin[1]).addClass('jouable');
    $("#"+voisin[2]).addClass('jouable');
    $("#"+voisin[3]).addClass('jouable');
    console.log(voisin); 

    

    if($(".jouable").hasClass("pion1") || $(".jouable").hasClass("pion2")){
        $(".pion1").removeClass("jouable");
        $(".pion2").removeClass("jouable");
    }
$(".jouable").addClass("pionShadow");
    
}); 



$("#77").addClass('pion1');
$("#77").addClass('active');
$("#5").addClass('pion2');


$(".mur").on("click", function(){
    $(this).addClass("murSolid");

});
