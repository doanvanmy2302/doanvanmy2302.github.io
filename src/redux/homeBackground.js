import { HOME_IMAGE } from '../shared/Image';

export const HomeBackground = (state = HOME_IMAGE, action) => {
        switch(action.type) {
            default:
                return state;
        };
};