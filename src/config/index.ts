import { create } from 'twrnc';

export * from './dayjs.config';
export * from './paper.config';
export * from './persist-plugin.config';

export const tw = create(require('./tailwind.config'));
