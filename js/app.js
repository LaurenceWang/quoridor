let m = 1;
let c = 1;
for (let y = 0; y < 19; y++) {

    for (let i = 0; i < 17; i++) {


        //  $(".plateau").append(`<div class='case' id="case${i+(17*y)}"> </div>`)
        // $(".plateau").append("<div class='case'> </div>")

        if (y % 2 == 0) {
            //    $(".plateau").append(`<div class='case' id="mur${i+(17*y)-(9*y)}"> </div>`)
            $(".plateau").append(`<div class='rectangle mur horizontal' id="mur${m}" data-mgauche=${m-1}  data-mdroite=${m+1}  data-mhaut=${m-25}  data-mbas=${m+25}> </div>`)
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
                $(".plateau").append(`<div class='rectangle mur vertical' id="mur${m}" data-mgauche=${m-1}  data-mdroite=${m+1}  data-mhaut=${m-25}  data-mbas=${m+25}> </div>`)
                m = m + 1;
                $(".rectangle").eq((y * 17) + i).css({
                    "width": "10",
                    "height": "60",

                })
            }
        }


    }



}
for (let a = 0; a < 17; a++) {



    $(".storageUn").append(`<div class='murStorage'></div>`)

    if (a % 2 == 0) {

        $(".murStorage").eq(a).css({
            "width": "60",
            "height": "130",

        });

    } else {

        $(".murStorage").eq(a).css({
            "width": "10",
            "height": "130",

        })

    }
}


let voisin = [];
let mvoisin = [];

$("#76").addClass('jouable');
$("#78").addClass('jouable');
$("#68").addClass('jouable');
$(".jouable").addClass("pionShadow");

$("body").on("click", ".jouable", function () {

    $(".jouable").removeClass('pionShadow');
    $(".jouable").removeClass('jouable');

    if ($(".pion1").hasClass('active')) {
        $(".pion1").removeClass('pion1');
        $(".active").removeClass('active')
        $(".pion2").addClass('active');
        $(this).addClass('pion1');


    } else if ($(".pion2").hasClass('active')) {
        $(".pion2").removeClass('pion2');
        $(".active").removeClass('active');
        $(".pion1").addClass('active');
        $(this).addClass('pion2');


    }

    voisin = [$(".active").attr("data-vgauche"), $(".active").attr("data-vhaut"), $(".active").attr("data-vdroite"), $(".active").attr("data-vbas")];
    $("#" + voisin[0]).addClass('jouable');
    $("#" + voisin[1]).addClass('jouable');
    $("#" + voisin[2]).addClass('jouable');
    $("#" + voisin[3]).addClass('jouable');
    console.log(voisin);



    if ($(".jouable").hasClass("pion1") || $(".jouable").hasClass("pion2")) {
        $(".pion1").removeClass("jouable");
        $(".pion2").removeClass("jouable");
    }
    $(".jouable").addClass("pionShadow");

});



$("#77").addClass('pion1');
$("#77").addClass('active');
$("#5").addClass('pion2');


$(".mur").on("click", function () {
    $(".jouable").removeClass('pionShadow');
    $(".jouable").removeClass('jouable');
    mvoisin = [$(this).attr("data-mgauche"), $(this).attr("data-mhaut"), $(this).attr("data-mdroite"), $(this).attr("data-mbas"), ];


    if ($(this).hasClass("horizontal") && $(".pion1").hasClass("active")) {
        $(this).addClass("murSolid");
        $("#mur" + mvoisin[2]).addClass("murSolid");
        let prochainHmur = $("#mur" + mvoisin[2]).attr("data-mdroite");
        $("#mur" + prochainHmur).addClass("murSolid");

        $(".pion1").removeClass("active");
        $(".pion2").addClass("active");


    } else if ($(this).hasClass("horizontal") && $(".pion2").hasClass("active")) {
        $(this).addClass("murSolid");
        $("#mur" + mvoisin[2]).addClass("murSolid");
        let prochainHmur = $("#mur" + mvoisin[2]).attr("data-mdroite");
        $("#mur" + prochainHmur).addClass("murSolid");

        $(".pion2").removeClass("active");
        $(".pion1").addClass("active");


    } else if ($(this).hasClass("vertical") && $(".pion1").hasClass("active")) {

        $(this).addClass("murSolid");
        $("#mur" + mvoisin[3]).addClass("murSolid");

        //  let prochainVMur = $("#mur" + mvoisin[3]).attr("data-mbas");
        //  $("#mur" + prochainVMur ).addClass("murSolid");
        $(".pion1").removeClass("active");
        $(".pion2").addClass("active");
    } else if ($(this).hasClass("vertical") && $(".pion2").hasClass("active")) {

        $(this).addClass("murSolid");
        $("#mur" + mvoisin[3]).addClass("murSolid");

        //  let prochainVMur = $("#mur" + mvoisin[3]).attr("data-mbas");
        //  $("#mur" + prochainVMur ).addClass("murSolid");
        $(".pion2").removeClass("active");
        $(".pion1").addClass("active");
    }


    voisin = [$(".active").attr("data-vgauche"), $(".active").attr("data-vhaut"), $(".active").attr("data-vdroite"), $(".active").attr("data-vbas")];
    $("#" + voisin[0]).addClass('jouable');
    $("#" + voisin[1]).addClass('jouable');
    $("#" + voisin[2]).addClass('jouable');
    $("#" + voisin[3]).addClass('jouable');
    $(".jouable").addClass("pionShadow");

});