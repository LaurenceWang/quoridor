let m = 1;
let c = 1;
for (let y = 0; y < 19; y++) {

    for (let i = 0; i < 17; i++) {


        //  $(".plateau").append(`<div class='case' id="case${i+(17*y)}"> </div>`)
        // $(".plateau").append("<div class='case'> </div>")

        if (y % 2 == 0) {
            //    $(".plateau").append(`<div class='case' id="mur${i+(17*y)-(9*y)}"> </div>`)
            $(".plateau").append(`<div class='rectangle' id="mur${m}"> </div>`)
            m = m + 1;

            if (i % 2 == 0) {

                $(".rectangle").eq((y * 17) + i).css({
                    "width": "60",
                    "height": "10",
                    "background-color": "green"
                });

            } else {

                $(".rectangle").eq((y * 17) + i).css({
                    "width": "10",
                    "height": "10",
                    "background-color": "green"
                })

            }
        } else {

            if (i % 2 == 0) {

                $(".plateau").append(`<div class='rectangle case' id="case${c}" data-vgauche=${c-1} data-vdroite=${c+1} data-vhaut=${c-9} data-vbas=${c+9}> </div>`)
                c = c + 1;
                $(".rectangle").eq((y * 17) + i).css({
                    "width": "60",
                    "height": "60"
                });

            } else {
                $(".plateau").append(`<div class='rectangle' id="mur${m}"> </div>`)
                m = m + 1;
                $(".rectangle").eq((y * 17) + i).css({
                    "width": "10",
                    "height": "60",
                    "background-color": "green"
                })
            }
        }


    }


}

$(".case").on("click", function () {
if($(".pion1").hasClass('active')){
    $(".pion1").removeClass('pion1');
    $(".pion1").removeClass('active')
    $(".pion2").addClass('active');
    $(this).addClass('pion1');

}

else if($(".pion2").hasClass('active')){
    $(".pion2").removeClass('pion2');
    $(".pion2").removeClass('active');
    $(".pion1").addClass('active');
    $(this).addClass('pion2');
}
});

//  $(".case").on("click", function () {
//      if($(".pion2").hasClass('active')){
//          $(".pion2").removeClass('pion2');
//          $("pion2").removeClass('active')
//          $(this).addClass('pion2');
    
//     }
//      });

$("#case77").addClass('pion1');
$("#case77").addClass('active');
$("#case5").addClass('pion2');


// if ($(".rectangle").hasClass('pion2')) {

//     $(".pion2").css({
//         "background-color": "rgb(85, 195, 238)"
//     });

// }