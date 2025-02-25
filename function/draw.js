/*------ゲーム画面を描く------*/
function drawPzl(){
    var x, y;
    drawImg(0, 0, 0);
    //パズルの枠を描く
    lineW(10);
    sRect(30, 30, 580, 900, "white");
    Button(); 
    timeCount();
    mission();
    //次のブロック表示
    for(x=0; x<2; x++)
        drawImg(block[2+x], 700+80*x, 150);
    fTextN("残り時間", 800, 400, 70, 60, "white");//タイム表示
    fTextN("スコア\n"+score, 800, 620, 70, 60, "white");
    //積んだブロック表示
    for(y=1; y<=11; y++){
        for(x=1; x<=7; x++){
            if(masu[y][x] > 0)
                drawImgC(masu[y][x], 80*x, 80*y);
        }
    }
    
    if(gameProc == 0){
        for(x=-1; x<=0; x++)
            drawImgC(block[1+x], 80*(myBlockX+x), 80*myBlockY-2);
    }
    //消す処理
    if(gameProc == 3){
        //得点表示
        fText(points+"pts", 320, 120, 50, RAINBOW[tmr%8]);
        if(mflg==1){
            fText("score + 500", 320, 240, 50, RAINBOW[tmr%8]);
            //ミッションボーナス
            if(m_count==3){
                fText("BOUNUS!\n+1000 pts", 320, 360, 50, RAINBOW[tmr%8]);
            }
            setTimeout(function() {
                mflg=0;
            }, 1000); 
        }
    }
    //難易度表示
    if(nan == 0){
        fText("Normal", 800, 300, 60, "white");
    }
    if(nan == 1){
        fText("Hard", 800, 300, 60, "white");
    }
    
}