import { Settings } from "../scenes/settings.js";

// ============================================================================
export class Tuberias {

    static NRO_TUBERIAS = 11;
    static sizeX = 80;

    static FIJO_LARGA = 0.15;
    static MIN_LARGA = 0.4;
    static MAX_LARGA = 0.89;

    static ALTURA_PIXELS = 300;

    // ----------------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.tuberias = this.relatedScene.add.group();

        for (let i = 0; i < Tuberias.NRO_TUBERIAS; i ++) {

            this.tuberias.create(i * Tuberias.sizeX + Math.floor(Tuberias.sizeX / 2), 0, 'pipe');
            this.tuberias.create(
                i * Tuberias.sizeX + Math.floor(Tuberias.sizeX / 2),
                this.relatedScene.sys.game.config.height,
                'pipe'
            );
        }

        this.tuberias.children.iterate((pipe, index) => {

            pipe.setData('larga', this.set_altura_pipe(Settings.getPuntos()));
            pipe.setData('vel-x', Settings.getVelScroll());

            pipe.setOrigin(0.5, 0).setDepth(10);

            if (index % 2 === 0) {

                pipe.setScale(1.2, pipe.getData('larga')).setFlipY(true);

                if (index === Tuberias.NRO_TUBERIAS * 2 - 1 || index === Tuberias.NRO_TUBERIAS * 2 - 2) pipe.setVisible(false);
                
            } else {
                
                pipe.setScale(1.2, pipe.getData('larga')).setFlipY(false);
                pipe.setY(pipe.y - Math.floor(Tuberias.ALTURA_PIXELS * pipe.getData('larga')));

                if (index === Tuberias.NRO_TUBERIAS * 2 - 1 || index === Tuberias.NRO_TUBERIAS * 2 - 2) pipe.setVisible(false);
            }
        });

        console.log(this.tuberias);
    }

    update() {

        this.tuberias.children.iterate((pipe, index) => {

            pipe.setX(pipe.x - pipe.getData('vel-x'));

            if (pipe.x <= -Math.floor(Tuberias.sizeX / 2)) {

                this.crear_nueva_pipe(pipe, index);
            }
        });
    }

    crear_nueva_pipe(pipe, index) {

        Settings.setPuntos(Settings.getPuntos() + 1);
        console.log(Settings.getPuntos());

        pipe.setX(this.relatedScene.sys.game.config.width + Math.floor(Tuberias.sizeX));

        pipe.setData('larga', this.set_altura_pipe(Settings.getPuntos()));
        pipe.setScale(1.2, pipe.getData('larga'));

        if (index % 2 !== 0) pipe.setY(
            this.relatedScene.sys.game.config.height - Math.floor(Tuberias.ALTURA_PIXELS * pipe.getData('larga'))
        );
    }

    set_altura_pipe(puntos) {

        let max_larga = Tuberias.MIN_LARGA + puntos / 1000;
        if (max_larga >= Tuberias.MAX_LARGA) max_larga = Tuberias.MAX_LARGA;
        
        let min_larga = Tuberias.FIJO_LARGA + puntos / 3000;
        if (min_larga >= Tuberias.MAX_LARGA) min_larga = Tuberias.MAX_LARGA;

        return Phaser.Math.FloatBetween(min_larga, max_larga);
    }

    get() {
        return this.tuberias;
    }
}

// ============================================================================
//  Tuberias Moviles
//  
// ============================================================================
export class TuberiasMoviles {

    static NRO_TUBERIAS = 2;
    static sizeX = 80;

    static FIJO_LARGA = 0.15;
    static MIN_LARGA = 0.4;
    static MAX_LARGA = 0.87;

    static VELOCIDAD = 0.005;

    static ALTURA_PIXELS = 300;

    // ----------------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create(xInicial) {

        this.moviles = this.relatedScene.add.group();
        
        this.moviles.create(xInicial, 0, 'pipe');
        this.moviles.create(xInicial, this.relatedScene.sys.game.config.height, 'pipe');

        const variaLarga = this.obtenerRndVariacionLarga();

        this.moviles.children.iterate((pipe, index) => {

            pipe.setData('larga', TuberiasMoviles.FIJO_LARGA);
            pipe.setData('rnd-larga', variaLarga);
            pipe.setData('vel-y', TuberiasMoviles.VELOCIDAD);
            pipe.setData('vel-x', Settings.getVelScroll());
            
            pipe.setOrigin(0.5, 0).setDepth(15).setAlpha(1);
            
            if (index % 2 === 0) {
                
                pipe.setScale(1.2, pipe.getData('larga')).setFlipY(true);
                pipe.setData('mas-menos', TuberiasMoviles.VELOCIDAD);
                
            } else {
                
                pipe.setScale(1.2, pipe.getData('larga')).setFlipY(false);
                pipe.setY(this.relatedScene.sys.game.config.height - Math.floor(TuberiasMoviles.ALTURA_PIXELS * pipe.getData('larga')));
                pipe.setData('mas-menos', TuberiasMoviles.VELOCIDAD);
            }
        });

        console.log(this.moviles);
    }

    update() {

        const variaLarga = this.obtenerRndVariacionLarga();

        this.moviles.children.iterate((pipe, index) => {

            pipe.setData('larga', pipe.getData('larga') + this.mueveTuberia(pipe, index));

            pipe.setScale(1.2, pipe.getData('larga'));
            pipe.setX(pipe.x - pipe.getData('vel-x'));

            if (index % 2 !== 0) {
                pipe.setY(this.relatedScene.sys.game.config.height - Math.floor(TuberiasMoviles.ALTURA_PIXELS * pipe.getData('larga')));
            }

            if (pipe.x <= -Math.floor(TuberiasMoviles.sizeX / 2)) {

                pipe.setX(this.relatedScene.sys.game.config.width + TuberiasMoviles.sizeX);
                pipe.setData('rnd-larga', variaLarga);
                console.log(this.moviles);
            }
        });
    }

    mueveTuberia(pipe, index) {

        const topeLarga = TuberiasMoviles.MAX_LARGA - pipe.getData('rnd-larga');

        if (pipe.getData('mas-menos') > 0 && pipe.getData('larga') >= topeLarga) {

            pipe.setData('vel-y', -pipe.getData('vel-y'));
            pipe.setData('mas-menos', pipe.getData('vel-y'));
        
        } else if (pipe.getData('mas-menos') < 0 && pipe.getData('larga') <= TuberiasMoviles.MIN_LARGA) {

            pipe.setData('vel-y', -pipe.getData('vel-y'));
            pipe.setData('mas-menos', pipe.getData('vel-y'));
        }
    
        return pipe.getData('mas-menos');
    }

    obtenerRndVariacionLarga() {

        if (Settings.getPuntos >= 1000) return 0;

        return Phaser.Math.Between(0, 1000 - Settings.getPuntos()) / 3000;
    }

    get() {
        return this.moviles;
    }
}
