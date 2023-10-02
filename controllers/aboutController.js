const About = require('../Models/aboutModel');

// Create a new about page
exports.createAbout = async (req, res) => {
  try {
    const { title, content } = req.body;
    const about = new About({ title, content });
    await about.save();
    res.status(201).json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get the about page
exports.getAbout = async (req, res) => {
  try {
    const about = await About.find({});
    if (!about) {
      return res.status(404).json({ error: 'About page not found' });
    }
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Update the about page
exports.updateAbout = async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  try {
    console.log('Updating About page with ID:', id);
    console.log('New Title:', title);
    console.log('New Content:', content);
    const updatedAbout = await About.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!updatedAbout) {
      return res.status(404).json({ error: 'About page not found' });
    }
    console.log('About page updated successfully:', updatedAbout);
    res.status(200).json(updatedAbout);
    console.log(updatedAbout);
  } catch (err) {
    console.error('Error updating About page:', err);
    res.status(500).json({ error: err.message });
  }
};

// Delete the about page
// exports.deleteAbout = async (req, res) => {
//   try {
//     const deletedAbout = await About.findOneAndDelete();
//     if (!deletedAbout) {
//       return res.status(404).json({ error: 'About page not found' });
//     }
//     res.status(200).json({ message: 'About page deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

