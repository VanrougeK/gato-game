export default function SkinPanel ({ puntuacion, skinActiva, onChangeSkin, onVolver, onGaleria, onSubir }) {
    const skins = [
        {id:"default", nombre:"Default", ptsReq:0},
        {id:"naranja", nombre:"Naranja", ptsReq:0},
        {id:"negro", nombre:"Negro", ptsReq:100},
    ]
    
    return (
        <div>
            <h1>Mis Skins</h1>
            <p>Tus puntos: {Math.floor(puntuacion)}</p>

            {skins.map(skin => {
                const desbloq = puntuacion >= skin.ptsReq
                const activa = skinActiva === skin.id

                return(
                    <div key={skin.id}>
                        <img src={`/${skin.id === "default" ? "gato" : `skin_${skin.id}`}_normal.png`} alt={skin.nombre} />
                        <p>{skin.nombre}</p>
                        <p>{desbloq ? "Desbloqueado" : `${skin.puntosRequeridos} pts`}</p>
                        <button onClick={() => desbloq && onChangeSkin(skin.id)} disabled={!desbloq||activa}>{activa ? "Activa" : desbloq ? "Usar" : "Bloqueado"}</button>
                    </div>
                )
            })}

            <button onClick={onGaleria}>Mas Skins</button>
            <button onClick={onSubir}>Subir mi skin</button>
            <button onClick={onVolver}>Volver</button>
        </div>
    )
}