import db from "../config/database.js";
import { DataTypes } from "sequelize";

// Definisikan model Kategori dan Menu untuk digunakan di controller
const Kategori = db.define('kategori', {
    id_sayur: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_sayur: DataTypes.STRING,
    nama_latin: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    kalori: DataTypes.STRING,
    karbohidrat: DataTypes.STRING,
    protein: DataTypes.STRING,
    lemak: DataTypes.STRING,
    serat: DataTypes.STRING,
    vitamin: DataTypes.STRING,
    mineral: DataTypes.STRING,
    manfaat: DataTypes.TEXT,
    pemilihan: DataTypes.TEXT,
    penyimpanan_jangka_pendek: DataTypes.TEXT,
    penyimpanan_jangka_lama: DataTypes.TEXT,
}, {
    timestamps: false,
    tableName: 'kategori'
});

const Menu = db.define('menu', {
    jenis_masakan: DataTypes.STRING,
    nama_masakan: DataTypes.STRING,
    link_resep: DataTypes.STRING,
}, {
    timestamps: false,
    tableName: 'menu'
});

export const getVegetables = async (req, res) => {
    try {
        const vegetables = await Kategori.findAll({
            include: [{
                model: Menu,
                as: 'menus'
            }]
        });
        res.json(vegetables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getVegetableById = async (req, res) => {
    try {
        const vegetable = await Kategori.findOne({
            where: { id_sayur: req.params.id },
            include: [{
                model: Menu,
                as: 'menus'
            }]
        });
        if (!vegetable) return res.status(404).json({ message: "Vegetable not found" });
        res.json(vegetable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createVegetable = async (req, res) => {
    try {
        const vegetable = await Kategori.create(req.body);
        res.status(201).json(vegetable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateVegetable = async (req, res) => {
    try {
        const vegetable = await Kategori.update(req.body, {
            where: { id_sayur: req.params.id }
        });
        if (!vegetable[0]) return res.status(404).json({ message: "Vegetable not found" });
        res.json({ message: "Vegetable updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteVegetable = async (req, res) => {
    try {
        const result = await Kategori.destroy({
            where: { id_sayur: req.params.id }
        });
        if (!result) return res.status(404).json({ message: "Vegetable not found" });
        res.json({ message: "Vegetable deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
