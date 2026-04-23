import { useEffect, useState } from "react"

export default function Ranking ({ onVolver}) {
    const [jugadores, setJugadores] = useState([])

    useEffect(() => {
        fetch("http://localhost:3014/users").then(res => res.json()).then(data => setJugadores(data))
    }, [])

    return (
        <div>
            <h1>Ranking</h1>
            {jugadores.map((jugador, index) => (
                <div key={index}>
                    <span>{index + 1}.{jugador.nombre}</span>
                    <span>{jugador.puntuacion} puntos</span>
                </div>
            ))}
            <button onClick={onVolver}>Volver</button>
        </div>
    )
}