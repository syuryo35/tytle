function setEffect(x, y){
    effX[effN] = x;
    effY[effN] = y;
    effT[effN] = 20;
    effN = (effN+1)%EFF_MAX;
}

//エフェクトを描く
function drawEffect(){
    lineW(20);
    for(var i=0; i<EFF_MAX; i++){
        if(effT[i] > 0){
            setAlp(effT[i]*5);
            sCir(effX[i], effY[i], 110-effT[i]*5, RAINBOW[(effT[i]+0)%8]);
            sCir(effX[i], effY[i],  90-effT[i]*4, RAINBOW[(effT[i]+1)%8]);
            sCir(effX[i], effY[i],  70-effT[i]*3, RAINBOW[(effT[i]+2)%8]);
            effT[i]--;
        }
    }
    setAlp(100);
    lineW(1);
}
