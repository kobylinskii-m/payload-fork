import path from 'path';
import { CollectionConfig } from '../../../../src/collections/config/types';

const Uploads: CollectionConfig = {
  slug: 'uploads',
  upload: {
    staticDir: path.resolve(__dirname, './uploads'),
  },
  fields: [
    {
      type: 'text',
      name: 'text',
    },
    {
      type: 'upload',
      name: 'media',
      relationTo: 'uploads',
    },
  ],
};

export const uploadsDoc = {
  text: 'An upload here',
};

export default Uploads;
