let m = 1; //compteur mur
let c = 1; //compteur case 
let s1 = 1; //compteur mur storage joueur 1
let s2 = 1; //compteur mur storage joueur 2 
let compteurS1 = 1; //compteur murs utilisés joueur 1
let compteurS2 = 1; //compteur murs utilisés joueur 2

//Création du plateau

for (let y = 0; y < 17; y++) {

    //rangées
    for (let i = 0; i < 17; i++) {

        //murs restants dans une rangée pour un mur donné
        let murRestant = Math.floor((17 - i) / 2);

        //cases et murs verticaux pour les y paires
        if (y % 2 == 0) {

            if (i % 2 == 0) {

                //création de cases
                $(".plateau").append(`<div class='rectangle case' id="${c}" data-vgauche=${c-1} data-vdroite=${c+1} data-vhaut=${c-9} data-vbas=${c+9} data-vmurGauche=${m-1} data-vmurDroite=${m} data-vmurHaut=${m- (murRestant)*2 - (8 - murRestant + 1) } data-vmurBas=${m + murRestant + (8 - murRestant) *2}> </div>`)
                c = c + 1;
                $(".rectangle").eq((y * 17) + i).css({
                    "width": "60",
                    "height": "60"
                });

                //création des murs verticaux
            } else {
                $(".plateau").append(`<div class='rectangle mur vertical libre' id="mur${m}" data-numero=${m} data-mgauche=${m-1}  data-mdroite=${m+1}  data-mhaut=${m-25}  data-mbas=${m+25} data-intersectionBas=${m+ murRestant + (8 - murRestant) *2 +1}> </div>`)
                m = m + 1;
                $(".rectangle").eq((y * 17) + i).css({
                    "width": "10",
                    "height": "60",

                })

            }

        } else {

            //création murs horizontaux 
            $(".plateau").append(`<div class='rectangle mur horizontal libre' id="mur${m}" data-numero=${m} data-mgauche=${m-1}  data-mdroite=${m+1}  data-mhaut=${m-25}  data-mbas=${m+25}> </div>`)
            m = m + 1;

            if (i % 2 == 0) {

                $(".rectangle").eq((y * 17) + i).css({
                    "width": "60",
                    "height": "10",

                });

            //création intersections 
            } else {


                $(".rectangle").eq((y * 17) + i).css({
                    "width": "10",
                    "height": "10",
                });

                //rendre les intersections non cliquables
                $(".rectangle").eq((y * 17) + i).removeClass("libre")

            }
        }


    }


}

//création du storage du joueur 1 

for (let a = 0; a < 21; a++) {

    $(".storageUn").append(`<div class='murStoragej1'></div>`)

    if (a % 2 == 0) {

        $(".murStoragej1").eq(a).css({
            "width": "65",
            "height": "100",
        });

    } else {

        //murs du storage 
        $(".murStoragej1").eq(a).css({
            "width": "10",
            "height": "120",

        })

        $(".murStoragej1").eq(a).addClass("murj1");

        //ajout de l'id pour les murs du storage
        $(".murStoragej1").eq(a).attr("id", `murUn${s1}`);
        s1 = s1 + 1;
    }

}

//création du storage du joueur 2
for (let b = 0; b < 21; b++) {

    $(".storageDeux").append(`<div class='murStoragej2'></div>`)

    if (b % 2 == 0) {

        $(".murStoragej2").eq(b).css({
            "width": "65",
            "height": "100",

        });

    } else {

        $(".murStoragej2").eq(b).css({
            "width": "10",
            "height": "120",

        })

        $(".murStoragej2").eq(b).addClass("murj1");
        $(".murStoragej2").eq(b).attr("id", `murDeux${s2}`);
        s2 = s2 + 1

    }

}


let voisin = []; //cases voisines du joueur actif
let mvoisin = []; //voisins des murs cliqués
let voisinMur = []; //murs voisins du joueur actif

//configuration initiale 
$("#77").addClass('pion1'); //placement du joueur 1
$("#77").addClass('active'); //joueur 1 actif
$("#5").addClass('pion2'); //placement du joueur 2

//voisins du joueurs 1 jouables
$("#76").addClass('jouable');
$("#78").addClass('jouable');
$("#68").addClass('jouable');

//visibilité des pions jouables
$(".jouable").addClass("pionShadow");

//évènement click sur une case
$("body").on("click", ".jouable", function () {

    //suppression des classes jouables qui seront rajoutées à nouveau en fonction de la case du joueur actif
    $(".jouable").removeClass('pionShadow');
    $(".jouable").removeClass('jouable');

    //joueur 1 actif
    if ($(".pion1").hasClass('active')) {
        $(".pion1").removeClass('pion1'); //suppression du pion sur l'ancienne case
        $(".active").removeClass('active') //joueur 1 n'est plus actif
        $(".pion2").addClass('active'); //joueur 2 est actif
        $(this).addClass('pion1'); //ajout du pion sur la nouvelle classe

        //joueur 2 actif 
    } else if ($(".pion2").hasClass('active')) {
        $(".pion2").removeClass('pion2');
        $(".active").removeClass('active');
        $(".pion1").addClass('active');
        $(this).addClass('pion2');


    }

    //affectation des valeurs des cases voisines de la case active
    voisin = [$(".active").attr("data-vgauche"), $(".active").attr("data-vhaut"), $(".active").attr("data-vdroite"), $(".active").attr("data-vbas")];

    //affectation des valeurs des murs voisins de la case active
    voisinMur = [$(".active").attr("data-vmurGauche"), $(".active").attr("data-vmurHaut"), $(".active").attr("data-vmurDroite"), $(".active").attr("data-vmurBas")];


    //attribution des nouvelles cases jouables

    //impossible de jouer sur la case voisine gauche d'une case au bord gauche du plateau, impossible de jouer sur la case voisine gauche d'un mur placé
    if (!(($(".active").attr("id") - 1) % 9 == 0) && !($("#mur" + voisinMur[0]).hasClass("murSolid"))) {
        $("#" + voisin[0]).addClass('jouable');
    }

    if (!($("#mur" + voisinMur[1]).hasClass("murSolid"))) {
        $("#" + voisin[1]).addClass('jouable');
    }

    //impossible de jouer sur la case voisine droite d'une case au bord droit du plateau
    if (!($(".active").attr("id") % 9 == 0)) {
        $("#" + voisin[2]).addClass('jouable');
    }

    if (!($("#mur" + voisinMur[3]).hasClass("murSolid"))) {
        $("#" + voisin[3]).addClass('jouable');
    }

    //pas de chevauchements de pions sur la même case
    if ($(".jouable").hasClass("pion1") || $(".jouable").hasClass("pion2")) {
        $(".pion1").removeClass("jouable");
        $(".pion2").removeClass("jouable");
    }
    $(".jouable").addClass("pionShadow"); //ajout d'ombres sur les cases jouables 

    //déclaration des gagnants lorsqu'ils atteignent leur bout respectif du plateau
    if ($(".pion1").attr("id") < 10) {
        alert("Le joueur rouge a gagné la partie !")
    } else if ($(".pion2").attr("id") > 72) {
        alert("Le joueur vert a gagné la partie !")
    }

});




//évènement click sur un mur
$("body").on("click", ".libre", function () {
    $(".jouable").removeClass('pionShadow');
    $(".jouable").removeClass('jouable');


    //affectation des valeurs des murs voisins du mur cliqué
    mvoisin = [$(this).attr("data-mgauche"), $(this).attr("data-mhaut"), $(this).attr("data-mdroite"), $(this).attr("data-mbas"), ];

    //mur cliqué horizontal lorsque le joueur 1 est actif et qu'il lui reste encore des murs dans son storage
    if ($(this).hasClass("horizontal") && $(".pion1").hasClass("active") && compteurS1 < 11) {
        $(this).removeClass("libre"); //mur cliqué n'est plus libre
        let prochainHmur = $("#mur" + mvoisin[2]).attr("data-mdroite"); //prochain mur horizontal
        let precedentHmur = $("#mur" + mvoisin[0]).attr("data-mgauche") //précédent mur horizontal

        //impossible de placer un mur au bord droit du plateau
        if (!($(this).attr("data-numero") % 25 == 0)) {
            $(this).addClass("murSolid"); //mur cliqué est placé
            $("#mur" + mvoisin[2]).addClass("murSolid"); //intersection placé
            $("#mur" + prochainHmur).addClass("murSolid"); //prochain mur horizontal place  
            $("#mur" + precedentHmur).removeClass("libre"); //précédent mur horizontal ne peut pas être cliqué
            $("#mur" + prochainHmur).removeClass("libre");

            //changement de joueur actif
            $(".pion1").removeClass("active");
            $(".pion2").addClass("active");

            //le mur du storage joueur 1 est utilisé
            $("#murUn" + compteurS1).css({
                "background-color": "#505561"
            });
            compteurS1 = compteurS1 + 1;
        }
         //même chose pour le joueur 2
    } else if ($(this).hasClass("horizontal") && $(".pion2").hasClass("active") && compteurS2 < 11) {
        $(this).removeClass("libre");
        let prochainHmur = $("#mur" + mvoisin[2]).attr("data-mdroite");
        if (!($(this).attr("data-numero") % 25 == 0)) {
            $(this).addClass("murSolid");
            $("#mur" + mvoisin[2]).addClass("murSolid");
            $("#mur" + prochainHmur).addClass("murSolid");
            let precedentHmur = $("#mur" + mvoisin[0]).attr("data-mgauche")
            $("#mur" + precedentHmur).removeClass("libre");
            $("#mur" + prochainHmur).removeClass("libre");
            $(".pion2").removeClass("active");
            $(".pion1").addClass("active");

            $("#murDeux" + compteurS2).css({
                "background-color": "#505561"
            });
            compteurS2 = compteurS2 + 1;
        }

    } else if ($(this).hasClass("vertical") && $(".pion1").hasClass("active") && compteurS1 < 11) {
        $(this).removeClass("libre");
        let prochainInter = $(this).attr("data-intersectionBas"); 
        let interVgauche =  $("#mur" + prochainInter).attr("data-mgauche"); 
        let interVdroite =  $("#mur" + prochainInter).attr("data-mdroite");
        //impossible de placer un mur au bord bas du plateau
        if ($(this).attr("data-numero") < 201) {
            $(this).addClass("murSolid");
            $("#mur" + prochainInter).addClass("murSolid");
            $("#mur" + mvoisin[3]).addClass("murSolid");
            $("#mur" + mvoisin[3]).removeClass("libre");
            $("#mur" + mvoisin[1]).removeClass("libre");
            $("#mur" + interVgauche).removeClass("libre"); //pas de chevauchement entre les murs horizontaux et verticaux
            $("#mur" + interVdroite).removeClass("libre");
            $(".pion1").removeClass("active");
            $(".pion2").addClass("active");

            $("#murUn" + compteurS1).css({
                "background-color": "#505561"
            });
            compteurS1 = compteurS1 + 1;
        }
        //même chose pour le joueur 2
    } else if ($(this).hasClass("vertical") && $(".pion2").hasClass("active") && compteurS2 < 11) {
        $(this).removeClass("libre");
        let prochainInter = $(this).attr("data-intersectionBas"); 
        let interVgauche =  $("#mur" + prochainInter).attr("data-mgauche");
        let interVdroite =  $("#mur" + prochainInter).attr("data-mdroite");

        if ($(this).attr("data-numero") < 201) {
            $(this).addClass("murSolid");
            $("#mur" + prochainInter).addClass("murSolid");
            $("#mur" + mvoisin[3]).addClass("murSolid");
            $("#mur" + mvoisin[3]).removeClass("libre");
            $("#mur" + mvoisin[1]).removeClass("libre");
            $("#mur" + interVgauche).removeClass("libre");
            $("#mur" + interVdroite).removeClass("libre");
            $(".pion2").removeClass("active");
            $(".pion1").addClass("active");

            $("#murDeux" + compteurS2).css({
                "background-color": "#505561"
            });
            compteurS2 = compteurS2 + 1;
        }


    }


    voisin = [$(".active").attr("data-vgauche"), $(".active").attr("data-vhaut"), $(".active").attr("data-vdroite"), $(".active").attr("data-vbas")];
    if (!(($(".active").attr("id") - 1) % 9 == 0) && !($("#mur" + voisinMur[0]).hasClass("murSolid"))) {
        $("#" + voisin[0]).addClass('jouable');
    }
    $("#" + voisin[1]).addClass('jouable');

    if (!($(".active").attr("id") % 9 == 0)) {
        $("#" + voisin[2]).addClass('jouable');
    }
    $("#" + voisin[3]).addClass('jouable');

    if ($(".jouable").hasClass("pion1") || $(".jouable").hasClass("pion2")) {
        $(".pion1").removeClass("jouable");
        $(".pion2").removeClass("jouable");
    }
    $(".jouable").addClass("pionShadow");

});

