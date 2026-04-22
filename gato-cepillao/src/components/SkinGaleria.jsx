import { useState } from "react";

const skinsEj = [
    {id:1, nombre:"Gatito azul", autor: "pelado", archivo:"gatito azul.png"}
]

export default function SkinGaleria ({ onVolver, onUsarSkin}) {
    const [skinSelect, setSkinSelect] = useState(null)

    return(
        <div>
            <h1>Skins de la comunidad</h1>
            <p>Skins subidas por otros jugadores</p>

            {skinsEj.map(skin => (
                <div key={skin.id}>
                    <img src={`/${skin.archivo}`} alt={skin.nombre} />
                    <p>{skin.nombre}</p>
                    <p>por {skin.autor}</p>
                    <button onClick={() => {onUsarSkin(skin.archivo.replace(".png", "")) 
                        setSkinSelect(skin.id)}}> {skinSelect === skin.id ? "Usando" : "Usar"} </button>
                </div>
            ))}
            <button onClick={onVolver}>Volver</button>
        </div>
    )
}