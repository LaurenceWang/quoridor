let m = 1;
let c = 1;
for(let y=0; y<19; y++){ 
    
    for(let i=0; i<17; i++){

        
        //  $(".plateau").append(`<div class='case' id="case${i+(17*y)}"> </div>`)
        // $(".plateau").append("<div class='case'> </div>")
      
        if(y%2==0){ 
        //    $(".plateau").append(`<div class='case' id="mur${i+(17*y)-(9*y)}"> </div>`)
        $(".plateau").append(`<div class='case' id="mur${m}"> </div>`)
          m=m+1;
          
            if(i%2==0){ 
                
                $(".case").eq((y*17)+i).css({"width":"60","height":"10","background-color":"green"});
                
               }

       
               else{
                
                   $(".case").eq((y*17)+i).css({"width":"10","height":"10","background-color":"green"})
                   
               }
        }   
            
        else{ 
            
        if(i%2==0){ 
            
           $(".plateau").append(`<div class='case' id="case${c}"> </div>`)
           c=c+1;
            $(".case").eq((y*17)+i).css({"width":"60","height":"60","background-color":"rgb(190, 126, 89)"});
            
        }

        else{
            $(".plateau").append(`<div class='case' id="mur${m}"> </div>`)
            m=m+1;
            $(".case").eq((y*17)+i).css({"width":"10","height":"60","background-color":"green"})
        }
        }

        
}
   

}    
    

  


