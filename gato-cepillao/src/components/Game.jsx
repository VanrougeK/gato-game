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
    const timeoutSigVolteoRef = useRef(null)
    const interVolteoRef = useRef(null) //
    const interPremiosRef = useRef(null)

    useEffect(() => {acariciandoRef.current = acariciando}, [acariciando])
    useEffect(() => {puntosRef.current = puntos}, [puntos])

    const voltear = useCallback(() => {
        if(perdioRef.current) return
        const espera = Math.random()*4000+3000
        timeoutVolteoRef.current = setTimeout(() => {
            if (perdioRef.current) return

        setPersoVolteando(true)

        if (acariciandoRef.current) {
            perdioRef.current = true
            setPerdio(true)
            setAcariciando(false)
            clearInterval(interAcariciaRef.current)
            return
        }

        timeoutVolteoRef.current = setTimeout(() => {
            setPersoVolteando(false)
            voltear()
        }, dur_volteo)
    }, espera)
}, [])

    useEffect(() =>{
        voltear()
        
        interPremiosRef.current = setInterval(() => {
            if(perdioRef.current) return
            const tipo = PREMIOS[Math.floor(Math.random()*PREMIOS.length)]
            const nuevo = { id:Date.now(), tipo, x:Math.random()*80+5, y:0,}
            setPremios(prev => [...prev, nuevo])

            setTimeout(() => {
                setPremios(prev => prev.filter(p => p.id !== nuevo.id))
            }, 3000)}, 2000)

            return () => {
                clearTimeout(timeoutSigVolteoRef.current)
                clearTimeout(timeoutVolteoRef.current)
                clearInterval(interPremiosRef.current)
                clearInterval(interAcariciaRef.current)
            }
    }, [programarVolteo])

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
        <div style={{position: "relative", width: "800px", height: "500px", background: "lightblue", margin: "0 auto"}}>

            {/* puntos */}
            <div style={{ position: "absolute", top: 10, left: 12, zIndex: 10, fontSize: "13px", fontFamily: "monospace" }}>
                {nombre}: {Math.floor(puntos)} puntos
                </div>

            {/* persona */}
            <div style={{ position: "absolute", right: 20, bottom: 0, width: "160px", height: "340px" }}>
                <img src={persoVolteando ? "/persona_volteando.png" : "/persona_devuelta.png"} alt="persona" style={{ width: "100%", height: "100%", objectFit: "contain" }}/>
            </div>

            {/* Gatito */}
            <div onMouseDown={iniciarAcaricia} onMouseUp={detenerAcaricia} onMouseLeave={detenerAcaricia} style={{ position: "absolute", bottom: 20, left: "28%", width: "180px", height: "180px", cursor: persoVolteando ? "not-allowed" : "pointer", userSelect: "none" }}>
                <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={`/${skinActiva === "default" ? "gato" : `skin_${skinActiva}`}_${gatoPose}.png`} alt="gato" />
            </div>

            {/* premios cayendo */}
            {premios.map(premio => (
                <div key={premio.id} onClick={() => agarrarPremio(premio.id)} style={{ position: "absolute", left: `${premio.x}%`, top: "5%", width: "55px", height: "55px", cursor: "pointer", animation: "caer 3s linear forwards", zIndex: 5 }}>
                    <img src={`/premio_${premio.tipo}.png`} alt={premio.tipo} style={{width:"100%", height:"100%"}} />
                </div>
            ))}

            {perdio && (
                <div style={{ position: "absolute", inset: 0, background: "rgba(240,240,240,0.9)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10, zIndex: 20 }}>
                    <p style={{ fontSize: "28px", fontWeight: "bold", fontFamily: "monospace" }}>Te atraparon</p>
                    <p style={{ fontSize: "14px", fontFamily: "monospace", color: "#555" }}>{Math.floor(puntos)} puntos</p>
                </div>
            )}
            <style>{` @keyframes caer{ from{top:5%} to {top: 88%}}`}</style>
        </div>
    )
}