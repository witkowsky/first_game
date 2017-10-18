var playState = {
    create: function () {
        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'sky');

        // The platform group contains the ground and the 2 ledges we can jump on
        this.platforms = game.add.group();

        // We will enable physic for any object that is created in this group
        this.platforms.enableBody = true;

        //Here we create the ground
        this.ground = this.platforms.create(0, game.world.height - 64, 'ground');

        // Scale it to fit the width of the game (the original sprite is 400x32 in size )
        this.ground.scale.setTo(2, 2);

        // This stop it from falling away when you jump on it
        this.ground.body.immovable = true;

        //Now let's create two ledges
        this.ledgeRight = this.platforms.create(400, 400, 'ground');
        this.ledgeRight.body.immovable = true;

        this.ledgeLeft = this.platforms.create(-150, 250, 'ground');
        this.ledgeLeft.body.immovable = true;

        //The player and its settings
        this.player = game.add.sprite(32, game.world.height - 150, 'dude');

        game.physics.arcade.enable(this.player);

        // player physic properties. Give the little guy a slight bounce
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        //our two animiations, walking left and right
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        // create group stars
        this.stars = game.add.group();
        this.stars.enableBody = true;
        for (var i = 0; i < 12; i++) {
            // create star inside group of stars
            var star = this.stars.create(i * 70, 0, 'star');

            star.body.gravity.y = 300;

            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }


        //create score text
        this.score = 0;
        this.scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#fff'});

        // our controls
        this.cursors = game.input.keyboard.createCursorKeys();
    },

    update: function () {
        // collide the player and the stars with the platforms
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.stars, this.platforms);

        //check if player overlap the stars
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);


        //Reset the players velocity - prędkość (movement)
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
            // move to the left
            this.player.body.velocity.x = -150;

            this.player.animations.play('left');

        } else if (this.cursors.right.isDown) {
            //move to right
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
        } else {
            // stand still
            this.player.animations.stop();
            this.player.frame = 4;
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.body.velocity.y = -350;
        }
        //this.countStarsAlive();
        this.checkGameStatus();
    },

    collectStar: function(player, star) {
        star.kill();
        this.score += 10;

        this.scoreText.text = 'score: ' + this.score;
    },

    checkGameStatus: function() {
        if (this.countStarsAlive() == 0) {
            game.state.start('win');
        }
    },

    countStarsAlive: function() {
        return this.stars.children.filter(function (star) {
            return star.alive;
        }).length;
    }
};
