'use client'
import { useEffect, useState } from 'react';

// Importe o arquivo JSON diretamente
// Você precisará criar este arquivo na raiz do projeto
import dadosJson from '../../funcao/dados.json';

export default function Home() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    // Simula uma chamada API com um pequeno atraso
    setTimeout(() => {
      setInfo(dadosJson);
      console.log("Dados carregados:", dadosJson);
    }, 500);
  }, []);
  
  return (
    <div>
      <h1>Dados da API</h1>
      {info ? (
        <ul>
          <li>Email: {info.email}</li>
          <li>Senha: {info.senha}</li>
        </ul>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}