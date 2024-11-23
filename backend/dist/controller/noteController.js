import noteModel from "../models/noteModel.js";
export const createNoteController = async (req, res) => {
    try {
        const { note } = req.body;
        const user = req.user_id;
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "Something wen'g wrong"
            });
        }
        if (!note) {
            res.status(200).send({
                success: false,
                message: "Empty field not allowed"
            });
        }
        console.log(note);
        await new noteModel({ note, user }).save();
        res.status(200).send({
            success: true,
            message: "Note added"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Server Error",
            error
        });
    }
};
export const getAllNotesController = async (req, res) => {
    try {
        const user = req.user_id;
        if (!user) {
            return req.status(200).send({
                success: false,
                message: "Something went wrong"
            });
        }
        const notes = await noteModel.find({ user });
        res.status(200).send({
            success: true,
            message: "Getting notes",
            notes
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Server error"
        });
    }
};
export const deleteNoteController = async (req, res) => {
    try {
        const id = req.params.id;
        const uid = req.user_id;
        if (!uid) {
            return req.status(200).send({
                success: false,
                message: "Something went wrong"
            });
        }
        await noteModel.findOneAndDelete({ _id: id, user: uid });
        res.status(200).send({
            success: true,
            message: "Note deleted!"
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Server error",
            error
        });
    }
};
//# sourceMappingURL=noteController.js.map