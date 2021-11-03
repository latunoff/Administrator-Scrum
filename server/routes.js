import authRoute from './api/auth';
import boardRoute from './api/board';
import cardRoute from './api/card';
import listRoute from './api/list'; 
import userRoute from './api/user';
import path from 'path'; 

export default function(app) {
    app.use('/api/card', cardRoute);
    app.use('/api/list', listRoute);
    app.use('/api/board', boardRoute);
    app.use('/api/users', userRoute);
    app.use('/api/auth', authRoute);
};
