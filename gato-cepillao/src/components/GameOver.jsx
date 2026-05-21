import { useEffect } from "react"

export default function GameOver ({nombre, puntuacion, onReintentar, onRanking, onSkins}) {

    console.log("Gameover activado", nombre, puntuacion)
    useEffect(() =>{
        const token = localStorage.getItem("token")
        fetch("https://back-gatitos.onrender.com/ranking/score", {
            method: "POST",
            headers: { "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` },
                body: JSON.stringify({
                    puntuacion: Math.floor(puntuacion)
            })
        })
    }, [])

    return (
        <div style={{ background: "#f0f0f0", minHeight: "100vh", fontFamily: "monospace" }}>
            <div style={{ margin: "20px auto", width: "700px", border: "1px solid #999", background: "#f0f0f0" }}>
                
                {/* titulo ventana */}
                <div style={{ background: "#f0f0f0", borderBottom: "1px solid #999", padding: "3px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", fontFamily: "monospace" }}>TUNNAPAD.EXE - game_over.tunna</span>
                    <div style={{ display: "flex", gap: "2px" }}>
                        {["_","□","X"].map(b => (
                            <button key={b} style={{ width: "14px", height: "12px", background: "#f0f0f0", border: "1px solid #999", fontSize: "8px", cursor: "pointer", fontFamily: "monospace" }}>{b}</button>
                        ))}
                    </div>
                </div>

                {/* barmenuj */}
                <div style={{ borderBottom: "1px solid #ccc", padding: "2px 8px", display: "flex", gap: "20px" }}>
                    {["FILE","OPTIONS","WINDOW","HELP"].map(m => (
                    <span key={m} style={{ fontSize: "11px", fontFamily: "monospace", cursor: "pointer", color: "#000" }}>{m}</span>
                    ))}
                </div>

                <div style={{ display: "flex" }}>

                    {/* sidebar */}
                    <div style={{ width: "60px", borderRight: "1px solid #ccc", padding: "8px 4px", background: "#f0f0f0", fontSize: "9px", fontFamily: "monospace", color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>file 1</span>
                    </div>

                    {/* tunnapad */}
                    <div style={{ flex: 1, background: "#fff", padding: "24px 28px", display: "flex", flexDirection: "column", gap: "18px", minHeight: "380px" }}>
                        <p style={{ fontSize: "52px", fontWeight: "bold", fontFamily: "monospace", color: "#000", lineHeight: 1 }}>game over</p>
                        <hr style={{ border: "none", borderTop: "1px solid #ddd" }}/>

                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            <p style={{ fontSize: "12px", fontFamily: "monospace" }}>NAME: <span style={{ color: "#555" }}>{nombre}</span></p>
                            <p style={{ fontSize: "12px", fontFamily: "monospace" }}>SCORE: <span style={{ color: "#555" }}>{Math.floor(puntuacion)} pts</span></p>
                            <p style={{ fontSize: "12px", fontFamily: "monospace" }}>STATUS: <span style={{ color: "#555" }}>atrapado/a</span></p>
                        </div>

                        <hr style={{ border: "none", borderTop: "1px solid #ddd" }}/>

                        <div style={{ display: "flex", gap: "10px" }}>
                            <button onClick={onReintentar} style={{ background: "#f0f0f0", border: "1px solid #999", padding: "4px 18px", fontFamily: "monospace", fontSize: "12px", cursor: "pointer", color: "#000" }}>Reintentar</button>
                            <button onClick={onRanking} style={{ background: "#f0f0f0", border: "1px solid #999", padding: "4px 18px", fontFamily: "monospace", fontSize: "12px", cursor: "pointer", color: "#000" }}>Ranking</button>
                            <button onClick={onSkins} style={{ background: "#f0f0f0", border: "1px solid #999", padding: "4px 18px", fontFamily: "monospace", fontSize: "12px", cursor: "pointer", color: "#000" }}>Skins</button>
                        </div>
                    </div>

                    {/* scrobbarr */}
                    <div style={{ width: "14px", background: "#f0f0f0", borderLeft: "1px solid #ccc", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", borderBottom: "1px solid #ccc", cursor: "pointer" }}>▲</div>
              <div style={{ flex: 1, background: "repeating-linear-gradient(45deg,#f0f0f0,#f0f0f0 1px,#e0e0e0 1px,#e0e0e0 2px)" }}></div>
              <div style={{ height: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", borderTop: "1px solid #ccc", cursor: "pointer" }}>▼</div>
            </div>

            <div style={{ width: "130px", borderLeft: "1px solid #999", padding: "12px 10px", background: "#f0f0f0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ fontSize: "11px", fontFamily: "monospace", fontWeight: "bold", textDecoration: "underline" }}>OPCIONES</p>
              <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", lineHeight: "1.6" }}>Reintentar: <br /> vuelve a jugar</p>
              <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", lineHeight: "1.6" }}>ranking: <br /> ver top scores</p>
              <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", lineHeight: "1.6" }}>skins: <br />cambia a tu gatito</p>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #999", padding: "2px 8px", display: "flex", justifyContent: "space-between", background: "#f0f0f0" }}>
            <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", border: "1px solid #ccc", padding: "1px 6px" }}>C:\juegos\peina_al_gatito.tunna</span>
            <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", border: "1px solid #ccc", padding: "1px 6px" }}>1 of 1</span>
          </div>
          </div>

                </div>
    )
}