var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('win', winState);
game.state.add('play', playState);
game.state.add('loser', loserState);

game.state.start('load');
