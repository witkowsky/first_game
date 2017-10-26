var loserState = {
    create: function() {
        game.add.text(250, 300, 'YOU LOSE', {fill: '#FFD700'});
        game.add.text(250, 350, 'Press SPACEBAR.', {fill: '#fff'});

        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(function() {
            game.state.start('menu');
        });
    }
};
