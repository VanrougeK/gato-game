import { useEffect, useState } from "react";

export default function Ranking({ onVolver }) {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3014/ranking")
      .then((res) => res.json())
      .then((data) => setJugadores(data));
  }, []);

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
          margin: "20px auto",
          width: "700px",
          border: "1px solid #999",
          background: "#f0f0f0",
        }}
      >
        {/* titulo ventana */}
        <div
          style={{
            background: "#f0f0f0",
            borderBottom: "1px solid #999",
            padding: "3px 6px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "11px", fontFamily: "monospace" }}>
            TUNNAPAD.EXE - game_over.tunna
          </span>
          <div style={{ display: "flex", gap: "2px" }}>
            {["_", "□", "X"].map((b) => (
              <button
                key={b}
                style={{
                  width: "14px",
                  height: "12px",
                  background: "#f0f0f0",
                  border: "1px solid #999",
                  fontSize: "8px",
                  cursor: "pointer",
                  fontFamily: "monospace",
                }}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* barm */}
        <div
          style={{
            borderBottom: "1px solid #ccc",
            padding: "2px 8px",
            display: "flex",
            gap: "20px",
          }}
        >
          {["FILE", "OPTIONS", "WINDOW", "HELP"].map((m) => (
            <span
              key={m}
              style={{
                fontSize: "11px",
                fontFamily: "monospace",
                cursor: "pointer",
                color: "#000",
              }}
            >
              {m}
            </span>
          ))}
        </div>

        <div style={{ display: "flex" }}>
          {/* sidebar */}
          <div
            style={{
              width: "60px",
              borderRight: "1px solid #ccc",
              padding: "8px 4px",
              background: "#f0f0f0",
              fontSize: "9px",
              fontFamily: "monospace",
              color: "#555",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              file 1
            </span>
          </div>

          {/* tunnapad */}
          <div
            style={{
              flex: 1,
              background: "#fff",
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              minHeight: "380px",
            }}
          >
            <p
              style={{
                fontSize: "52px",
                fontWeight: "bold",
                fontFamily: "monospace",
                color: "#000",
                lineHeight: 1,
              }}
            >
              ranking
            </p>
            <hr style={{ border: "none", borderTop: "1px solid #ddd" }} />

            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "6px",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "monospace",
                    color: "#555",
                    textDecoration: "underline",
                  }}
                >
                  # nombre
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "monospace",
                    color: "#555",
                    textDecoration: "underline",
                  }}
                >
                  puntuacion
                </span>
              </div>

              {jugadores.length === 0 ? (
                <p
                  style={{
                    fontSize: "12px",
                    fontFamily: "monospace",
                    color: "#555",
                  }}
                >
                  ▀▄▀ sin datos aun ▄▀▄
                </p>
              ) : (
                jugadores.map((jugador, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "4px 0",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <span style={{ fontSize: "12px", fontFamily: "monospace" }}>
                      {index + 1}.{jugador.username}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontFamily: "monospace",
                        color: "#555",
                      }}
                    >
                      {jugador.puntuacion_max} puntos
                    </span>
                  </div>
                ))
              )}
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #ddd" }} />
            <button
              onClick={onVolver}
              style={{
                background: "#f0f0f0",
                border: "1px solid #999",
                padding: "4px 18px",
                fontFamily: "monospace",
                fontSize: "12px",
                cursor: "pointer",
                color: "#000",
                width: "fit-content",
              }}
            >
              ← Volver
            </button>
          </div>

          {/* scrollbar */}
            <div style={{ width: "14px", background: "#f0f0f0", borderLeft: "1px solid #ccc", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", borderBottom: "1px solid #ccc", cursor: "pointer" }}>▲</div>
              <div style={{ flex: 1, background: "repeating-linear-gradient(45deg,#f0f0f0,#f0f0f0 1px,#e0e0e0 1px,#e0e0e0 2px)" }}></div>
              <div style={{ height: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", borderTop: "1px solid #ccc", cursor: "pointer" }}>▼</div>
            </div>

            {/* panel derecho */}
            <div style={{ width: "130px", borderLeft: "1px solid #999", padding: "12px 10px", background: "#f0f0f0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ fontSize: "11px", fontFamily: "monospace", fontWeight: "bold", textDecoration: "underline" }}>INFO</p>
              <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", lineHeight: "1.6" }}>Top jugadores <br /> ordenados por <br /> puntuacion</p>
              <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", lineHeight: "1.6" }}>version: <br />1.0.0</p>
            </div>
          </div>

          {/* statussbar */}
          <div style={{ borderTop: "1px solid #999", padding: "2px 8px", display: "flex", justifyContent: "space-between", background: "#f0f0f0" }}>
            <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", border: "1px solid #ccc", padding: "1px 6px" }}>C:\juegos\peina_al_gatito.tunna</span>
            <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#555", border: "1px solid #ccc", padding: "1px 6px" }}>1 of 1</span>
          </div>

        </div>
      </div>
  )
}
