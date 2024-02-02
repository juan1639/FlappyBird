
// ================================================================================
export class FondoScroll {

    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.fondoscroll = this.relatedScene.add.image(0, 0, 'fondo-scroll').setOrigin(0, 0);

        console.log(this.fondoscroll);
    }

    get() {
        return this.fondoscroll;
    }
}
