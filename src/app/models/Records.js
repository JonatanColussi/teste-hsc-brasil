import mongoose from 'mongoose';

const RecordsSchema = new mongoose.Schema({
  key: {
    type: String,
    unique: true,
  },
  value: {
    type: mongoose.Mixed,
  },
});

export default mongoose.model('Records', RecordsSchema);
