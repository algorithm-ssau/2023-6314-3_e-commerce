import { CorsOptions } from 'cors';
import allowedOrigins from './allowedOrigins.js';

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // see https://github.com/gitdagray/express_user_roles/blob/main/config/corsOptions.js
    // if (origin && allowedOrigins.includes(origin) || !origin) {
    //   callback(null, true);
    // } else {
    //   callback(new Error('Not allowed by CORS'));
    // }
    callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
