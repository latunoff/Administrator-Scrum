import mongoose from 'mongoose' ;
let Schema = mongoose.Schema;

const CardSchema = new Schema({
    cardName: { type: String, required: true },
    isPrivate: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true},
    team: { type: Schema.Types.ObjectId, ref: 'Team', index: true},
    listId: { type: Schema.Types.ObjectId, ref: 'List', required: true, index: true},
    boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true, index: true },    
    dateCreated: { type: Date, default: Date.now }, 
    lastUpdated: Date, 
    dueDate: Date, 
    cardDesc: String, 
    priority: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false }, 
    members: { type: [{type: Schema.Types.ObjectId,ref: 'User'}],	index: true	}, 
    activityLog: [
        {
            listId: {type: Schema.Types.ObjectId, ref: 'List'},
            assignTime: Date 
        }
    ], 
    discussion: [
        {
            comment: String, 
            user: Schema.Types.ObjectId, 
            postedAt: Date
        }
    ] 
});

export default mongoose.model('Card', CardSchema);
