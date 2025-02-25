function mission(){
    fText("MISSION", 800, 730, 40, "white");
    MissionStart();
    
    if(m_random<=2){
        drawImgS(random, 730, 760, 80, 64.561);
        fText("を", 850, 800, 40, "white");
    }
    if(m_random==1){
        fText("5個以上同時に消せ",790, 870, 40, "white");
    }
    else if(m_random==2){
        fText("合計6個以上消せ",790, 870, 40, "white");
        fText("現在"+b_count+"個", 800, 920, 40, "white");
    }
    else if(m_random==3){
        drawImgS(random, 650, 760, 80, 64.561);
        fText("か、", 780, 800, 40, "white");
        drawImgS(random2, 800, 760, 80, 64.561);
        fText("を", 900, 800, 40, "white");
        fText("合計9個以上消せ",790, 870, 40, "white");
        fText("現在"+b_count+"個", 800, 920, 40, "white");
    }
}

function MissionStart(){
    if(gameTime==5000 || mflg>0 || random==random2){
        m_random = Math.floor(Math.random()*3)+1;
        if(nan==0){
            random = Math.floor(Math.random()*4)+1;
            random2 = Math.floor(Math.random()*4)+1;
        }
        else{
            random = Math.floor(Math.random()*6)+1;
            random2 = Math.floor(Math.random()*6)+1;
        }
    }
}