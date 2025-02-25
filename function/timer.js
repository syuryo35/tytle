function timeCount(){
    sRect(920, 450, -250, 60, "white");
    if(count==1){
        col="orangered";
    }
    else if(count==2){
        col="orange";
    }
    else if(count==3){
        col="gold";
    }
    else if(count==4){
        col="green";
    }
    //バーを短くしていく
    if(idx==1){
        if(gameTime%4==0 && gameTime!=5000){
        barx1+=1;
            //countを下げてバーの色を変える
            if(barx1==0){
                count--;
                barx1=-250;
            }      
        }
    }
    
    //バーの枠
    fRect(barx, 450, barx1, 60, col);
    //残り本数
    fText("×"+count, 800, 480, 50, "white");
}