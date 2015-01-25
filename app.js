var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });


   // playState = {
   //  init: function() {
   //  game.state.add('play', playState);
   //  game.state.start('play');

   //  //Called as soon as we enter this state
   //  }

    function preload(){
      game.load.image('sky', 'assets/sky.png');
      game.load.image('ground', 'assets/platform.png');
      game.load.image('star', 'assets/star.png');
      game.load.spritesheet('dude', '/assets/dude.png', 32, 48);
      game.stage.backgroundColor = '#6d94b5';

    //Assets to be loaded before create() is called
    }

    function create(){
      game.physics.startSystem(Phaser.Physics.ARCADE);

      //Adding sprites, sounds, etc...
      //image, sprite, audio and others are all methods of the factory
      game.add.sprite(0,0,'sky');
      game.add.sprite(0, 570 ,'ground');
      game.add.sprite(400, 570, 'ground');
      player = game.add.sprite(0,525, 'dude');
      game.physics.enable(player, Phaser.Physics.ARCADE);
      var arrow =  game.input.keyboard.createCursorKeys();

    }

  function update(){
    if(arrow.left.isDown){
      console.log('keypress left');
      player.body.velocity.x -= 2;
      return;
    }
    else if(arrow.right.isDown){
      console.log('keypress right');
      player.body.velocity.x += 2;
      return;
    }
    if (arrow.up.isDown){
      console.log('keypress up');
      player.body.y -= 2;
      return;
    }
  }