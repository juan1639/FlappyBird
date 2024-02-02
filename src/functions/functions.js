import { Settings } from "../scenes/settings.js";
import { Textos } from "../components/textos.js";

// ================================================================
function revivir_jugador(jugador, scene) {

  const {cheatInvisible, duracionInvisible, duracionDie} = Settings.invisible;

  restar_vida();
  if (Settings.getVidas() >= 0) scene.jugadorSV.get().getChildren()[Settings.getVidas()].setVisible(false);

  jugador.setData('jugadorDies', true).setData('disableBody', true);
  jugador.setCollideWorldBounds(false);
  jugador.setData('saveX', jugador.x);
  jugador.setData('saveY', jugador.y - 250);
  jugador.anims.play('dies', true);

  scene.add.timeline([
    {
      at: duracionDie,
      run: () => {
        jugador.setData('jugadorDies', false).setData('disableBody', false);
        jugador.setAlpha(0.5).setCollideWorldBounds(true);
        jugador.setX(jugador.getData('saveX'));
        jugador.setY(jugador.getData('saveY'));
        
        if (Settings.getVidas() < 0) jugador.setAlpha(0);
      }
    },
    {
      at: duracionInvisible,
      run: () => {
        if (Settings.getVidas() < 0) {
          jugador.setAlpha(0);
        } else {
          jugador.setAlpha(cheatInvisible);
        }
      }
    },
    {
      at: 10500,
      run: () => {
        if (Settings.getVidas() < 0) {
          scene.sonidoMusicaFondo.pause();
          scene.scene.start('gameover');
        }
      }
    }
  ]).play();
}

// =================================================================================
function centrar_txt(texto, anchoScreen) {
  
  console.log(texto.width);
  return Math.floor(anchoScreen / 2 - texto.width / 2);
}

// =================================================================================
function suma_puntos(puntos) {
  
  const bonus = Settings.getPuntos() + puntos.getData('puntos');
  Settings.setPuntos(bonus);
  console.log(bonus, Settings.getPuntos());
}

// =================================================================================
function restar_vida() {
  
  const actualizar = Settings.getVidas() - 1;
  Settings.setVidas(actualizar);
}

// =================================================================================
function play_sonidos(id, loop, volumen) {

  id.volume = volumen;
  id.loop = loop;
  id.play();
}

export {
    revivir_jugador,
    centrar_txt,
    suma_puntos,
    restar_vida,
    play_sonidos
};
