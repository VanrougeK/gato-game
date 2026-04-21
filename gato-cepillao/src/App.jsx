import { useState } from "react";
import Game from "./components/Game"
import GameOver from "./components/GameOver"
import Ranking from "./components/Ranking"
import SkinPanel from "./components/SkinPanel"

export default function App() {
  const [pantalla, setPantala] = useState("Nombre")
  const [namePlayer, setNamePlayer] = useState("")
  const [puntuacion, setPuntuacion] = useState(0)
  const [skinActiva, setSkinActiva] = useState("Default")

  return (
    <div>
      {/* pantalla 1 - Introduccion jsjsjjs */}
      {pantalla === "Nombre" &&(
        <div>
          <h1>Cepilla al gatete!!!!!!</h1>
          <p>Acaricia al gato a escondidas sin que te atrapen</p>
          <p>¿Lo lograras?</p>
          <input type="text" placeholder="Nombre" maxLength={10} value={namePlayer} onChange={(e) => setNamePlayer(e.target.value)}/>
          <button onClick={() => setPantala("Ranking")}>Ver ranking</button>

          {/* Pantalla 2 - Juego */}
          {pantalla === "juego" && (
        <Game nombre={nombreJugador} skinActiva={skinActiva} onGameOver={(pts) => { setPuntuacion(pts) 
          setPantalla("gameover")}}
        />
      )}

      {/* PANTALLA 3 - Gameover */}
      {pantalla === "gAME oVER" && (
        <GameOver nombre={namePlayer} puntuacion={puntuacion} skinActiva={skinActiva} 
        onReintentar={() => setPantala("juego")}
        onRanking={() => setPantala("ranking")}
        onSkins={() => setPantala("skins")}/>
      )}

      {/* pantalla 4 - Ranking */}
      {pantalla === "Ranking" && (
        <Ranking onVolver={() => setPantala("Nombre")}></Ranking>
      )}

      {/* Pantalla 5 - Skins */}
      {pantalla === "Skins" && (
        <SkinPanel puntuacion={puntuacion} skinActiva={skinActiva} onChangeSkin={setSkinActiva} onVolver={() => setPantala("Game over papu")}></SkinPanel>
      )}
        </div>
      )}
      

    </div>
  )
}
