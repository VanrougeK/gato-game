import { useEffect } from "react"

export default function GameOver ({nombre, puntuacion, onReintentar, onRanking, onSkins}) {

    console.log("Gameover activado", nombre, puntuacion)
    useEffect(() =>{
        fetch("http://localhost:3014/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre: nombre, 
                    puntuacion: Math.floor(puntuacion)
            })
        })
    }, [])

    return (
        <div>
            <p>Game Over</p>
            <p>{nombre} -- {Math.floor(puntuacion)} puntos</p>
            <button onClick={onReintentar}>Reintentar</button>
            <button onClick={onRanking}>Ranking</button>
            <button onClick={onSkins}>Skins</button>
        </div>
    )
}