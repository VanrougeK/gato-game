import { useEffect, useState } from "react"

export default function SkinPanel ({ puntuacion, skinActiva, onChangeSkin, onVolver, onGaleria }) {
    const [skins, setSkins] = useState([])

    useEffect(() => {
        fetch("https://back-gatitos.onrender.com/skins")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(Array.isArray(data)) {
                setSkins(data)
            } else {
                setSkins([])
            }
        })
        .catch((err) => {
            console.log(err)
            setSkins([])
        })
    }, [])
    
    return (
        <div style={{ background: "#f0f0f0", minHeight: "100vh", fontFamily: "monospace" }}>
            <div>

                {/* titulo ventana */}
                <div style={{ background: "#f0f0f0", borderBottom: "1px solid #999", padding: "3px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", fontFamily: "monospace" }}>TUNNAPAD.EXE - skins.tunna</span>
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

                    {/* notpad */}
                    <div style={{ flex: 1, background: "#fff", padding: "24px 28px", display: "flex", flexDirection: "column", gap: "18px", minHeight: "380px" }}>
                        <p style={{ fontSize: "52px", fontWeight: "bold", color: "#000", lineHeight: 1 }}>Mis skins</p>
                        <hr style={{ border: "none", borderTop: "1px solid #ddd" }}/>
                        <p style={{ fontSize: "12px", color: "#555" }}>PUNTOS: {Math.floor(puntuacion)} pts</p>
                    </div>

                    {/* Grid skins */}
                    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                        {skins.map(skin => {
                const desbloq = puntuacion >= skin.requisito_puntos
                const activa = skinActiva === skin.id

                return(
                    <div key={skin.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", border: `1px solid ${activa ? "#000" : "#ccc"}`, padding: "12px", width: "140px", background: activa ? "#f0f0f0" : "#fff" }}>
                        <img src={`/${skin.id === "default" ? "gato" : `skin_${skin.id}`}_normal.png`} alt={skin.nombre} style={{ width: "80px", height: "80px", objectFit: "contain", opacity: desbloq ? 1 : 0.4 }}/>
                        <p style={{ fontSize: "12px", fontWeight: "bold" }}>{skin.nombre}</p>
                        <p style={{ fontSize: "10px", color: "#555" }}>{desbloq ? "Desbloqueado" : `${skin.requisito_puntos} pts`}</p>
                        <button onClick={() => desbloq && onChangeSkin(skin.id)} disabled={!desbloq||activa} style={{ background: "#f0f0f0", border: "1px solid #999", padding: "3px 10px", fontFamily: "monospace", fontSize: "11px", cursor: desbloq && !activa ? "pointer" : "default", color: activa ? "#555" : "#000", width: "100%" }}>{activa ? "Activa" : desbloq ? "Usar" : "Bloqueado"}</button>
                    </div>
                )
            })}
                    </div>

                    <hr style={{ border: "none", borderTop: "1px solid #ddd" }}/>

                    <div style={{ width: "14px", background: "#f0f0f0", borderLeft: "1px solid #ccc", display: "flex", flexDirection: "column" }}>
                        <button onClick={onGaleria} style={{ background: "#f0f0f0", border: "1px solid #999", padding: "4px 18px", fontFamily: "monospace", fontSize: "12px", cursor: "pointer", color: "#000" }}>+ Mas Skins</button>
            <button onClick={onVolver} style={{ background: "#f0f0f0", border: "1px solid #999", padding: "4px 18px", fontFamily: "monospace", fontSize: "12px", cursor: "pointer", color: "#000" }}>← Volver</button>
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