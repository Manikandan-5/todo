import TodoTitle from '../model/todotitleModel.js';

// get titles
const getTitles = async (req, res) => {
    try {
        const todotitles = await TodoTitle.find({}).select("-__v");
        res.status(200).json(todotitles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


// create a  title
const createTitle = async (req, res) => {
    const { title } = req.body;
    try {
        const todotitle = await TodoTitle.create({ title });
        res.status(201).json({ message: "Successfully Created", data: todotitle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// update a title by id
const updateTitle = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const updatedTitle = await TodoTitle.findByIdAndUpdate(id, { title }, { new: true });
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
const deleteTitle = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTitle = await TodoTitle.findByIdAndDelete(id);
        if (!deletedTitle) {
            return res.status(404).json({ message: "Title not found" });
        }
        res.status(200).json({ message: "Successfully Deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export { getTitles,  createTitle, updateTitle, deleteTitle };
