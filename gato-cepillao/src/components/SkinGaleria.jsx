import { useState } from "react";

const skinsEj = [
    {id:1, nombre:"Gatito azul", autor: "pelado", archivo:"gatito azul.png"}
]

export default function SkinGaleria ({ onVolver, onUsarSkin}) {
    const [skinSelect, setSkinSelect] = useState(null)

    return(
        <div style={{ background: "#f0f0f0", minHeight: "100vh", fontFamily: "monospace" }}>
            <div style={{ margin: "20px auto", width: "700px", border: "1px solid #999", background: "#f0f0f0" }}>
                {/* titulo ventanita */}
                <div style={{ background: "#f0f0f0", borderBottom: "1px solid #999", padding: "3px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", fontFamily: "monospace" }}>TUNNAPAD.EXE - galeria_skins.tunna</span>
                    <div style={{ display: "flex", gap: "2px" }}>
                        {["_","□","X"].map(b => (
                            <button key={b} style={{ width: "14px", height: "12px", background: "#f0f0f0", border: "1px solid #999", fontSize: "8px", cursor: "pointer", fontFamily: "monospace" }}>{b}</button>
                        ))}
                    </div>
                </div>

                {/* menubar */}
                <div style={{ borderBottom: "1px solid #ccc", padding: "2px 8px", display: "flex", gap: "20px" }}>
                    {["FILE","OPTIONS","WINDOW","HELP"].map(m => (
                    <span key={m} style={{ fontSize: "11px", fontFamily: "monospace", cursor: "pointer", color: "#000" }}>{m}</span>
                    ))}
                </div>

                {/* sidebar */}
                <div style={{ width: "60px", borderRight: "1px solid #ccc", padding: "8px 4px", background: "#f0f0f0", fontSize: "9px", fontFamily: "monospace", color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>file 1</span>
                    </div>

                {/* notepad */}
                <div style={{ flex: 1, background: "#fff", padding: "24px 28px", display: "flex", flexDirection: "column", gap: "18px", minHeight: "380px" }}>
                    <p style={{ fontSize: "52px", fontWeight: "bold", color: "#000", lineHeight: 1 }}>Galeria</p>
                    <hr style={{ border: "none", borderTop: "1px solid #ddd" }}/>
                    <p style={{ fontSize: "11px", color: "#555", textDecoration: "underline" }}>Skins subidas por otros jugadores</p>
                
                {/* grid */}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    {skinsEj.map(skin => (
                        <div key={skin.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", border: `1px solid ${skinSelect === skin.id ? "#000" : "#ccc"}`, padding: "12px", width: "140px", background: skinSelect === skin.id ? "#f0f0f0" : "#fff" }}>
                            <img src={`/${skin.archivo}`} alt={skin.nombre} style={{ width: "80px", height: "80px", objectFit: "contain" }}/>
                            <p style={{ fontSize: "12px", fontWeight: "bold", textAlign: "center" }}>{skin.nombre}</p>
                            <p style={{ fontSize: "10px", color: "#555" }}>por {skin.autor}</p>
                            <button onClick={() => { onUsarSkin(skin.archivo.replace(".png", "")); setSkinSelect(skin.id) }} style={{ background: "#f0f0f0", border: "1px solid #999", padding: "3px 10px", fontFamily: "monospace", fontSize: "11px", cursor: "pointer", color: "#000", width: "100%" }}> {skinSelect === skin.id ? "Usando" : "Usar"}</button>
                        </div>
                    ))}
                </div>

                <hr style={{ border: "none", borderTop: "1px solid #ddd" }}/>
                <button onClick={onVolver} style={{ background: "#f0f0f0", border: "1px solid #999", padding: "4px 18px", fontFamily: "monospace", fontSize: "12px", cursor: "pointer", color: "#000", width: "fit-content" }}> ← Volver
                </button>
                </div>

                {/* Scrollbar */}
                <div style={{ width: "14px", background: "#f0f0f0", borderLeft: "1px solid #ccc", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", borderBottom: "1px solid #ccc", cursor: "pointer" }}>▲</div>
              <div style={{ flex: 1, background: "repeating-linear-gradient(45deg,#f0f0f0,#f0f0f0 1px,#e0e0e0 1px,#e0e0e0 2px)" }}></div>
              <div style={{ height: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", borderTop: "1px solid #ccc", cursor: "pointer" }}>▼</div>
            </div>

            {/*panerl derehco */}
            <div style={{ width: "130px", borderLeft: "1px solid #999", padding: "12px 10px", background: "#f0f0f0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ fontSize: "11px", fontFamily: "monospace", fontWeight: "bold", textDecoration: "underline" }}>OPCIONES</p>
              <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", lineHeight: "1.6" }}>Reintentar: <br /> vuelve a jugar</p>
              <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", lineHeight: "1.6" }}>ranking: <br /> ver top scores</p>
              <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", lineHeight: "1.6" }}>skins: <br />cambia a tu gatito</p>
            </div>

          {/* statusbar */}
          <div style={{ borderTop: "1px solid #999", padding: "2px 8px", display: "flex", justifyContent: "space-between", background: "#f0f0f0" }}>
            <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", border: "1px solid #ccc", padding: "1px 6px" }}>C:\juegos\peina_al_gatito.tunna</span>
            <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", border: "1px solid #ccc", padding: "1px 6px" }}>1 of 1</span>
          </div>
          </div>
          </div>
    )
}