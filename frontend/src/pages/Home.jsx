import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [nome, setNome] = useState('');
  const [candidato, setCandidato] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nome || !candidato) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const voto = {
      name: nome,
      vote: parseInt(candidato) // Convertendo o valor do select para inteiro
    };

    try {
      const response = await fetch('http://192.168.30.128:5000/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(voto)
      });

      if (response.ok) {
        alert('Voto registrado com sucesso!');
        setNome('');
        setCandidato('');
      } else {
        alert('Erro ao registrar o voto.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro inesperado.');
    }
  };

  return (
    <div className="container">
      <h1>Votação</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="candidato">Candidato:</label>
          <select id="candidato" value={candidato} onChange={(e) => setCandidato(e.target.value)}>
            <option value="0">Votar em Branco</option>
            <option value="1">JeffinGamerPlay</option>
            <option value="2">TheCastMaster</option>
          </select>
        </div>
        <button type="submit">Votar</button>
      </form>
    </div>
  );
}

export default Home;