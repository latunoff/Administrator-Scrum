import mongoose from 'mongoose' ;
let Schema = mongoose.Schema;

const ListSchema = new Schema({
    listName: { type: String, required: true },
    isPrivate: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true},
    team: { type: Schema.Types.ObjectId, ref: 'Team', index: true},
    boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true, index: true },
    cardsOrder: { type: Number, default: 1 },
    dateCreated: { type: Date, default: Date.now }, 
    lastUpdated: Date
});

export default mongoose.model('List', ListSchema);
