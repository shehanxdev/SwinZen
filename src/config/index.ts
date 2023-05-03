import { create } from 'twrnc';

export * from './paper.config';
export * from './moment.config';

export const tw = create(require('./tailwind.config'));
