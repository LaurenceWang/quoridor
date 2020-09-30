
//  //289 cases
// //case paire = case pour mettre les murs 

// var c = document.getElementById("myCanvas");
// var ctx = c.getContext("2d");
// ctx.fillRect(20, 20, 150, 100);
   
// //    for (var i=0; i<18; i++){


// var largeurPlateau= $(".plateau").width();

// console.log(largeurPlateau);

// //    }

for(var y=0; y<9; y++){ 

for(var i=0; i<9; i++){
    $(".plateau").append("<div class='case'> </div>")
}

}

//  $(".case").css("width", $(".plateau").width()/9);

// $(".case").css("height", $(".plateau").width()/9); 


$(".case").css({"width":"60","height":"60"});

