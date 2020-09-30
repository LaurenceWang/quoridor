for(var y=0; y<19; y++){ 

    for(var i=0; i<17; i++){
        $(".plateau").append("<div class='case'> </div>")

        if(y%2==0){ 
            if(i%2==0){ 
                $(".case").eq((y*17)+i).css({"width":"60","height":"10","background-color":"green"});
               }
       
               else{
                   $(".case").eq((y*17)+i).css({"width":"10","height":"10","background-color":"green"})
               }
        }

        else{ 
        if(i%2==0){ 
         $(".case").eq((y*17)+i).css({"width":"60","height":"60","background-color":"rgb(190, 126, 89)"});
        }

        else{
            $(".case").eq((y*17)+i).css({"width":"10","height":"60","background-color":"green"})
        }
        }
}
     
    }    
    



