function setup(){
    clrBlock();
    canvasSize(960, 1200);
    loadImg(0, "image/hai.png");
    var BLOCK = ["ove", "B_ove", "G_ove", "Y_ove", "P_ove", "BR_ove", "GR_ove"];
    for(var i=0; i<=BLOCK.length; i++)
        loadImg(i+1, "image/"+BLOCK[i]+".png");

    var sound = ["delete", "mission", "start", "option", "check", 
        "score", "cansel", "gameover 1", "gameover 2", "mainBGM", 
        "tytle", "menu", "sound", "fainal"];
    for(var s=0; s<=sound.length; s++)
        loadSound(s+1, "sound/"+sound[s]+".mp3");
}

/*------メイン------*/
function mainloop(){
    tmr++;
    drawImg(0, 0, 0);
    switch(idx){
        case 0:
        var a,b,c,d,e,f;
        Pause();
        lineW(5);
        fText("判定設定", 500, 490, 80, "cyan");
        fText("難易度選択", 500, 170, 80, "cyan");
        Sound();
        //タップ判定上
        if(250<tapY && tapY<400 && tapC>0){
            //ノーマル
            if(50<tapX && tapX<400){
                a=1;
                b=0;
            }
            //ハード
             if(550<tapX && tapX<900){
                a=0;
                b=1;
            }
        }
        
        //タップ判定下
        if(560<tapY && tapY<710 && tapC>0){
            //斜め
            if(50<tapX && tapX<400){
                c=1;
                d=0;        
            }
            //かぎ型
            if(550<tapX && tapX<900){
                c=0;
                d=1;
            }
        }
        
        //決定ボタン判定
        if(900<tapY && tapY<1100 && tapC>0){
            if(150<tapX && tapX<800){
                f=1;
            }
        }
        //スコアリセット判定
        if(750<tapY && tapY<850 && tapC>0){
            if(300<tapX && tapX<650){
                e=1;
            }
        }

        //難易度選択
        if(a>0 || key[37]==1){
            if(nan==1){
                SE(4);
                nan = 0;
            }
        }   
        if(b>0 || key[39]==1){
            if(nan==0){
                SE(4);
                nan = 1;
            }
        }
        //斜め判定
        if(c>0 || key[38]==1){
            if(mode1==1){
                SE(4);
                mode1 = 0;
            }
        }   
        //かぎ型
        if(d>0 || key[40]==1){
            if(mode1==0){
                SE(4);
                mode1 = 1;
            }
        }
        
        //データリセット
        if(e>0 || key[82]==1){
            SE(5);
            idx=3;
        }
            
        //選択されているほうを光らせる
        //ノーマル
        if(nan==0){
            fRect(50, 250, 350, 150, "blue");
        }
        //ハード
        else{
            fRect(550, 250, 350, 150, "blue");
        }
        //斜め
        if(mode1==0){
            fRect(50, 560, 350, 150, "blue");
        }
        //かぎ型
        else{
            fRect(550, 560, 350, 150, "blue");
        }

        //ボタン表示
        //難易度
        sRect(50, 250, 350, 150, "white");
        fText("Normal", 220, 320, 80, "white");
        sRect(550, 250, 350, 150, "white");
        fText("Hard", 725, 320, 80, "white");
        //斜め判定
        sRect(50, 560, 350, 150, "white");
        fText("斜め", 220, 630, 80, "white");
        sRect(550, 560, 350, 150, "white");
        fText("かぎ型", 725, 630, 80, "white");
        //ゲームスタート
        sRect(150, 900, 650, 200, "white");
        fText("GAME START", 470, 1000, 80, "white");
        //スコアリセット
        sRect(300, 750, 350, 100, "white");
        fText("SCORE RESET", 480, 800, 50, "white");
        
        //ゲームスタート
        if(key[32]==1 || f>0){
            key[32]++;
            int(clrBlock());
            initvar();
            SE(3);
            idx++;
            tmr = 0;
        }
        
        break;
        
        //ゲームプレイ
        case 1:
        drawPzl();
        drawEffect();
        Sound();
        Pause();
        if(gameTime>500){
            BGM(10);
        }
        else if(500>gameTime){
            BGM(14);
        }
        else{
            stopBgm(10);
            stopBgm(14);
        }
        //ゲーム終了
        if(procPzl() == 0){
            stopBgm(10);
            stopBgm(14);
            idx++;
            tmr = 0;
            tmr++;
        }
        break;

        //ゲームオーバー
        case 2:
        Sound();
        var y,x;
        //ブロックが上まで行ったとき
        if(gameTime>1){
            drawPzl();
            for(y=11; y>=1; y--){
                for(x=1; x<=7; x++){
                    if(masu[y][x]>0){
                        console.log(masu[y][x]=7);
                    }
                }
            }
            if(tmr%40 < 20)
                fText("GAME OVER", 480, 420, 100, "violet");
            BGM(9);
            if(tmr > 30*5){
                stopBgm(9);
                idx=0;
            }   
        }
        //時間切れのとき
        else{
            drawImg(0, 0, 0);
            fText("ハイスコア: "+loadLS(0), 480, 350, 70, "violet");
            fText("今回のスコア: "+score, 480, 450, 70, "violet");
            BGM(8);
            if(tmr > 30*5){
                stopBgm(8);
                idx=0;
            }
        }
        break;

        //リセット確認
        case 3:
        Sound();
        var c, d;
        fText("ハイスコアをリセットしますか？", 500, 400, 60, "red");
        //ポイント表示
        fText(loadLS(0)+"Pt", 500, 470, 50, "red");
        //タップ判定
        if(530<tapY && tapY<680 && tapC>0){
            //Yes
            if(50<tapX && tapX<400){
                c=1;
            }
            //No
            if(550<tapX && tapX<900){
                d=1;
            }
        }
        
        //ボタン配置
        sRect(50, 530, 350, 150, "white");
        fText("(Y)es", 220, 600, 80, "white");
        sRect(550, 530, 350, 150, "white");
        fText("(N)o", 725, 600, 80, "white");
        //キー判定と実行
        if(c>0 || key[89]==1){
            hisco=5000;
            saveLS(0, hisco);
            SE(6);
            tapC=0;
            idx=0;
        }
        if(d>0 || key[78]==1){
            SE(7);
            tapC=0;
            idx=0;
        }
        break;

        //ゲーム中メニュー
        case 4:
        stopBgm(10);
        Sound();
        fText("操作説明", 500, 100, 100, "lightskyblue");
        fText("ブロックの移動⇒  ←、↓、→", 500, 250, 60, "white");
        fText("ブロック入れ替え⇒  SPASE", 500, 350, 60, "white");
        fText("音楽を切る⇒  S", 500, 450, 60, "white");
        fText("ゲームに戻る⇒  T", 500, 600, 70, "white");
        fText("ホームに戻る⇒  B", 500, 700, 70, "white");
        //ボタン配置
        fText("ホームに戻る", 480, 1000, 70, "white");
        sRect(150, 900, 650, 200, "white");

        //ゲームに戻る
        if(120<tapY && tapY<850 && tapC>0){
            if(0<tapX && tapX<960){
                SE(12);
                tapC=0;
                idx=1;
            }
        }
        if(key[84]==1){
            key[84]++;
            SE(12);
            idx=1;
        }
            
        //ホームに戻る
        if(900<tapY && tapY<1100 && tapC>0){
            if(150<tapX && tapX<800){
                SE(12);
                tapC=0;
                idx=6;
            }
        }
        if(key[66]>0){
            SE(12);
            idx=6;
        }
        break;

        //ホームメニュー
        case 5:
        Sound();
        fText("操作説明", 500, 100, 100, "lightskyblue");
        fText("難易度選択⇒  ←、→", 500, 250, 60, "white");
        fText("判定設定⇒  ↑、↓", 500, 350, 60, "white");
        fText("ゲームスタート⇒  SPASE", 500, 450, 60, "white");
        fText("音楽を切る⇒  S", 500, 550, 60, "white");
        fText("ホームに戻る⇒  T", 500, 700, 70, "white");
        //戻る
        if(120<tapY && tapY<1200 && tapC>0){
            if(0<tapX && tapX<960){
                SE(12);
                tapC=0;
                idx=0;
            }
        }
        if(key[84]==1){
            key[84]++;
            SE(12);
            idx=0;
        }         
        break;

        //ホーム確認
        case 6:
        fText("ホームに戻ってよいですか？", 500, 400, 70, "red");
        if(tapC>0){
            tapC=0;
            if(530<tapY && tapY<680){
                if(50<tapX && tapX<400){
                    SE(12);
                    idx = 0;
                }
                else if(550<tapX && tapX<900){
                    SE(7);
                    idx = 1;
                }
            }
        }
        sRect(50, 530, 350, 150, "white");
        fText("(Y)es", 220, 600, 80, "white");
        sRect(550, 530, 350, 150, "white");
        fText("(N)o", 725, 600, 80, "white");
        if(key[89]>0){
            SE(12);
            idx=0;
        }
        if(key[78]>0){
            SE(7);
            idx=1;
        }
        break;
    }
}