import { create } from 'twrnc';

export * from './paper.config';
export * from './dayjs.config';

export const tw = create(require('./tailwind.config'));
