import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const BoardSchema = new Schema({
    boardName: { type: String, required: true },
    boardType: { type: String, default: 'scrum' },
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true, index: true},
    team: {type: Schema.Types.ObjectId, ref: 'Team', index: true},
    dateCreated: { type: Date, default: Date.now }, 
    lastUpdated: Date, 
    noOfLists: { type: Number, default:0 }
});

export default mongoose.model('Board', BoardSchema);
