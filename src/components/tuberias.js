import { Settings } from "../scenes/settings.js";

// ============================================================================
export class Tuberias {

    static NRO_TUBERIAS = 11;
    static sizeX = 80;

    static FIJO_LARGA = 0.15;
    static MIN_LARGA = 0.4;
    static MAX_LARGA = 0.88;

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

            const larga = this.set_altura_pipe(Settings.getPuntos());

            pipe.setOrigin(0.5, 0).setDepth(10).setData('vel-x', Settings.getVelScroll());

            if (index % 2 === 0) {

                pipe.setScale(1.2, larga).setFlipY(true);
            
            } else {

                pipe.setScale(1.2, larga).setFlipY(false);
                pipe.setY(pipe.y - Math.floor(Tuberias.ALTURA_PIXELS * larga));
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

        const larga = this.set_altura_pipe(Settings.getPuntos());
        pipe.setScale(1.2, larga);

        if (index % 2 !== 0) pipe.setY(this.relatedScene.sys.game.config.height - Math.floor(Tuberias.ALTURA_PIXELS * larga));
    }

    set_altura_pipe(puntos) {

        let progresivo = Tuberias.MIN_LARGA + puntos / 1000;

        if (progresivo >= Tuberias.MAX_LARGA) progresivo = Tuberias.MAX_LARGA;

        return Phaser.Math.FloatBetween(Tuberias.FIJO_LARGA, progresivo);
    }

    get() {
        return this.tuberias;
    }
}
