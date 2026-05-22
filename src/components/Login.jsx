import { useState } from "react";

export default function Login({ onLogin, onRegister }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const iniciarSesion = async () => {
    if (!usuario || !password) {
      setError("Completa todos los campos");
      return;
    }
    try {
      const res = await fetch("https://back-gatitos.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", data.usuario);

      onLogin(data.usuario);
    } catch (err) {
      setError("Error del servidor");
    }
  };

  return (
    <div
      style={{
        background: "#f0f0f0",
        minHeight: "100vh",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          width: "500px",
          margin: "40px auto",
          border: "1px solid #999",
          background: "#fff",
        }}
      >
        <div
          style={{
            borderBottom: "1px solid #999",
            padding: "4px 8px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Login.EXE</span>
          <span>□ X</span>
        </div>

        <div
          style={{
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <h1 style={{ fontSize: "40px", margin: 0 }}>Login</h1>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={{
              padding: "8px",
              border: "1px solid #999",
              fontFamily: "monospace",
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "8px",
              border: "1px solid #999",
              fontFamily: "monospace",
            }}
          />

          {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={iniciarSesion}
              style={{
                padding: "6px 18px",
                border: "1px solid #999",
                background: "#f0f0f0",
                cursor: "pointer",
                fontFamily: "monospace",
              }}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={onRegister}
              style={{
                padding: "6px 18px",
                border: "1px solid #999",
                background: "#f0f0f0",
                cursor: "pointer",
                fontFamily: "monospace",
              }}
            >
              Crear cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
