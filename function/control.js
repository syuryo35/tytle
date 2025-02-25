/*------ブロック操作-------*/
function procPzl(){
    var c, i, n, x, y;
    if(tapC>0 && 960<tapY && tapY<1200){
        c = int(tapX/240);
        if(0<=c && c<=3)
            tapKey[c]++;
    }
    else{
        for(i=0; i<4; i++)
            tapKey[i] = 0;
    }
    switch(gameProc){
        //ブロック移動
        case 0:
        //ブロックが落ちてから少し待つ
        if(tmr < 10)
            break;
        //左キー
        if(key[37]==1 || key[37]>4) {
            key[37]++;
            if(masu[myBlockY][myBlockX-2] == 0) 
                myBlockX --;
        }
        if(key[39]==1 || key[39]>4) {
            key[39]++;
            if(masu[myBlockY][myBlockX+1] == 0) 
                myBlockX ++;
        }
        if(key[32]==1 || key[32]>4) {//ブロックの入れ替え
            key[32]++;
            i = block[1];
            block[1] = block[0];
            block[0] = i;
        }
        //タップでの操作
        if(tapKey[0]==1 || tapKey[0]>8) {
            if(masu[myBlockY][myBlockX-2] == 0) 
                myBlockX --;
        }
        if(tapKey[2]==1 || tapKey[2]>8) {
            if(masu[myBlockY][myBlockX+1] == 0) 
                myBlockX ++;
        }
        if(tapKey[3]==1 || tapKey[3]>8) {//ブロックの入れ替え
            i = block[1];
            block[1] = block[0];
            block[0] = i;
        }
        //下に落とす
        if(gameTime%dropSpd==0 || key[40]>0 || tapKey[1]>1) {
            if(masu[myBlockY+1][myBlockX-1]+masu[myBlockY+1][myBlockX] == 0) {
                myBlockY ++;//下に何もなければ落下させる
            }
            else {//ブロックをマス目上に置く
                masu[myBlockY][myBlockX-1] = block[0];
                masu[myBlockY][myBlockX  ] = block[1];
                rensa = 1;//連鎖回数を1に
                gameProc = 1;//全体のブロックを落下させる処理へ
            }
        }
        break;

        //下が空いていればブロックを落とす
        case 1:
         //落としたブロックがあるか
        c = 0;
        //下から上へ向かって調べる
        for(y=10; y>=1; y--){
            for(x=1; x<=7; x++){
                if(masu[y][x]>0 && masu[y+1][x]==0){
                    masu[y+1][x] = masu[y][x];
                    masu[y][x] = 0;
                    c = 1;
                }
            }
        }
        //全て落としたら次へ
        if(c == 0)
            gameProc = 2;
        break;

        //ブロックが揃ったか判定
        case 2:
        for(y=1; y<=11; y++){
            for(x=1; x<=7; x++){
                c = masu[y][x];
                if(c > 0){
                    //縦に３つ揃っている
                    if(c==masu[y-1][x] && c==masu[y+1][x]){
                        kesu[y][x] = 1;
                        kesu[y-1][x]=1;
                        kesu[y+1][x]=1;
                    }
                    //横に３つ揃っている
                    if(c==masu[y][x-1] && c==masu[y][x+1]){
                        kesu[y][x] = 1;
                        kesu[y][x-1]=1;
                        kesu[y][x+1]=1;
                    }
                    if(mode1==0){
                        //斜め/に３つ揃っている
                        if(c==masu[y+1][x-1] && c==masu[y-1][x+1]){
                            kesu[y][x] = 1;
                            kesu[y+1][x-1]=1;
                            kesu[y-1][x+1]=1;
                        }
                        //斜め\に３つ揃っている
                        if(c==masu[y-1][x-1] && c==masu[y+1][x+1]){
                            kesu[y][x] = 1;
                            kesu[y-1][x-1]=1;
                            kesu[y+1][x+1]=1;
                        }
                    }
                    if(mode1==1){
                        //　┘┘の型につながっている
                        if(c==masu[y][x-1] && c==masu[y-1][x]){
                            kesu[y][x]=1;
                            kesu[y][x-1]=1;
                            kesu[y-1][x]=1;
                        }
                        //　└の型につながっている
                        if(c==masu[y][x+1] && c==masu[y-1][x]){
                            kesu[y][x]=1;
                            kesu[y][x+1]=1;
                            kesu[y-1][x]=1;
                        }
                        //　┐の型につながっている
                        if(c==masu[y][x-1] && c==masu[y+1][x]){
                            kesu[y][x]=1;
                            kesu[y][x-1]=1;
                            kesu[y+1][x]=1;
                        }
                        //　┌の型につながっている
                        if(c==masu[y][x+1] && c==masu[y+1][x]){
                            kesu[y][x]=1;
                            kesu[y][x+1]=1;
                            kesu[y+1][x]=1;
                        }
                    }
                }
            }
        }
        //揃ったブロックを数える
        n = 0;
        for(y=1; y<=11; y++){
            for(x=1; x<=7; x++){
                if(kesu[y][x] == 1){
                    n++;
                    blocktipe=masu[y][x];
                    setEffect(80*x, 80*y);
                }    
            }
        }
        //揃ったときのスコア計算
        if(n > 0){
            
            if(rensa == 1 && dropSpd > 5)
                dropSpd--;
            points = 50*n*rensa;
            if(nan==1)
                points=points*1.5;
            score += points;
            extend = 0;
            MissionStart();
            //5個以上同時消し
            if(n>=5 && blocktipe==random && m_random==1){        
                score+=500;
                mflg=1;
                m_count++;
            }   
            //トータル消し
            if(blocktipe==random && m_random==2){
                b_count+=n;
                if(b_count>=6){
                    b_count=0;
                    score+=500;
                    mflg=1;
                    m_count++;
                }
            }
            //2色消し
            if(m_random==3){
                if(blocktipe==random || blocktipe==random2){
                    b_count+=n;
                    if(b_count>=9){
                        b_count=0;
                        score+=500;
                        mflg=1;
                        m_count++;
                    }
                }
            }
            

            //ミッションボーナス
            if(m_count==3){
                score+1000;
                
            }
            //消すときの効果音
            if(mflg==0)
                SE(1);
            else
                SE(2);

            if(score>hisco){
                hisco=score;
                saveLS(0, hisco);
            }        
            
            rensa = rensa*2;
            eftime = 0;
            gameProc = 3;//消す処理へ
        }
        //次に落ちてくるブロックをセット
        else {
            myBlockX = 4;
            myBlockY = 1;
            if(masu[myBlockY][myBlockX-1]+masu[myBlockY][myBlockX] > 0)
                return 0;
            block[0] = block[2];
            block[1] = block[3];
            c=4;
            if(nan==1){
                c=6
            }
            block[2] = 1+rnd(c);
            block[3] = 1+rnd(c);
            gameProc = 0;
            tmr = 0;
        }
        break;

        //ブロックを消す処理
        case 3:
        eftime ++;
        if(eftime == 20){
            for(y=1; y<=11; y++){
                for(x=1; x<=7; x++){
                    if(kesu[y][x] == 1){
                        kesu[y][x] = 0;
                        masu[y][x] = 0;
                    }
                }
            }
            gameProc = 1;
        }
        break;
    }
    gameTime--;
    return gameTime;
}