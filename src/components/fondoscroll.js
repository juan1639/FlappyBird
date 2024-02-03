import { Settings } from "../scenes/settings.js";

// ================================================================================
export class FondoScroll {

    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.fondoscroll = this.relatedScene.add.image(
            -this.relatedScene.sys.game.config.width, 0, 'fondo-scroll'
        ).setOrigin(0, 0);

        this.fondoscroll.setDepth(0);
        this.fondoscroll.setData('vel-x', Settings.getVelScroll());

        console.log(this.fondoscroll);
    }

    update(aleteo) {

        // this.fondoscroll.setX(this.fondoscroll.x - this.fondoscroll.getData('vel-x') - aleteo);
        this.fondoscroll.setX(this.fondoscroll.x - this.fondoscroll.getData('vel-x'));

        if (this.fondoscroll.x <= -this.relatedScene.sys.game.config.width * 3) {

            this.fondoscroll.x = 0;
        }

        this.relatedScene.jugador.setAleteo(0);
    }

    get() {
        return this.fondoscroll;
    }
}
