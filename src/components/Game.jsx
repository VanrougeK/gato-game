import { useState, useEffect, useRef, useCallback } from "react";

const PREMIOS = ["gato", "pescado", "pan", "flan", "fresa"];
const dur_volteo = 1500;
const puntos_per_sec = 10;
const puntos_premio = 25;
const DURACION_CAIDA = 6000;

export default function Game({ nombre, skinActiva, onGameOver }) {
  const [puntos, setPuntos] = useState(0);
  const [persoVolteando, setPersoVolteando] = useState(false);
  const [acariciando, setAcariciando] = useState(false);
  const [premios, setPremios] = useState([]);
  const [perdio, setPerdio] = useState(false);
  const [gatoPose, setGatoPose] = useState("normal");
  const [flashRojo, setFlashRojo] = useState(false);

  const acariciandoRef = useRef(false);
  const perdioRef = useRef(false);
  const puntosRef = useRef(0);
  const interAcariciaRef = useRef(null);
  const timeoutVolteoRef = useRef(null);
  const interPremiosRef = useRef(null);

  useEffect(() => {
    acariciandoRef.current = acariciando;
  }, [acariciando]);
  useEffect(() => {
    puntosRef.current = puntos;
  }, [puntos]);

  const voltear = useCallback(() => {
    if (perdioRef.current) return;
    const espera = Math.random() * 4000 + 3000;
    timeoutVolteoRef.current = setTimeout(() => {
      if (perdioRef.current) return;

      setPersoVolteando(true);

      if (acariciandoRef.current) {
        perdioRef.current = true;
        setPerdio(true);
        setFlashRojo(true);
        setAcariciando(false);
        clearInterval(interAcariciaRef.current);
        return;
      }

      timeoutVolteoRef.current = setTimeout(() => {
        setPersoVolteando(false);
        voltear();
      }, dur_volteo);
    }, espera);
  }, []);

  useEffect(() => {
    voltear();

    interPremiosRef.current = setInterval(() => {
      if (perdioRef.current) return;
      const tipo = PREMIOS[Math.floor(Math.random() * PREMIOS.length)];
      const nuevo = {
        id: Date.now(),
        tipo,
        x: Math.random() * 80 + 5,
        startTime: Date.now(),
      };
      setPremios((prev) => [...prev, nuevo]);

      setTimeout(() => {
        setPremios((prev) => prev.filter((p) => p.id !== nuevo.id));
      }, DURACION_CAIDA);
    }, 2000);

    return () => {
      clearTimeout(timeoutVolteoRef.current);
      clearInterval(interPremiosRef.current);
      clearInterval(interAcariciaRef.current);
    };
  }, [voltear]);

  /////////////Gameover
  useEffect(() => {
    if (perdio) {
      setTimeout(() => onGameOver(puntosRef.current), 1800);
    }
  }, [perdio, onGameOver]);

  //////Acariciar gatito
  const iniciarAcaricia = () => {
    if (perdioRef.current) return;
    if (persoVolteando) {
      perdioRef.current = true;
      setPerdio(true);
      setFlashRojo(true);
      return;
    }
    setGatoPose("feli");
    setPuntos((prev) => prev + 2);
    setTimeout(() => setGatoPose("normal"), 150)
  };

  ////No acariciando
  const detenerAcaricia = () => {
    setAcariciando(false);
    setGatoPose("normal");
    clearInterval(interAcariciaRef.current);
  };

  ////Tomar rpemio
  const agarrarPremio = (id) => {
    setPremios((prev) => prev.filter((p) => p.id !== id));
    setPuntos((prev) => prev + puntos_premio);
  };
  const duracionCaidas = `${DURACION_CAIDA / 1000}s`;

  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", padding: "0 12px", boxSizing: "border-box" }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "#DAE8ED", borderRadius: "4px", overflow: "hidden", border: "2px solid #888", boxSizing: "border-box", boxShadow: flashRojo ? "0 0 0 4px #e55 inset" : "none", transition: "box-shadow 0.2s" }}>
        <div style={{ position: "absolute", top: "2%", left: "2%", zIndex: 10, fontSize: "clamp(10px, 1.4vw, 15px)", fontFamily: "monospace", background: "rgba(255,255,255,0.7)", padding: "3px 10px", border: "1px solid #aaa", borderRadius: "2px" }}>
            {nombre}: {Math.floor(puntos)}pts
        </div>
        {persoVolteando && !perdio && (
            <div style={{ position: "absolute", top: "2%", left: "50%", transform: "translateX(-50%)", zIndex: 10, fontSize: "clamp(9px, 1.2vw, 13px)", fontFamily: "monospace", background: "#ffe066", padding: "3px 10px", border: "1px solid #bba", borderRadius: "2px", animation: "parpadear 0.4s step-end infinite" }}>
                ¡CUIDADOOOO!
            </div>
        )}
        <div style={{ position: "absolute", right: "2%", bottom: 0, width: "clamp(140px, 30%, 280px)", height: "clamp(140px, 30%, 280px)" }}>
            <img src={persoVolteando ? "/persona_volteando.png" : "/persona_devuelta.png"} alt="persona" style={{ width: "100%", height: "100%", objectFit: "contain" }}/>
        </div>

        <div onMouseDown={iniciarAcaricia} onMouseUp={detenerAcaricia} onMouseLeave={detenerAcaricia} onTouchStart={(e) => { e.preventDefault(); iniciarAcaricia() }} onTouchEnd={(e) => { e.preventDefault(); detenerAcaricia() }} style={{ position: "absolute", bottom: "3%", left: "28%", width: "clamp(110px, 22%, 210px)", height: "clamp(200px, 44%, 440px)", cursor: perdio ? "default" : "pointer", userSelect: "none", touchAction: "none", filter: acariciando ? "drop-shadow(0 0 8px #ffd700)" : "none", transition: "filter 0.15s" }}>
            <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={`/${skinActiva}_${gatoPose}.png`} alt="gato" draggable={false}/>
        </div>

        {premios.map(premio => (
            <div key={premio.id} onClick={() => agarrarPremio(premio.id)} onTouchStart={(e) => { e.preventDefault(); agarrarPremio(premio.id) }} style={{ position: "absolute", left: `${premio.x}%`, top: "5%", width: "clamp(30px, 5.5%, 55px)", height: "clamp(30px, 5.5%, 55px)", cursor: "pointer", animation: `caer ${duracionCaidas} linear forwards`, zIndex: 5, touchAction: "none" }}>
                <img src={`/premio_${premio.tipo}.png`} alt={premio.tipo} style={{ width: "100%", height: "100%", pointerEvents: "none" }} draggable={false}/>
            </div>
        ))}

        {perdio && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(240,240,240,0.92)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10, zIndex: 20 }}>
                <p style={{ fontSize: "clamp(18px, 3vw, 32px)", fontWeight: "bold", fontFamily: "monospace" }}>Oh no! Te atraparon</p>
                <p style={{ fontSize: "clamp(11px, 1.5vw, 16px)", fontFamily: "monospace", color: "#555" }}>{Math.floor(puntos)} puntos</p>
            </div>
        )}

        <style>{`
                    @keyframes caer { from { top: 5%; } to { top: 90%; } }
                    @keyframes parpadear { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
                `}</style>
        </div>
    </div>
  )
}