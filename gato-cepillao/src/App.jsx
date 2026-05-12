import { useState } from "react";
import Game from "./components/Game"
import GameOver from "./components/GameOver"
import Ranking from "./components/Ranking"
import SkinPanel from "./components/SkinPanel"
import Login from "./components/login";
import Register from "./components/Register";

export default function App() {
  const [pantalla, setPantala] = useState("Nombre")
  const [namePlayer, setNamePlayer] = useState("")
  const [puntuacion, setPuntuacion] = useState(0)
  const [skinActiva, setSkinActiva] = useState("default")

  return (
    <div style={{background: "#f0f0f0", minHeight: "100vh", fontFamily: "monospace"}}>
      
      {/* barrita de arriba */}
      <div style={{background: "#f0f0f0", borderBottom: "1px solid #999", padding: "3px 12px", display: "flex", alignItems: "center", gap: "0"}}>
        <span style={{fontSize: "12px", fontWeight: "bold", color: "#000", padding: "2px 8px", borderRight: "1px solid #999", marginRight: "12px"}}>Home</span>
        <span onClick={() => namePlayer.trim() && setPantala("Juego")} style={{ fontSize: "11px", color: "#555", padding: "2px 10px", cursor: "pointer", textDecoration: "underline" }}>Jugar</span>
        <span onClick={() => setPantala("Ranking")} style={{ fontSize: "11px", color: "#555", padding: "2px 10px", cursor: "pointer", textDecoration: "underline" }}>Ranking</span>
        <span onClick={() => setPantala("Skins")} style={{ fontSize: "11px", color: "#555", padding: "2px 10px", cursor: "pointer", textDecoration: "underline" }}>Skins</span>
        <span style={{ marginLeft: "auto", fontSize: "11px", color: "#555" }}>FILE EXPLORER - Peina al gatito</span>
      </div>

      {/* pantalla 1 - Introduccion jsjsjjs */}
      {pantalla === "Nombre" &&(
        <div style={{ margin: "20px auto", width: "700px", border: "1px solid #999", background: "#f0f0f0" }}>
          
          <div style={{ background: "#f0f0f0", borderBottom: "1px solid #999", padding: "3px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", fontFamily: "monospace" }}>peina_al_gatito.tunna</span>
            <div style={{ display: "flex", gap: "2px" }}>
              {["_", "□", "X"].map(b => (
                <button key={b} style={{ width: "14px", height: "12px", background: "#f0f0f0", border: "1px solid #999", fontSize: "8px", cursor: "pointer", fontFamily: "monospace" }}>{b}</button>
              ))}
            </div>
          </div>
          
          {/* menubar */}
          <div style={{ borderBottom: "1px solid #ccc", padding: "2px 8px", display: "flex", gap: "20px" }}>
            {["FILE", "OPTIONS", "WINDOW", "HELP"].map(m => (
              <span key={m} style={{ fontSize: "11px", fontFamily: "monospace", cursor: "pointer", color: "#000" }}>{m}</span>
            ))}
          </div>

          {/* layout */}
          <div style={{ display: "flex" }}>

            {/* sidebar */}
            <div style={{ width: "60px", borderRight: "1px solid #ccc", padding: "8px 4px", background: "#f0f0f0", fontSize: "9px", fontFamily: "monospace", color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>file 1</span>
            </div>

            {/* nodepad */}
            <div style={{ flex: 1, background: "#fff", padding: "24px 28px", display: "flex", flexDirection: "column", gap: "18px", minHeight: "380px" }}>
              <p style={{ fontSize: "52px", fontWeight: "bold", fontFamily: "monospace", color: "#000", lineHeight: 1 }}>peina al gato</p>
              <p>⣴⡿⠶⠀⠀⠀⣦⣀⣴⠀⠀<br />⣿⡄⠀⠀⣠⣾⠛⣿⠛⣷⠀⠿⣦ <br />⠙⣷⣦⣾⣿⣿⣿⣿⣿⠟⠀⣴⣿ <br />⠀⣸⣿⣿⣿⣿⣿⣿⣿⣾⠿⠋⠁ <br />⠀⣿⣿⣿⠿⡿⣿⣿⡿ <br />⢸⣿⡋⠀⠀⠀⢹⣿⡇ <br />⣿⡟⠀⠀⠀⠀⠀⢿⡇⠀ <br />⠉⠁⠀⠀⠀⠀⠀⠸⠇</p>
              <hr style={{ border: "none", borderTop: "1px solid #ddd" }}/>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <p style={{ fontSize: "12px", fontFamily: "monospace" }}>NOMBRE: <span style={{ color: "#555" }}>______________</span></p>
                <p style={{ fontSize: "12px", fontFamily: "monospace" }}>OBJETIVO: <span style={{ color: "#555" }}>no ser atrapado</span></p>
                <p style={{ fontSize: "12px", fontFamily: "monospace" }}>DIFICULTAD: <span style={{ color: "#555" }}>tu decides</span></p>
              </div>

              <hr style={{ border: "none", borderTop: "1px solid #ddd" }}/>

              <div>
                <p style={{ fontSize: "11px", fontFamily: "monospace", color: "#555", marginBottom: "6px", textDecoration: "underline" }}>Ingresa tu nombre: </p>
                <input type="text" placeholder="nombre..." maxLength={10} value={namePlayer} onChange={(e) => setNamePlayer(e.target.value)} style={{ background: "#fff", border: "1px solid #999", padding: "4px 8px", fontFamily: "monospace", fontSize: "13px", outline: "none", width: "240px", color: "#000" }}/>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => namePlayer.trim() && setPantala("Juego")} style={{ background: "#f0f0f0", border: "1px solid #999", padding: "4px 18px", fontFamily: "monospace", fontSize: "12px", cursor: "pointer", color: "#000" }}>▶ JUGAR</button>
                <button onClick={() => setPantala("Ranking")} style={{ background: "#f0f0f0", border: "1px solid #999", padding: "4px 18px", fontFamily: "monospace", fontSize: "12px", cursor: "pointer", color: "#000" }}>Ver ranking</button>
              </div>
            </div>

            {/* scrollbar */}
            <div style={{ width: "14px", background: "#f0f0f0", borderLeft: "1px solid #ccc", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", borderBottom: "1px solid #ccc", cursor: "pointer" }}>▲</div>
              <div style={{ flex: 1, background: "repeating-linear-gradient(45deg,#f0f0f0,#f0f0f0 1px,#e0e0e0 1px,#e0e0e0 2px)" }}></div>
              <div style={{ height: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", borderTop: "1px solid #ccc", cursor: "pointer" }}>▼</div>
            </div>

            {/* panel derecho */}
            <div style={{ width: "130px", borderLeft: "1px solid #999", padding: "12px 10px", background: "#f0f0f0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ fontSize: "11px", fontFamily: "monospace", fontWeight: "bold", textDecoration: "underline" }}>INFO</p>
              <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", lineHeight: "1.6" }}>controles: <br /> multiples clicks <br /> = acariciar</p>
              <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", lineHeight: "1.6" }}>objetivo <br /> no te atrapen <br />mientrasbracaricias al gatito</p>
              <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", lineHeight: "1.6" }}>version: <br />1.0.0</p>
            </div>
          </div>

          {/* statussbar */}
          <div style={{ borderTop: "1px solid #999", padding: "2px 8px", display: "flex", justifyContent: "space-between", background: "#f0f0f0" }}>
            <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", border: "1px solid #ccc", padding: "1px 6px" }}>C:\juegos\peina_al_gatito.tunna</span>
            <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", border: "1px solid #ccc", padding: "1px 6px" }}>1 of 1</span>
          </div>
          </div>
        )}

{/* Pantalla 2 - Juego */}
          {pantalla === "Juego" && (
        <Game nombre={namePlayer} skinActiva={skinActiva} onGameOver={(pts) => { setPuntuacion(pts) 
          setPantala("Gameover")}}
        /> )}

      {/* PANTALLA 3 - Gameover */}
      {pantalla === "Gameover" && (
        <GameOver nombre={namePlayer} puntuacion={puntuacion} skinActiva={skinActiva} 
        onReintentar={() => setPantala("Juego")}
        onRanking={() => setPantala("Ranking")}
        onSkins={() => setPantala("Skins")}/>
      )}

      {/* pantalla 4 - Ranking */}
      {pantalla === "Ranking" && (
        <Ranking onVolver={() => setPantala("Nombre")}></Ranking>
      )}

      {/* Pantalla 5 - Skins */}
      {pantalla === "Skins" && (
        <SkinPanel 
        puntuacion={puntuacion} 
        skinActiva={skinActiva} 
        onChangeSkin={setSkinActiva} 
        onVolver={() => setPantala("Gameover")}
        ></SkinPanel>
      )}
      {pantalla === "Galeria" && (
        <SkinGaleria onVolver={() => setPantala("Skins")} onUsarSkin={setSkinActiva}/>
      )}

      {pantalla === "Subir" && (
        <SkinGaleria onVolver={() => setPantala("Skins")}/>
      )}

    </div>
  )
}
