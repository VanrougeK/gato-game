import { useState } from "react";

export default function SkinUpload ({onVolver}) {
    const [nombre, setNombre] = useState("")
    const [imagen, setImagen] = useState(null)
    const [preview, setPreview] = useState(null)
    const [error, setError] = useState("")
    const [subida, setSubida] = useState(false)

    const handleImagen = (e) => {
        const archivo = e.target.files[0]
        if (!archivo) return

        if (!archivo.type.includes("png")) {
            setError("Solo se aceptan imagenes PNG")
            setImagen(null)
            setPreview(null)
            return
        }

        if (archivo.size > 2 * 1024 * 1024) {
            setError("La imagen no debe pesar mas de 2MB")
            setImagen(null)
            setPreview(null)
            return
        }

        const img = new Image()
        img.src = URL.createObjectURL(archivo)
        img.onload = () => {
            if (img.width !== 400 || img.height !== 400) {
                setError(`La imagen debe ser 400 x 400px. La tuya es ${img.width}x${img.height}px`)
                setImagen(null)
                setPreview(null)
                return
            }
            setError("")
            setImagen(archivo)
            setPreview(img.src)
        }
    }

    const handleSubir = () => {
        if (!nombre.trim()) {
            setError("Ponle un nombre a tu skin")
            return
        }
        if (!imagen) {
            setError("Selecciona una imagen")
            return
        }

        // simulacion
        console.log("Subiendo skin:", nombre, imagen)
        setSubida(true)
    }

    if (subida) {
        return (
            <div style={{ background: "#f0f0f0", minHeight: "100vh", fontFamily: "monospace" }}>
                <div style={{ margin: "20px auto", width: "700px", border: "1px solid #999" }}>

                    <div style={{ background: "#f0f0f0", borderBottom: "1px solid #999", padding: "3px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", fontFamily: "monospace" }}>TUNNAPAD.EXE - skin_subida.tunna</span>
                    <div style={{ display: "flex", gap: "2px" }}>
                        {["_","□","X"].map(b => (
                            <button key={b} style={{ width: "14px", height: "12px", background: "#f0f0f0", border: "1px solid #999", fontSize: "8px", cursor: "pointer", fontFamily: "monospace" }}>{b}</button>
                        ))}
                    </div>
                </div>

                <div style={{ background: "#fff", padding: "24px 28px", display: "flex", flexDirection: "column", gap: "16px", minHeight: "300px" }}>
                    <p style={{ fontSize: "40px", fontWeight: "bold", lineHeight: 1 }}>Skin subida</p>
                    <hr style={{ border: "none", borderTop: "1px solid #ddd" }}/>
                    <p style={{ fontSize: "12px" }}>NAME: <span style={{ color: "#555" }}>{nombre} </span></p>
                    <p style={{ fontSize: "12px" }}>STATUS: <span style={{ color: "#555" }}>Disponible en galeria </span></p>
                    <button onClick={onVolver} style={{ background: "#f0f0f0", border: "1px solid #999", padding: "4px 18px", fontFamily: "monospace", fontSize: "12px", cursor: "pointer", width: "fit-content" }}>← Volver a mis skins</button>
                </div>

                <div style={{ borderTop: "1px solid #999", padding: "2px 8px", display: "flex", justifyContent: "space-between", background: "#f0f0f0" }}>
                    <span style={{ fontSize: "10px", color: "#555", border: "1px solid #ccc", padding: "1px 6px" }}>C:\juegos\skin_subida.tunna</span>
                    <span style={{ fontSize: "10px", color: "#555", border: "1px solid #ccc", padding: "1px 6px" }}>oki</span>
                </div>

                </div>
            </div>
        )
    }

    return(
        <div style={{ background: "#f0f0f0", minHeight: "100vh", fontFamily: "monospace" }}>

            {/* titulo ventana */}
            <div style={{ background: "#f0f0f0", borderBottom: "1px solid #999", padding: "3px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", fontFamily: "monospace" }}>TUNNAPAD.EXE - subir_skin.tunna</span>
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

                    {/* notepad */}
                    <div style={{ flex: 1, background: "#fff", padding: "24px 28px", display: "flex", flexDirection: "column", gap: "18px", minHeight: "380px" }}>
                        <p style={{ fontSize: "52px", fontWeight: "bold", color: "#000", lineHeight: 1 }}>Subir skin</p>
                        <hr style={{ border: "none", borderTop: "1px solid #ddd" }}/>
            
            {/* Requisitos */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <p style={{ fontSize: "11px", color: "#555", textDecoration: "underline", marginBottom: "4px" }}>Requisitos de la imagen:</p>
            <p style={{ fontSize: "12px" }}>FORMATO: <span style={{ color: "#555" }}>PNG</span></p>
            <p style={{ fontSize: "12px" }}>TAMAÑO: <span style={{ color: "#555" }}>400 x 400</span></p>
            <p style={{ fontSize: "12px" }}>PESO: <span style={{ color: "#555" }}>max 2MB</span></p>
            <p style={{ fontSize: "12px" }}>FONDO: <span style={{ color: "#555" }}>Transparente recomendado</span></p>
</div>

<hr style={{ border: "none", borderTop: "1px solid #ddd" }}/>

{/* inputs */}
<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    <div>
        <p style={{ fontSize: "11px", color: "#555", marginBottom: "4px", textDecoration: "underline" }}>Nombre de tu skin:</p>
        <input type="text" placeholder="Nombre de tu skin" maxLength={30} value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ background: "#fff", border: "1px solid #999", padding: "4px 8px", fontFamily: "monospace", fontSize: "13px", outline: "none", width: "240px" }}/>
    </div>

    <div>
        <p style={{ fontSize: "11px", color: "#555", marginBottom: "4px", textDecoration: "underline" }}>Selecciona imagen:</p>
        <input type="file" accept=".png" onChange={handleImagen}  style={{ fontFamily: "monospace", fontSize: "11px" }}/>
    </div>
</div>
            {preview && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <p style={{ fontSize: "11px", color: "#555", textDecoration: "underline" }}>Preview:</p>
                    <img src={preview} alt="preview" style={{ fontSize: "11px", color: "#555", textDecoration: "underline" }}/>
                </div>
            )}

            {error && (
                <p style={{ fontSize: "11px", fontFamily: "monospace", color: "red", border: "1px solid red", padding: "4px 8px" }}>{error}</p>
            ) }

            <div>
                <button onClick={handleSubir} style={{ background: "#f0f0f0", border: "1px solid #999", padding: "4px 18px", fontFamily: "monospace", fontSize: "12px", cursor: "pointer", color: "#000" }}>↑ Subir skin</button>
            <button onClick={onVolver} style={{ background: "#f0f0f0", border: "1px solid #999", padding: "4px 18px", fontFamily: "monospace", fontSize: "12px", cursor: "pointer", color: "#000" }}>← Cancelar</button>
            </div>
            
            </div>

            {/* Scrollbar */}
                <div style={{ width: "14px", background: "#f0f0f0", borderLeft: "1px solid #ccc", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", borderBottom: "1px solid #ccc", cursor: "pointer" }}>▲</div>
              <div style={{ flex: 1, background: "repeating-linear-gradient(45deg,#f0f0f0,#f0f0f0 1px,#e0e0e0 1px,#e0e0e0 2px)" }}></div>
              <div style={{ height: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", borderTop: "1px solid #ccc", cursor: "pointer" }}>▼</div>
            </div>

            {/*panerl derehco */}
            <div style={{ width: "130px", borderLeft: "1px solid #999", padding: "12px 10px", background: "#f0f0f0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ fontSize: "11px", fontFamily: "monospace", fontWeight: "bold", textDecoration: "underline" }}>INFO:</p>
              <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", lineHeight: "1.6" }}>sube tu propia<br/>skin para<br/>compartirla</p>
              <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", lineHeight: "1.6" }}>todos podran<br/>verla en<br/>la galeria</p>
            </div>

          {/* statusbar */}
          <div style={{ borderTop: "1px solid #999", padding: "2px 8px", display: "flex", justifyContent: "space-between", background: "#f0f0f0" }}>
            <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", border: "1px solid #ccc", padding: "1px 6px" }}>C:\juegos\subir_skin.tunna</span>
            <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", border: "1px solid #ccc", padding: "1px 6px" }}>Listo</span>
          </div>
          
          </div>
          </div>
    )
}