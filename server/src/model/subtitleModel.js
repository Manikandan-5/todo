import mongoose from 'mongoose';

const subtitleSchema = new mongoose.Schema({
  subtitle: {
    type: String,
    required: true,
  },
  titleId: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the Title model
    ref: 'TodoTitle',  // This establishes the relationship with the Title model
    required: true,  // Make sure titleId is provided
  },
  
}, { timestamps: true });

const Subtitle = mongoose.model('Subtitle', subtitleSchema);

export default Subtitle;
