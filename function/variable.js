/*---------変数定義---------*/
var masu = new Array(13);
var kesu = new Array(13);
for(var y=0; y<13; y++){
    masu[y] = new Array(9);
    kesu[y] = new Array(9);
}
//マス初期化
function clrBlock(){
    var x,y;
    for(y=0; y<=12; y++){
        for(x=0; x<=8; x++){
            masu[y][x] = -1;
        }
    }
    for(y=1; y<=11; y++){
        for(x=1; x<=7; x++){
            masu[y][x] = 0;
            kesu[y][x] = 0;
        }
    }
}
var idx = 0;
var tmr = 0;
var Smode = 0;
//操作するブロックの配列、初期値代入
var block = [0, 0, 1, 2];
var myBlockX;
var myBlockY;
var dropSpd;
var tapKey = [0, 0, 0, 0];


//点数計算の変数
var hisco = 5000;
var score = 0;
var rensa = 0;
var points = 0;
var eftime = 0;//ブロックを消す演出時間
var extend = 0;
var nan = 0;
var mode1 = 0;
var mflg = 0;
var blocktipe = 0;

//エフェクト定義
var RAINBOW = ["#ff0000", "#e08000", "#c0e000", "#00ff00", "#00c0e0", "#0040ff", "#8000e0"];
var EFF_MAX = 100;
var effX = new Array(EFF_MAX);
var effY = new Array(EFF_MAX);
var effT = new Array(EFF_MAX);
var effN = 0;
for(var i=0; i<EFF_MAX; i++)
    effT[i] = 0;

//制限時間
var barx;
var barx1;
var count;
var col;

var gameTime = 0;
var gameProc = 0;

//ミッション用
var random;
var random2;
var m_random;
var b_count;
var m_count;

function initvar(){
    myBlockX = 4;
    myBlockY = 1;
    if(nan == 0)
        dropSpd = 90;//約3秒
    if(nan == 1)
        dropSpd = 45;

    block[0] = 1;
    block[1] = 2;

    block[2] = 2;
    block[3] = 3;

    gameProc = 0;
    gameTime = 5000;

    score = 0;

    barx=920;
    barx1 = -250;
    count = 5;
    col = "blue";

    m_count = 0;
    b_count = 0;
}