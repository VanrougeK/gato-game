import { useState, useEffect, useRef, useCallback } from "react"

const PREMIOS = ["gato", "pescado", "Pan", "flan", "fresa"]
const intervalo_volteo = 3000
const dur_volteo = 1500
const puntos_per_sec = 10
const puntos_premio =25

export default function Game({nombre, skinActiva, onGameOver}) {
    const [puntos, setPuntos] = useState(0)
    const [persoVolteando, setPersoVolteando] = useState(false)
    const [acariciando, setAcariciando] = useState(false)
    const [premios, setPremios] = useState()
    const [perdio, setPerdio] = useState(false)
    const [gatoPse, setGatoPose] = useState ("Normal")

    const acariciandoRef = useRef(false)
    const perdioRef = useRef(false)
    const puntosRef = useRef(0)
    const interAcariciaRef = useRef(null)
    const timeoutVolteoRef = useRef(null)
    const interVolteoRef = useRef(null)
    const interPremiosRef = useRef(null)

    

    return (
        <div>
            <p>Holii {nombre}</p>
            <p>Aca se juega</p>
            <button onClick={() => onGameOver(0)}>Prueba gameover</button>
        </div>
    )
}