var loadState = {
    preload: function () {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.audio('collide', 'assets/collide.wav');
    },

    create: function () {
        game.state.start('menu');
    }
};
