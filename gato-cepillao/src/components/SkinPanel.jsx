export default function SkinPanel ({ puntuacion, skinActiva, onChangeSkin, onVolver }) {
    return (
        <div>
            <p>Skins</p>
            <button onClick={onVolver}>Volver</button>
        </div>
    )
}