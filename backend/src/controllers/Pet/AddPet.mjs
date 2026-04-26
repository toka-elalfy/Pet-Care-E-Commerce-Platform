import { validationResult } from "express-validator";
import Pet from "../../models/pet.mjs";

export const AddPet = async (req, res) => {
    try {
        const result =  validationResult(req);
        if(!result.isEmpty()) {
            return res.status(400).send(result.array());
        }
        const { name, type, breed, age, weight, photo, size, needs } = req.body;
        const existedPet = await Pet.findOne({
            name : name,
            owner : req.user._id
        });
        if(existedPet) {
            return res.status(400).json({"msg" : "Pet Already exists"});
        }
        const pet = await Pet.create({
            owner : req.user._id,
            name,
            type,
            breed,
            age,
            weight,
            photo,
            size,
            needs
        });
        return res.status(201).json({"msg" : "Pet Added Successfully"});

    } catch (err) {
        return res.status(400).json({"msg" : err.message});
    }
}