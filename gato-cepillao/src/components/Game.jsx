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
    const [premios, setPremios] = useState([])
    const [perdio, setPerdio] = useState(false)
    const [gatoPose, setGatoPose] = useState ("normal")

    const acariciandoRef = useRef(false)
    const perdioRef = useRef(false)
    const puntosRef = useRef(0)
    const interAcariciaRef = useRef(null)
    const timeoutVolteoRef = useRef(null)
    const interVolteoRef = useRef(null)
    const interPremiosRef = useRef(null)

    useEffect(() => {acariciandoRef.current = acariciando}, [acariciando])
    useEffect(() => {puntosRef.current = puntos}, [puntos])

    const voltear = useCallback(() => {
        if(perdioRef.current) return
        console.log("src gato:", `/${skinActiva === "default" ? "gato" : `skin_${skinActiva}`}_${gatoPose}.png`)

        setPersoVolteando(true)

        if (acariciandoRef.current) {
            perdioRef.current = true
            setPerdio(true)
            setAcariciando(false)
            clearInterval(interAcariciaRef.current)
            return
        }
        timeoutVolteoRef.current = setTimeout(() => {
            setPersoVolteando(false)}, dur_volteo)
    }, [])

    useEffect(() =>{
        interVolteoRef.current = setInterval(voltear, intervalo_volteo)

        interPremiosRef.current = setInterval(() => {
            if(perdioRef.current) return
            const tipo = PREMIOS[Math.floor(Math.random()*PREMIOS.length)]
            const nuevo = { id:Date.now(), tipo, x:Math.random()*80+5, y:0,}
            setPremios(prev => [...prev, nuevo])

            setTimeout(() => {
                setPremios(prev => prev.filter(p => p.id !== nuevo.id))
            }, 3000)}, 2000)

            return () => {
                clearInterval(interVolteoRef.current)
                clearInterval(interPremiosRef.current)
                clearInterval(interAcariciaRef.current)
                clearTimeout(timeoutVolteoRef.current)
            }
    }, [voltear])

    /////////////Gameover
    useEffect(() => {
        if(perdio) {
            setTimeout(() => onGameOver(puntosRef.current), 1500)
        }
    }, [perdio, onGameOver])
    //////Acariciar gatito
    const iniciarAcaricia = () => {
        if(persoVolteando || perdioRef.current) return
        setAcariciando(true)
        setGatoPose("feli")
        interAcariciaRef.current = setInterval(() => {
            if(perdioRef.current) return
            setPuntos(prev => prev + puntos_per_sec/10)
        }, 100)
    }

    ////No acariciando
    const detenerAcaricia = () => {
        setAcariciando(false)
        setGatoPose("normal")
        clearInterval(interAcariciaRef.current)
    }

    ////Tomar rpemio
    const agarrarPremio = (id) => {
        setPremios(prev => prev.filter(p => p.id !== id))
        setPuntos(prev => prev + puntos_premio)
    }

    return (
        <div style={{
        position: "relative",
        width: "800px",
        height: "500px",
        background: "lightblue",
        margin: "0 auto"
    }}>

            {/* puntos */}
            <div>{nombre}: {Math.floor(puntos)} puntos</div>

            {/* persona */}
            <div>
                <img src={persoVolteando ? "/persona_volteando.png" : "/persona_devuelta.png"} alt="persona" />
            </div>

            {/* Gatito */}
            <div onMouseDown={iniciarAcaricia} onMouseUp={detenerAcaricia} onMouseLeave={detenerAcaricia} style={{cursor: persoVolteando ? "not-allowed":"pointer"}}>
                <img style={{width:"200px", height:"200px", objectFit:"contain"}} src={`/${skinActiva === "default" ? "gato" : `skin_${skinActiva}`}_${gatoPose}.png`} alt="gato" />
            </div>

            {/* premios cayendo */}
            {premios.map(premio => (
                <div key={premio.id} onClick={() => agarrarPremio(premio.id)} style={{cursor:"pointer", animation:"caer 3s linear forwards", position:"absolute", left:`${premio.x}%`, top:"10%", width:"60px", height:"60px", zIndex:5}}>
                    <img src={`/premio_${premio.tipo}.png`} alt={premio.tipo} style={{width:"100%", height:"100%"}} />
                </div>
            ))}

            <p>Holii {nombre}</p>
            <p>Aca se juega</p>
            <button onClick={() => onGameOver(0)}>Prueba gameover</button>
            <style>{`
                @keyframes caer {
                    from { top: 5%; }
                    to   { top: 90%; }
                }
            `}</style>
        </div>
    )
}