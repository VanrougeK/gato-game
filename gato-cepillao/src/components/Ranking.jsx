export default function Ranking ({ onVolver}) {
    const prueba = [
        {nombre:"pepe", puntuacion:50},
        {nombre:"pelado", puntuacion:-50},
        {nombre:"peladopro", puntuacion:500}
    ]
    return (
        <div>
            <h1>Ranking</h1>
            {prueba.map((jugador, index) => (
                <div key={index}>
                    <span>{index + 1}.{jugador.nombre}</span>
                    <span>{jugador.puntuacion} puntos</span>
                </div>
            ))}
            <button onClick={onVolver}>Volver</button>
        </div>
    )
}