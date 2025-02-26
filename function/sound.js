//効果音
function SE(i){
    if(Smode==0)
        playSE(i);
}
//BGM
function BGM(i){
    if(Smode==0)
        playBgm(i);
    else
        stopBgm(i);
}

//音のON、OFF
function Sound(){
    //タップ判定
    if(25<tapY && tapY<110 && tapC>0){
        if(860<tapX && tapX<940){
            //tapC=0;    
            //モードチェンジ
            //消音
            if(Smode==0){
                Smode=1; 
            }
            //音を出す
            else{
                Smode=0;
                SE(13);
            }
        }
    }
          
    //キー判定
    if(key[83]==1){
        key[83]++;
        if(Smode==0){
            Smode=1; 
        }       
        else{
            Smode=0;
            SE(13);
        }         
    }
    //描画
    if(Smode==0){
        fCir(900,70,40,"blue");
    }
    else{
        lineW(5);
        sCir(900,70,40,"blue");
        line(880, 105, 930, 35, "white");
    }
    //音符
    fCir(900, 90, 13, "white");
    lineW(5);
    line(910, 90, 910, 35, "white");
}
