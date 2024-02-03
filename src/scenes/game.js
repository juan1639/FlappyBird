// =========================================================================================
//  F l a p p y  J o n
// 
// -----------------------------------------------------------------------------------------
import { loader } from './loader.js';
import { FondoScroll } from '../components/fondoscroll.js';
import { Jugador } from '../components/jugador.js';
import { Tuberias, TuberiasMoviles } from '../components/tuberias.js';
import { Marcador } from '../components/marcador.js';
import { Textos } from '../components/textos.js';
import { BotonFullScreen } from '../components/boton-nuevapartida.js';
import { play_sonidos } from '../functions/functions.js';

// ============================================================================
export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  init() {

    this.fondoscroll = new FondoScroll(this);
    this.jugador = new Jugador(this);
    this.tuberias = new Tuberias(this);
    this.moviles = new TuberiasMoviles(this);

    const ancho = this.sys.game.config.width;
    const alto = this.sys.game.config.height;

    this.marcadorPtos = new Marcador(this, {
      x: 10, y: -99, size: 35, txt: ' Puntos: ', color: '#fff', id: 0
    });

    this.marcadorHi = new Marcador(this, {
      x: Math.floor(ancho / 1.1), y: -99, size: 35, txt: ' Record: ', color: '#fff', id: 2
    });

    this.botonfullscreen = new BotonFullScreen(this, {
      id: 'boton-fullscreen', x: Math.floor(this.sys.game.config.width * 1.35), y: -77,
      ang: 0, scX: 0.9, scY: 0.9 
    });
  }

  preload() {
    
    loader(this);
  }

  create() {
    //getSettings_json(this);

    this.sonidos_set();

    // --------------------------------------------------------------
    this.jugador.create();
    this.fondoscroll.create();
    this.tuberias.create();
    this.moviles.create(this.tuberias.get().getChildren()[Tuberias.NRO_TUBERIAS * 2 - 1].x);

    // --------------------------------------------------------------
    this.marcadorPtos.create();
    this.marcadorHi.create();
    // this.jugadorSV.create();
    this.botonfullscreen.create();

    this.mouse_showXY = {
      create: this.add.text(this.jugador.get().x, this.jugador.get().y - 100, ' ', { fill: '#111' }),
      show_mouseXY: true
    }

    // this.crear_colliders();
  }
  
  // ================================================================
  update() {

    // this.pointer_showXY(this.mouse_showXY);
    this.jugador.update();
    this.fondoscroll.update(this.jugador.getAleteo());
    this.tuberias.update();

    this.moviles.update();
  }

  // ================================================================
  sonidos_set() {

    this.sonidoMusicaFondo = this.sound.add('musica-fondo');
    if (!this.sonidoMusicaFondo.isPlaying) play_sonidos(this.sonidoMusicaFondo, true, 0.7);

    this.sonidoDieT1 = this.sound.add('dieT1');
    this.sonidoDieT2 = this.sound.add('dieT2');
    this.sonidoMonedaMario = this.sound.add('moneda-mario');
    this.sonidoGameOver = this.sound.add('gameover');
  }

  // ================================================================
  crear_colliders() {

    this.physics.add.collider(this.jugador.get(), this.tuberias.get());
  }

  // ================================================================
  pointer_showXY({create, show_mouseXY}) {
    
    if (!show_mouseXY) return;
    
    const pointer = this.input.activePointer;
    // console.log(pointer.worldX, pointer.worldY);
    
    create.setText([
      `x: ${pointer.worldX}`,
      `y: ${pointer.worldY}`
    ]).setX(this.jugador.get().x).setY(this.jugador.get().y - 170);
  }
}
