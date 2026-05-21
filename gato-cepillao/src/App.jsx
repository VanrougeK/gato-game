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

  const handleLogin = (usuario) => {
    setNamePlayer(usuario)
    setPantala("Nombre")
  }

  const handleLogout = () => {
    localStorage.removeItem("Token")
    localStorage.removeItem("Usuario")
    setPantala("Login")
  }

  return(
    
    <div style={{ background: "#f0f0f0", minHeight: "100vh", fontFamily: "monospace" }}>
      {!["Login", "Register"].includes(pantalla) && (
        <div>
          <span style={{ fontSize: "12px", fontWeight: "bold", color: "#000", padding: "2px 8px", borderRight: "1px solid #999", marginRight: "12px" }}>HOME</span>
          <span onClick={() => setPantala("Juego")} style={{ fontSize: "11px", color: "#555", padding: "2px 10px", cursor: "pointer", textDecoration: "underline" }}>JUGAR</span>
          <span onClick={() => setPantala("Ranking")} style={{ fontSize: "11px", color: "#555", padding: "2px 10px", cursor: "pointer", textDecoration: "underline" }}>RANKING</span>
          <span onClick={() => setPantala("Skins")} style={{ fontSize: "11px", color: "#555", padding: "2px 10px", cursor: "pointer", textDecoration: "underline" }}>SKINS</span>
          <span style={{ marginLeft: "auto", fontSize: "11px", color: "#555" }}>{namePlayer}|{""}<span onClick={handleLogout} style={{ cursor: "pointer", textDecoration: "underline" }}>cerrar sesion</span></span>
        </div>
      )}

      {pantalla ==="Login" && <Login onLogin={handleLogin} onRegister={() => setPantala("Register")}/>}
      {pantalla === "Register" && <Register onVolver={() => setPantala("Login")} />}

        {pantalla === "Nombre" && (
          <div style={{ margin: "20px auto", width: "min(700px, 95vw)", border: "1px solid #999", background: "#f0f0f0" }}>
            <div style={{ background: "#f0f0f0", borderBottom: "1px solid #999", padding: "3px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px" }}>NOTEPAD.EXE - peina_al_gatete.tunna</span>
              <div style={{ display: "flex", gap: "2px" }}>
                {["_","□","X"].map(b => <button key={b} style={{ width: "14px", height: "12px", background: "#f0f0f0", border: "1px solid #999", fontSize: "8px", cursor: "pointer", fontFamily: "monospace" }}>{b}</button>)}
              </div>
            </div>
            <div style={{ borderBottom: "1px solid #ccc", padding: "2px 8px", display: "flex", gap: "20px" }}>
              {["FILE","OPTIONS","WINDOW","HELP"].map(m => <span key={m} style={{ fontSize: "11px", cursor: "pointer", color: "#000" }}>{m}</span>)}
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ width: "60px", borderRight: "1px solid #ccc", padding: "8px 4px", background: "#f0f0f0", fontSize: "9px", color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>file 1</span>
              </div>
              <div style={{ flex: 1, background: "#fff", padding: "24px 28px", display: "flex", flexDirection: "column", gap: "18px", minHeight: "380px" }}>
                <p style={{ fontSize: "clamp(28px, 6vw, 52px)", fontWeight: "bold", color: "#000", lineHeight: 1 }}>peina al gatete</p>
                <hr style={{ border: "none", borderTop: "1px solid #ddd" }}/>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <p style={{ fontSize: "12px" }}>NOMBRE: <span style={{ color: "#555" }}>{namePlayer}</span></p>
                  <p style={{ fontSize: "12px" }}>OBJETIVO: <span style={{ color: "#555" }}>No te dejes atrapar</span></p>
                  <p style={{ fontSize: "12px" }}>DIFICULTAD: <span style={{ color: "#555" }}>tu decides</span></p>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid #ddd" }}/>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button onClick={() => setPantala("Juego")} style={{ background: "#f0f0f0", border: "1px solid #999", padding: "4px 18px", fontFamily: "monospace", fontSize: "12px", cursor: "pointer" }}>▶ Jugar</button>
                  <button onClick={() => setPantala("Ranking")} style={{ background: "#f0f0f0", border: "1px solid #999", padding: "4px 18px", fontFamily: "monospace", fontSize: "12px", cursor: "pointer" }}>Ver ranking</button>
                </div>
              </div>
              <div style={{ width: "14px", background: "#f0f0f0", borderLeft: "1px solid #ccc", display: "flex", flexDirection: "column" }}>
                <div style={{ height: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", borderBottom: "1px solid #ccc" }}>▲</div>
                <div style={{ flex: 1, background: "repeating-linear-gradient(45deg,#f0f0f0,#f0f0f0 1px,#e0e0e0 1px,#e0e0e0 2px)" }}></div>
                <div style={{ height: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", borderTop: "1px solid #ccc" }}>▼</div>
              </div>
              <div style={{ width: "130px", borderLeft: "1px solid #999", padding: "12px 10px", background: "#f0f0f0", display: "flex", flexDirection: "column", gap: "12px" }}>
                <p style={{ fontSize: "11px", fontWeight: "bold", textDecoration: "underline" }}>INFO:</p>
                <p style={{ fontSize: "10px", color: "#555", lineHeight: "1.6" }}>controles: <br />Spam de clicks <br />= acariciar</p>
                <p style={{ fontSize: "10px", color: "#555", lineHeight: "1.6" }}>objetivo: <br />Que no te atrapen</p>
                <p style={{ fontSize: "10px", color: "#555", lineHeight: "1.6" }}>Version: <br />papu pro</p>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #999", padding: "2px 8px", display: "flex", justifyContent: "space-between", background: "#f0f0f0" }}>
              <span style={{ fontSize: "10px", color: "#555", border: "1px solid #ccc", padding: "1px 6px" }}>C:\juegos\peina_al_gatete.tunna</span>
              <span style={{ fontSize: "10px", color: "#555", border: "1px solid #ccc", padding: "1px 6px" }}>1 of 1</span>
            </div>
          </div>
        )}

        {pantalla === "Juego" && (
          <Game nombre={namePlayer} skinActiva={skinActiva} onGameOver={async(pts) => { 
            setPuntuacion(pts)
            try {
              await fetch("http://localhost:3014/ranking/score", {
                method:"POST",
                headers: {
                  "Content-Type":"application/json"
                }, body: JSON.stringify({
                  usuario:namePlayer, puntuacion:Math.floor(pts)
                })
              })
            } catch(err) {
              console.log(err)
            } setPantala("Gameover") }}
            />
        )}

        {pantalla === "Gameover" && (
          <GameOver nombre={namePlayer} puntuacion={puntuacion} skinActiva={skinActiva} onReintentar={() => setPantala("Juego")} onRanking={() => setPantala("Ranking")} onSkins={() => setPantala("Skins")}></GameOver>
        )}

        {pantalla === "Ranking" && (
          <Ranking onVolver={() => setPantala("Nombre")}></Ranking>
        )}

        {pantalla === "Skins" && (
          <SkinPanel puntuacion={puntuacion} skinActiva={skinActiva} onChangeSkin={setSkinActiva} onVolver={() => setPantala("Gameover")} onGaleria={() => setPantala("Nombre")}></SkinPanel>
        )}
    </div>
  )
}