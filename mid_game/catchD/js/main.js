enchant(); // ライブラリーの初期化
window.onload = function(){
  //box2dのための変数の追加
  var world;
  var gty=9.8/10;


  var game = new Game(640, 640);
  game.preload("block.png","pad.png","ball.png","battle.mp3");

// ラベルを作成
var clear = new Label("おめでとう！");
clear.font = "50px Tahoma";
clear.color = "black";
clear.width = 640;
clear.x = 120; // X座標
clear.y = 115; // Y座標

game.rootScene.addChild(clear);
  // データの読み込みが完了したら処理
  game.onload = function(){
    var BGM1 = Sound.load("battle.mp3");
    game.on(Event.ENTER_FRAME, function (e) {
        BGM1.volume = 0.3;
        if (BGM1.currentTime == 94) BGM1.currentTime = 0;
        BGM1.play();
    });
    //box2dの世界の生成
    world = new PhysicsWorld(0, gty);

    // ボールの設定
    var ball = new Circle(240, 300);
    game.rootScene.addChild(ball);

    // パドルの設定
    var pad1 = new PhyBoxSprite(65, 15, enchant.box2d.STATIC_SPRITE, 1.0, 1.0, 1.2, true);
    pad1.image = game.assets["pad.png"];
    pad1.x = /*game.width/2*/240; // X座標
    pad1.y = /*game.height - 40*/580; // Y座標
    game.rootScene.addEventListener('touchstart', function(e) {
        pad1.x = e.x-16;
    });
    game.rootScene.addEventListener('touchmove', function(e) {
        pad1.x = e.x-16;
    });
    game.rootScene.addChild(pad1);

    //壁の作成
    {
                var floor = new PhyBoxSprite(16, game.height, enchant.box2d.STATIC_SPRITE, 0, 0.2, 1.0, false);
                floor.backgroundColor = "#aaa";
                floor.position = {
                        x: game.width,
                        y: game.height/2
                }
                game.rootScene.addChild(floor);
                var floor = new PhyBoxSprite(16, game.height, enchant.box2d.STATIC_SPRITE, 0, 0.2, 1.0, false);
                floor.backgroundColor = "#aaa";
                floor.position = {
                        x: 0,
                        y: game.height/2
                }
                game.rootScene.addChild(floor);
                var floor = new PhyBoxSprite(game.width, 16, enchant.box2d.STATIC_SPRITE, 0, 0.2, 1.0, false);
                floor.backgroundColor = "#aaa";
                floor.position = {
                        x: game.width/2,
                        y: 0
                }
                game.rootScene.addChild(floor);
    }

    var b1 = new Box(20,80);
    var b2 = new Box(180,80);
    var b3 = new Box(340,80);
    var b4 = new Box(120,110);
    var b5 = new Box(280,110);
    var b6 = new Box(440,110);
    var b7 = new Box(20,140);
    var b8 = new Box(180,140);
    var b9 = new Box(340,140);
    var b10 = new Box(120,170);
    var b11 = new Box(280,170);
    var b12 = new Box(440,170);

    var d = 0;
    function dest(block){
      if(ball.within(block)){
         block.destroy();
         game.rootScene.removeChild(block);
         d +=1;
       }
 }

    // フレームイベントが発生したら処理
    game.rootScene.addEventListener(Event.ENTER_FRAME, function(){
      world.step(game.fps);

      // ボールが下まで行ったらゲームオーバー
      if(ball.y > game.height){
        game.stop();
        BGM1.pause();
        if(d == 12){
          alert("坂村健「おめでとう！合格だ！」");
        }else{
        alert("坂村健「少し速いか？まあ、更新してもう一度チャレンジだ！」");
        }
      }
      // パドルを移動させる
      var n = game.input.analogX / 4;
      if(!isNaN(n)){
          pad1.x = pad1.x + n; // パドルを移動
          if (pad1.x < 0){ pad1.x = 0; }  // 左端かどうか調べる
          if (pad1.x > (game.width-pad1.width)){ pad1.x = game.width-pad1.width; }  // 右端かどうか調べる
      }
      // パドルとボールの接触判定
      if (pad1.within(ball)){
        ball.dy = -ball.dy;  // 接触した場合はボールのY方向の移動量を逆にする
      }
      
      dest(b1);
      dest(b2);
      dest(b3);
      dest(b4);
      dest(b5);
      dest(b6);
      dest(b7);
      dest(b8);
      dest(b9);
      dest(b10);
      dest(b11);
      dest(b12);
    }
  );
    }
        //ball
        var Circle = Class.create(PhyCircleSprite, {
          initialize: function (x, y) {
              PhyCircleSprite.call(this, 25, enchant.box2d.DYNAMIC_SPRITE, 100, 2, 1.3, true);
              this.image = game.assets["ball.png"];
              this.frame = 0;
              this.x = x;
              this.y = y;
                  if ((this.x != this.prevx) || (this.y != this.prefy)) {
                      this.applyImpulse(new b2Vec2(gty*0.2*Math.random(), 0));
                  }
          }
        });
        //block
        var Box = Class.create(PhyBoxSprite, {
          initialize: function (x, y) {
              PhyBoxSprite.call(this, 156, 32, enchant.box2d.STATIC_SPRITE, 0.5, 0.2, 0.3, true);
              this.image = game.assets["block.png"];
              this.frame = 0;
              this.x = x;
              this.y = y;
              game.rootScene.addChild(this);
          },
      });

  // ゲーム処理開始
  game.start();
}
