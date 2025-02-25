//ポーズ画面へ
function Pause(){
    fCir(750, 70, 50, "firebrick");
    fText("T", 750, 70, 80, "white");
    if(key[84]==1){
        key[84]++;
        SE(12);
        if(idx==1)
            idx = 4;
        else if(idx==0)
            idx = 5;
    }
    if(20<tapY && tapY<120 && tapC>0){
        if(700<tapX && tapX<800){
            tapC=0;
            SE(12);
            if(idx==1)
                idx = 4;
            else if(idx==0)
                idx = 5;
        }
    }
}