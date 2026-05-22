import { useState } from "react";

export default function Register({ onVolver }) {
    const [usuario, setUsuario] = useState("")
    const [password, setPassword] = useState("")
    const [confirmar, setConfirmar] = useState("")
    const [error, setError] = useState("")
    const [mensaje, setMensaje] = useState("")

    const crearCuenta = async () => {
        setError("")
        setMensaje("")

        if (!usuario || !password || !confirmar) {
            setError("Completa todos los campos")
            return
        }

        if (password !== confirmar) {
            setError("Completa todos los campos")
            setError("Las contraseñas no coinciden")
            return
        }

        if (password.length < 4) {
            setError("Minimo 4 caracteres")
            return
        } try {
            const res = await fetch("https://back-gatitos.onrender.com/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    usuario, password
                })
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error)
                return
            }
            setMensaje("Cuenta creada")
        } catch(err) {
            setError("Error del servidor")
        }
    }

    return(
        <div style={{ background:"#f0f0f0", minHeight:"100vh", fontFamily:"monospace" }}>
            <div style={{width:"500px", margin:"40px auto", border:"1px solid #999", background:"#fff"}}>
                <div style={{borderBottom:"1px solid #999", padding:"4px 8px", display:"flex", justifyContent:"space-between"}}>
                    <span></span>
                    <span>REGISTER.EXE</span>
                    <span>□ X</span>
                </div>

                <div style={{padding:"30px", display:"flex", flexDirection:"column", gap:"18px"}}>
                    <h1 style={{fontSize:"40px", margin:0}}>Crear cuenta</h1>
                    <input type="text" placeholder="Usuario" value={usuario} onChange={(e)=>setUsuario(e.target.value)} style={{padding:"8px", border:"1px solid #999", fontFamily:"monospace"}}/>
                    <input type="password" placeholder="cONTRASEÑA" value={password} onChange={(e)=>setPassword(e.target.value)} style={{padding:"8px", border:"1px solid #999", fontFamily:"monospace"}}/>
                    <input type="password" placeholder="Confirmar Contraseña" value={confirmar} onChange={(e)=>setConfirmar(e.target.value)} style={{padding:"8px", border:"1px solid #999", fontFamily:"monospace"}}/>
                    {error && (
                    <p style={{color:"red", fontSize:"12px"}}>{error}</p>
                )}
                {mensaje && (
                    <p style={{color:"green", fontSize:"12px"}}>{mensaje}</p>
                )}

                <div style={{display:"flex", gap:"10px"}}>
                    <button onClick={crearCuenta} style={{padding:"6px 18px", border:"1px solid #999", background:"#f0f0f0", cursor:"pointer", fontFamily:"monospace"}}>Crear cuenta</button>
                    <button onClick={onVolver} style={{padding:"6px 18px", border:"1px solid #999", background:"#f0f0f0", cursor:"pointer", fontFamily:"monospace"}}>Volver</button>
                </div>
                </div>
            </div>
        </div>
    )
}