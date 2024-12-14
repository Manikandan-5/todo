import SubTitle from '../model/subtitleModel.js';

// get titles
const getsubTitles = async (req, res) => {
    try {
        const SubTitles = await SubTitle.find({}).select("-__v");
        res.status(200).json(SubTitles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


// create a  title
const createsubTitle = async (req, res) => {
    const { subtitle, titleId } = req.body; // Ensure titleId is passed in the request

    if (!titleId) {
        return res.status(400).json({ message: "Title ID is required to create a subtitle." });
    }

    try {
        const newSubTitle = await SubTitle.create({ subtitle, titleId });
        res.status(201).json({ message: "Subtitle created successfully", data: newSubTitle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


// update a title by id
const updatesubTitle = async (req, res) => {
    const { id } = req.params;
    const { subtitle } = req.body;
    try {
        const updatedTitle = await SubTitle.findByIdAndUpdate(id, { subtitle }, { new: true });
        if (!updatedTitle) {
            return res.status(404).json({ message: "Title not found" });
        }
        res.status(200).json({ message: "Successfully Updated", data: updatedTitle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// delete a title by ID
const deletesubTitle = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTitle = await SubTitle.findByIdAndDelete(id);
        if (!deletedTitle) {
            return res.status(404).json({ message: "Title not found" });
        }
        res.status(200).json({ message: "Successfully Deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export { getsubTitles,  createsubTitle, updatesubTitle, deletesubTitle };
