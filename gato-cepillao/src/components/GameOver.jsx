export default function GameOver ({nombre, puntuacion, onReintentar, onRanking, onSkins}) {
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