/**
 * Created by saubhagya on 9/5/17.
 */

import thunkMiddleware from 'redux-thunk';
import { logger } from './logger.middleware';

export const middleware1 = [
    logger,
    thunkMiddleware
];