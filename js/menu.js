var menuState = {
    create: function() {
        game.add.text(220, 250, "Collect all stars under 60 sec.", {fill: '#ff0000'});
        game.add.text(250, 350, 'Press SPACEBAR.', {fill: '#fff'});

        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(function() {
            game.state.start('play');
        });
    }
};
