let m = 1; //compteur mur
let c = 1; //compteur case 
let s1 = 1; //compteur mur storage joueur 1
let s2 = 1; //compteur mur storage joueur 2 
let compteurS1 = 1; //compteur murs utilisés joueur 1
let compteurS2 = 1; //compteur murs utilisés joueur 2
let scoreR = 0; //score joueur rouge
let scoreG = 0; //score joueur vert
let winner = ''; //couleur du gagnant

$(".winModal").hide();

//Création du plateau

function plateau() {
    for (let y = 0; y < 17; y++) {

        //rangées
        for (let i = 0; i < 17; i++) {

            //murs restants dans une rangée pour un mur donné
            let murRestant = Math.floor((17 - i) / 2);

            //cases et murs verticaux pour les y paires
            if (y % 2 == 0) {

                if (i % 2 == 0) {

                    //création de cases
                    $(".plateau").append(`<div class='rectangle case' id="${c}" data-vgauche=${c-1} data-vdroite=${c+1} data-vhaut=${c-9} data-vbas=${c+9} data-vmurGauche=${m-1} data-vmurDroite=${m} data-vmurHaut=${m- (murRestant)*2 - (8 - murRestant + 1) } data-vmurBas=${m + murRestant + (8 - murRestant) *2} data-unvisited='true'> </div>`)
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
                $(".plateau").append(`<div class='rectangle mur horizontal libre' id="mur${m}" data-numero=${m} data-mgauche=${m-1}  data-mdroite=${m+1}  data-mhaut=${m-25}  data-mbas=${m+25} data-mvertiHaut=${m-(i)-murRestant}> </div>`)
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
                    $(".rectangle").eq((y * 17) + i).removeClass("libre");
                    $(".rectangle").eq((y * 17) + i).addClass("intersection");

                }
            }


        }


    }

}

plateau();

function creerStorage(storageNumber, murStorage, murNumber, s) {

    for (let x = 0; x < 21; x++) {

        $("." + storageNumber).append(`<div class=${murStorage}></div>`)

        if (x % 2 == 0) {

            $("." + murStorage).eq(x).css({
                "width": "65",
                "height": "100",
            });

        } else {

            //murs du storage 
            $("." + murStorage).eq(x).css({
                "width": "10",
                "height": "120",

            })

            $("." + murStorage).eq(x).addClass("murj1");

            //ajout de l'id pour les murs du storage
            $("." + murStorage).eq(x).attr("id", murNumber + `${s}`);
            s = s + 1;
        }

    }


}

//création des zones de stockage
creerStorage('storageUn', 'murStoragej1', 'murUn', s1);

creerStorage('storageDeux', 'murStoragej2', 'murDeux', s2);


let voisin = []; //cases voisines du joueur actif
let mvoisin = []; //voisins des murs cliqués
let voisinMur = []; //murs voisins du joueur actif

initialState(); //initialisation du jeu

//détermination du tour 
function actif(j) {

    $(".active").removeClass('active')
    $("." + j).addClass('active');
}


//déplacement des pions
$("body").on("click", ".jouable", function () {

    //suppression des classes jouables qui seront rajoutées à nouveau en fonction de la case du joueur actif
    $(".jouable").removeClass('pionShadow');
    $(".jouable").removeClass('jouable');

    //joueur 1 actif
    if ($(".pion1").hasClass('active')) {

        actif("pion2");
        $(".pion1").removeClass("pion1 pion"); //suppression du pion sur l'ancienne case
        $(this).addClass('pion1 pion'); //ajout du pion sur la nouvelle classe

        //joueur 2 actif 
    } else if ($(".pion2").hasClass('active')) {

        actif("pion1");
        $(".pion2").removeClass("pion2 pion");
        $(this).addClass('pion2 pion');

    }

    caseJouable();
    caseInjouable();
    saut();
    $(".jouable").addClass("pionShadow"); //ajout d'ombres sur les cases jouables 

    $(".case").attr('data-unvisited', 'true'); //réinitialisation des data-unvisited
    parcoursProfondeur($('.active').attr('id'));

    //non-blocage
    //if (parcoursProfondeur) {
   
    //} else if (!parcoursProfondeur) {
        
    //}

    //déclaration des gagnants lorsqu'ils atteignent leur bout respectif du plateau
    if ($(".pion1").attr("id") < 10) {

        scoreR++;
        initialState();
        declareWinner();

    } else if ($(".pion2").attr("id") > 72) {
        scoreG++;

        initialState();
        declareWinner();

    }

});

//fenêtre modale 
$('.play').on("click", function () {
    $(".winModal").hide();
})


//jouer une nouvelle partie (réinitialisation des scores)
$('.restart').on("click", function () {
    $(".winModal").hide();
    scoreR = 0;
    scoreG = 0;
    $('.redScore').text(scoreR);
    $('.greenScore').text(scoreG);

})

$(".mur").hover(

    function () {

        mvoisin = [$(this).attr("data-mgauche"), $(this).attr("data-mhaut"), $(this).attr("data-mdroite"), $(this).attr("data-mbas"), ];

        if ($(this).hasClass("horizontal") && !($(this).attr("data-numero") % 25 == 0) && $(this).hasClass("libre")) {

            $(this).addClass("hover");
            let prochainHmur = $("#mur" + mvoisin[2]).attr("data-mdroite");
            $("#mur" + mvoisin[2]).addClass("hover");
            $("#mur" + prochainHmur).addClass("hover");
        } else if ($(this).hasClass("vertical") && $(this).attr("data-numero") < 201 && $(this).hasClass("libre")) {
            let prochainInter = $(this).attr("data-intersectionBas");
            $(this).addClass("hover");
            $("#mur" + prochainInter).addClass("hover");
            $("#mur" + mvoisin[3]).addClass("hover");
        }

    },
    function () {
        $(".horizontal").removeClass("hover");
        $(".vertical").removeClass("hover");

    }
);


//click sur un mur

$("body").on("click", ".libre", function () {
    $(".jouable").removeClass('pionShadow');
    $(".jouable").removeClass('jouable');

    //affectation des valeurs des murs voisins du mur cliqué
    mvoisin = [$(this).attr("data-mgauche"), $(this).attr("data-mhaut"), $(this).attr("data-mdroite"), $(this).attr("data-mbas"), ];

    let mvertiHaut = $(this).attr("data-mvertiHaut");
    let prochainInter = $(this).attr("data-intersectionBas"); //prochaine intersection
    let interVgauche = $("#mur" + prochainInter).attr("data-mgauche"); //voisin gauche de l'intersection

    //mur cliqué horizontal lorsque le joueur 1 est actif et qu'il lui reste encore des murs dans son storage
    if ($(this).hasClass("horizontal") && $(".pion1").hasClass("active") && compteurS1 < 11) {

        $(this).removeClass("libre"); //mur cliqué n'est plus libre

        //impossible de placer un mur au bord droit du plateau
        if (!($(this).attr("data-numero") % 25 == 0)) {

            $(this).addClass("murSolid"); //mur cliqué est placé          
            murHorizontal();
            $("#mur" + mvertiHaut).removeClass("libre");

            actif("pion2");

            //le mur du storage joueur 1 est utilisé
            murDisparait("murUn", compteurS1);
            compteurS1 = compteurS1 + 1;
        }

        //même chose pour le joueur 2
    } else if ($(this).hasClass("horizontal") && $(".pion2").hasClass("active") && compteurS2 < 11) {
        $(this).removeClass("libre");
        // let prochainHmur = $("#mur" + mvoisin[2]).attr("data-mdroite");
        if (!($(this).attr("data-numero") % 25 == 0)) {

            $(this).addClass("murSolid");
            murHorizontal();
            $("#mur" + mvertiHaut).removeClass("libre");

            actif("pion1");

            murDisparait("murDeux", compteurS2);
            compteurS2 = compteurS2 + 1;
        }

    } else if ($(this).hasClass("vertical") && $(".pion1").hasClass("active") && compteurS1 < 11) {
        $(this).removeClass("libre");

        //impossible de placer un mur au bord bas du plateau
        if ($(this).attr("data-numero") < 201) {
            $(this).addClass("murSolid");
            $("#mur" + prochainInter).addClass("murSolid");
            murVertical();
            $("#mur" + interVgauche).removeClass("libre"); //pas de chevauchement entre les murs horizontaux et verticaux


            actif("pion2");

            murDisparait("murUn", compteurS1);
            compteurS1 = compteurS1 + 1;
        }
        //même chose pour le joueur 2
    } else if ($(this).hasClass("vertical") && $(".pion2").hasClass("active") && compteurS2 < 11) {
        $(this).removeClass("libre");

        if ($(this).attr("data-numero") < 201) {
            $(this).addClass("murSolid");
            $("#mur" + prochainInter).addClass("murSolid");
            murVertical();
            $("#mur" + interVgauche).removeClass("libre");

            actif("pion1");

            murDisparait("murDeux", compteurS2);
            compteurS2 = compteurS2 + 1;
        }
    }

    caseJouable();
    caseInjouable();
    saut();
    $(".jouable").addClass("pionShadow");
    $(".case").attr('data-unvisited', 'true');
    parcoursProfondeur($('.active').attr('id'));

});

// CASES

function caseInjouable() {
    if ($(".jouable").hasClass("pion")) {
        $(".pion").removeClass("jouable");
    }
};

function caseJouable() {

    voisin = [$(".active").attr("data-vgauche"), $(".active").attr("data-vhaut"), $(".active").attr("data-vdroite"), $(".active").attr("data-vbas")];

    //affectation des valeurs des murs voisins de la case active
    voisinMur = [$(".active").attr("data-vmurGauche"), $(".active").attr("data-vmurHaut"), $(".active").attr("data-vmurDroite"), $(".active").attr("data-vmurBas")];

    //impossible de jouer sur la case voisine gauche d'une case au bord gauche du plateau, impossible de jouer sur la case voisine gauche d'un mur placé
    if (!(($(".active").attr("id") - 1) % 9 == 0) && !($("#mur" + voisinMur[0]).hasClass("murSolid"))) {
        $("#" + voisin[0]).addClass('jouable');
    }

    if (!($("#mur" + voisinMur[1]).hasClass("murSolid"))) {
        $("#" + voisin[1]).addClass('jouable');
    }
    //impossible de jouer sur la case voisine droite d'une case au bord droit du plateau
    if (!($(".active").attr("id") % 9 == 0) && !($("#mur" + voisinMur[2]).hasClass("murSolid"))) {
        $("#" + voisin[2]).addClass('jouable');
    }
    if (!($("#mur" + voisinMur[3]).hasClass("murSolid"))) {
        $("#" + voisin[3]).addClass('jouable');
    }
}

//saut lorsque les pions sont à côté 
function saut() {


    if ($("#" + voisin[0]).hasClass('pion') && !(($("#" + voisin[0]).attr("id") - 1) % 9 == 0) && !($("#mur" + voisinMur[0]).hasClass("murSolid"))) {
        //voisin gauche du pion adverse
        let vgaucheAdv = $("#" + voisin[0]).attr("data-vgauche");
        $("#" + vgaucheAdv).addClass("jouable");
    }


    if ($("#" + voisin[1]).hasClass('pion') && !$("#mur" + voisinMur[1]).hasClass("murSolid")) {
        let vhautAdv = $("#" + voisin[1]).attr("data-vhaut");
        $("#" + vhautAdv).addClass("jouable");
    };

    if ($("#" + voisin[2]).hasClass('pion') && !($("#" + voisin[2]).attr("id") % 9 == 0) && !$("#mur" + voisinMur[2]).hasClass("murSolid")) {
        let vdroitAdv = $("#" + voisin[2]).attr("data-vdroite");
        $("#" + vdroitAdv).addClass("jouable");
    };

    if ($("#" + voisin[3]).hasClass('pion') && !$("#mur" + voisinMur[3]).hasClass("murSolid")) {
        let vbasAdv = $("#" + voisin[3]).attr("data-vbas");
        $("#" + vbasAdv).addClass("jouable");
    };

}


// MURS

function murHorizontal() {

    let prochainHmur = $("#mur" + mvoisin[2]).attr("data-mdroite"); //prochain mur horizontal
    let precedentHmur = $("#mur" + mvoisin[0]).attr("data-mgauche"); //précédent mur horizontal   

    $("#mur" + mvoisin[2]).addClass("murSolid");
    $("#mur" + prochainHmur).addClass("murSolid");
    //impossible de cliquer sur les murs adjacents au mur cliqué
    $("#mur" + precedentHmur).removeClass("libre");
    $("#mur" + prochainHmur).removeClass("libre");

}

function murVertical() {
    $("#mur" + mvoisin[3]).addClass("murSolid"); //prochain mur vertical solide 
    $("#mur" + mvoisin[3]).removeClass("libre"); //impossible de cliquer sur les murs adjacents au mur cliqué 
    $("#mur" + mvoisin[1]).removeClass("libre");
}

function murDisparait(murNum, compteurNum) {

    $("#" + murNum + compteurNum).css({
        "opacity": "0"
    });
}

function initialState() {

    //initialisation de l'état
    $(".case").removeClass("pion");
    $(".case").removeClass("pion1");
    $(".case").removeClass("pion2");
    $(".case").removeClass('jouable');
    $(".case").removeClass("pionShadow");
    $(".murSolid").addClass("libre");
    $(".intersection").removeClass("libre");
    $(".mur").removeClass("murSolid");


    $("#77").addClass('pion1 pion'); //placement du joueur 1
    $("#77").addClass('active'); //joueur 1 actif
    $("#5").addClass('pion2 pion'); //placement du joueur 2

    //voisins du joueur 1 jouables
    $("#76").addClass('jouable');
    $("#78").addClass('jouable');
    $("#68").addClass('jouable');
    $(".jouable").addClass("pionShadow");
}


function declareWinner() {


    $('.redScore').text(scoreR);
    $('.greenScore').text(scoreG);
    $(".winModal").show();
    $(".winModal").addClass("slide-top");
    $('.winnerColor').text(winner);


}

//Non-blocage des murs
function parcoursProfondeur(id) {

    let caseVoisine;
    let murVoisin;

    if ($("#" + id).attr("data-unvisited") == 'true') {

        caseVoisine = [$("#" + id).attr("data-vgauche"), $("#" + id).attr("data-vhaut"), $("#" + id).attr("data-vdroite"), $("#" + id).attr("data-vbas")];
        murVoisin = [$("#" + id).attr("data-vmurGauche"), $("#" + id).attr("data-vmurHaut"), $("#" + id).attr("data-vmurDroite"), $("#" + id).attr("data-vmurBas")];

        $("#" + id).attr('data-unvisited', 'false');
        for (let i = 0; i < caseVoisine.length; i++) {

            parcoursProfondeur(caseVoisine[i]);

            if ($("#" + murVoisin[i]).hasClass('murSolid')) {
                $("#" + caseVoisine[i]).attr('data-unvisited', 'false');
            }

            if ((caseVoisine[1] < 3 || caseVoisine[1] > 72) && (caseVoisine[3] < 3 || caseVoisine[3] > 72)) {
                return true;
            } else {
                return false
            }

        }
    }
    return true;
}