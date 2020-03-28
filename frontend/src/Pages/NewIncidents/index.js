import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../Services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncidents() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    
    const history = useHistory();
    const ong_id = localStorage.getItem('@ongId');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ong_id,
                }
            });
            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar casos');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="" />

                    <h1>Cadastro novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar umherói pararesolver isso.</p>

                    <Link className='back-link' to="/profile">
                        <FiArrowLeft size={16} color='#E02041' />
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        type="text" 
                        placeholder='Titulo do Caso' 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder='Descriçao' 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder='Valor em reais' 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type='submit'>
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}