import fieldsModel from "../../model/fields/index.js"


const fieldController = {
    getAll: async (req, res) => {
        try {
            const fields = await fieldsModel.findAll()
            res.status(200).json({message: "All Fields", fields})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal server error"})
        }
    },
    getbyId: async (req, res) => {
        try {
            const { id } = req.params;
            console.log(id)
            const field = await fieldsModel.findOne({where: {id}})

            if(!field){
                return res.status(400).json({message: "No field with this ID"})
            }

            res.status(200).json({message: "Here is the field", field})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal Server Error"})
        }
    },
    post: async (req, res) => {
        try {
            const payload = req.body;
            const field = await fieldsModel.create({
                name: payload.fieldName,
                description: payload.fieldDescription,
                longitude: payload.fieldLongitude,
                latitude: payload.fieldLatitude,
                rate: payload.fieldRate
            })
            res.status(200).json({message: "Field Created", field})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal Server Error"})
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body;

            const field = await fieldsModel.findOne({where: {id}})
            if(!field) {
               return res.status(400).json({message: "No field with this ID"})
            }

            payload.name ? field.name = payload.name : field.name;
            payload.description ? field.description = payload.description : field.description;
            payload.image ? field.image = payload.image : field.image;
            payload.latitude ? field.latitude = payload.latitude : field.latitude;
            payload.longitude ? field.longitude = payload.longitude : field.longitude
            await field.save()

            res.status(200).json({messgae: "Field Updated", field})

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal Server Error"})
        }
    },
    delete: async (req, res) => {
        try {
            const {id} = req.params
            const field = await fieldsModel.findOne({where: {id}})
            if(!field) {
               return res.status(400).json({message: "No field with this ID"})
            }

            await field.destroy()
            res.status(200).json({message: "Field Deleted"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal Server Error"})
        }
    }
}

export default fieldController;