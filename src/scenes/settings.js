
// ====================================================================================
export class Settings {

    static screen = {
        width: 800,
        height: 600
    };

    static puntos = 0;
    static hi = 5000;
    static vidas = 3;

    static fuerzaAleteoPajaro = 200;
    static velScroll = 4;

    // -----------------------------------------------
    static getScreen() {
        return Settings.screen;
    }

    static getPuntos() {
        return Settings.puntos;
    }

    static getRecord() {
        return Settings.hi;
    }

    static getVidas() {
        return Settings.vidas;
    }

    static getFuerzaAleteoPajaro() {
        return Settings.fuerzaAleteoPajaro;
    }

    static getVelScroll() {
        return Settings.velScroll;
    }

    // -----------------------------------------------
    static setPuntos(ptos) {
        Settings.puntos = ptos;
    }

    static setRecord(hiScore) {
        Settings.hi = hiScore;
    }

    static setVidas(lifes) {
        Settings.vidas = lifes;
    }

    static setFuerzaAleteoPajaro(fuerza) {
        Settings.fuerzaAleteoPajaro = fuerza;
    }

    static setVelScroll(velScroll) {
        Settings.velScroll = velScroll;
    }
}
