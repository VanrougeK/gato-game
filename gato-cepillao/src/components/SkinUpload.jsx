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
                setError(`La imagen debe ser 400x400px. La tuya es ${img.width}x${img.height}px`)
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
            <div>
                <h1>Skin subida</h1>
                <p>Tu skin "{nombre}" ya esta disponible en la galeria</p>
                {preview && (
                    <img src={preview} alt="skin subida" />
                )}
                <button onClick={onVolver}>Volver a mis skins</button>
            </div>
        )
    }

    return(
        <div>
            <h1>Subir skin</h1>
            <p>Requisitos de la imagen:</p>
            <p>Formato: PNG</p>
            <p>Tamaño: 400 x 400 px</p>
            <p>Peso maximo: 2MB</p>
            <p>Fondo transparente recomendado</p>
            <input type="text" placeholder="Nombre de tu skin" maxLength={30} value={nombre} onChange={(e) => setNombre(e.target.value)}/>
            <input type="file" accept=".png" onChange={handleImagen} />

            {preview && (
                <div>
                    <p>Preview:</p>
                    <img src={preview} alt="preview" />
                </div>
            )}

            {error && <p style={{color:"red"}}>{error}</p>}
            <button onClick={handleSubir}>Subir skin</button>
            <button onClick={onVolver}>Cancelar</button>
        </div>
    )
}