import User from '../models/usuario.js';
import Imagem from '../models/imagem.js';
import fs from 'fs';
import path from 'path';

export const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
        
        const userId = req.userId; // Middleware popula req.userId
        const user = await User.findByPk(userId);
        
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

        // Caminho relativo para salvar no banco (acessível pelo frontend)
        const relativePath = `/img/imguser/${req.file.filename}`;
        
        user.foto_perfil = relativePath;
        await user.save();

        res.status(200).json({ message: 'Avatar atualizado com sucesso!', path: relativePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao fazer upload do avatar.' });
    }
};

export const uploadBackground = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
        
        const userId = req.userId;
        const user = await User.findByPk(userId);
        
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

        const relativePath = `/img/imguser/${req.file.filename}`;
        
        user.imagem_fundo = relativePath;
        await user.save();

        res.status(200).json({ message: 'Fundo atualizado com sucesso!', path: relativePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao fazer upload do fundo.' });
    }
};

export const uploadGalleryImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
        
        const userId = req.userId;
        const relativePath = `/img/imguser/${req.file.filename}`;

        const novaImagem = await Imagem.create({
            usuarioId: userId,
            caminho: relativePath
        });

        res.status(201).json({ message: 'Imagem salva na galeria!', imagem: novaImagem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao salvar imagem.' });
    }
};

export const getUserImages = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findByPk(userId, {
            attributes: ['foto_perfil', 'imagem_fundo']
        });

        if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

        res.status(200).json({ 
            avatar: user.foto_perfil, 
            background: user.imagem_fundo 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar imagens do usuário.' });
    }
};

// Funções de Update (reutilizando a lógica de upload)
export const updateAvatar = uploadAvatar;
export const updateBackground = uploadBackground;
