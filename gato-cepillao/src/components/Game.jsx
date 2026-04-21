export default function Game({nombre, skinActiva, onGameOver}) {
    return (
        <div>
            <p>Holii {nombre}</p>
            <p>Aca se juega</p>
            <button onClick={() => onGameOver(0)}>Prueba gameover</button>
        </div>
    )
}