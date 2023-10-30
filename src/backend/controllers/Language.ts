import { Response } from 'miragejs';

import languageData from '../db/languageData';

export const getLanguages = () => new Response(200, {}, { rows: languageData });
