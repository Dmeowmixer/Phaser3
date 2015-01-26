var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
function preload() {
  game.load.image('sky', 'assets/sky.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('enemy', 'assets/baddie.png', 32, 32);
  game.load.spritesheet('dude', 'assets/isshin/run.png', 44, 46);
}

var running = true;
function create() {
  //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //  A simple background for our game
  game.add.sprite(0, 0, 'sky');

  game.bodies = [];

  // Create enemies
  game.enemies = game.add.group();
  game.enemies.enableBody = true;

  // The player and its settings
  game.player = new Player(game);

  game.bodies.push(game.player);

  game.goals = game.add.group();
  game.goal = new Goal(game);
  game.bodies.push(game.goal);
  //  We need to enable physics on the player

   // Player physics properties. Give the little guy a slight bounce.

}

function update() {
  var enemy = spawnEnemy(game);
  if (enemy) {
    game.bodies.push(enemy);
    for (var i = 0; i < game.bodies.length; i++) {
      if (Math.floor(Math.random() * 2))
      game.bodies[i].update();
    }
  }

  function spawnEnemy(game) {
    if (running) {
      return new Enemy(game);
    }
    else {
      return false;
    }
  }

}

var Goal = function(game) {

  var goal =  game.goals.create(Math.floor(Math.random() * game.world.width), 0, 'star');

  goal.enableBody = true;
  game.physics.arcade.enable(goal);
  goal.body.bounce.y = 0.2;
  goal.body.gravity.y = 0;
  goal.body.collideWorldBounds = true;

  // intitialize();

  this.update = function() {
  };

};

function spawnEnemy() {
  return new Enemy();
}
var Enemy = function(game) {

  var enemy =  game.enemies.create(Math.floor(Math.random() * game.world.width), Math.floor(Math.random() * game.world.height), 'enemy');

  enemy.enableBody = true;
  game.physics.arcade.enable(enemy);
  enemy.body.bounce.y = 0.2;
  enemy.body.gravity.y = Math.floor(Math.random() * 1000);
  enemy.body.collideWorldBounds = false;

  // intitialize();

  this.update = function() {
    game.physics.arcade.collide(enemy, game.platforms);
    game.physics.arcade.collide(enemy, game.player);
  };

};

var Player = function(game) {
  var player = game.add.sprite(0, game.world.height / 2, 'dude');

  var jumps = 5;

  this.jumpReleased = true;


  game.physics.arcade.enable(player);
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 600;

  //  Our two animations, walking left and right.
  player.animations.add('left', [6, 7, 8, 9], 8);
  player.animations.add('right', [6, 7, 8, 9], 8);

  player.animations.add('attack',[ 20, 21, 22, 23, 24], 2, true);
  player.animations.add('jump', [15,16,17,18], 10, true);
  player.anchor.setTo(0.5, 0.5);

  keyboard = game.input.keyboard.createCursorKeys();

  // intitialize();

  this.update = function() {
    game.physics.arcade.collide(player, game.platforms);
    game.physics.arcade.collide(player, game.enemies, function(a, b){
      if (a.x < b.x) {
        jumps = 5;
      }
      if (keyboard.down.isDown) {
        b.kill();
      }
    });
    game.physics.arcade.collide(player, game.goals, function() {
      alert('What do I do now?');
      running = false;
    });

     //  Reset the players velocity (movement)
    player.body.velocity.x = 0;


    if (keyboard.left.isDown)
    {
        if (player.scale.x > 0) {
          player.scale.x *= -1;
        }

        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (keyboard.right.isDown)
    {
        if (player.scale.x < 0) {
          player.scale.x *= -1;
        }
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 2;
    }

    //  Allow the player to jump if they are touching the ground.
    if (keyboard.up.isDown && this.jumpReleased)
    {
      this.jumpReleased = false;
      if (jumps > 0) {
        jumps--;
        player.animations.play('jump');
        player.body.velocity.y = -350;
      }
    }
    else if(!keyboard.up.isDown) {
      this.jumpReleased = true;
    }
    if (keyboard.down.isDown){
      player.animations.play('attack');
      player.body.velocity.x = 0;

      for (var i = 0; i < game.enemies.length; i++) {
      }
    }
  };

};
