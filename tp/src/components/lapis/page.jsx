import React from "react";

const LapisBranco = () => (
  <div style={{ position: "absolute", width: "100%", height: "110px", reight: "1%"}}>
    {/* Conteúdo aqui, se quiser */}
    
    <div style={{
      position: "absolute",
      right: "30%", // margem da borda direita
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      /*alignItems: "center",*/
      /*justifyContent: "center",*/
      height: "32px",
      width: "32px",
      cursor: "pointer"
    }}>
      {/* Ícone de lápis branco em SVG */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25z"
          fill="#fff"
        />
        <path
          d="M20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"
          fill="#fff"
        />
      </svg>
    </div>
  </div>
);

export default LapisBranco;
