/* eslint-disable @typescript-eslint/ban-ts-comment */
import path from 'path';
import fs from 'fs';
import { buildConfig } from '../buildConfig';
import { devUser } from '../credentials';
import ArrayFields, { arrayDoc } from './collections/Array';
import BlockFields, { blocksDoc } from './collections/Blocks';
import CollapsibleFields, { collapsibleDoc } from './collections/Collapsible';
import ConditionalLogic, { conditionalLogicDoc } from './collections/ConditionalLogic';
import DateFields, { dateDoc } from './collections/Date';
import RichTextFields, { richTextDoc } from './collections/RichText';
import SelectFields, { selectsDoc } from './collections/Select';
import TabsFields, { tabsDoc } from './collections/Tabs';
import TextFields, { textDoc, textFieldsSlug } from './collections/Text';
import PointFields, { pointDoc } from './collections/Point';
import GroupFields, { groupDoc } from './collections/Group';
import getFileByPath from '../../src/uploads/getFileByPath';
import Uploads, { uploadsDoc } from './collections/Upload';
import IndexedFields from './collections/Indexed';
import NumberFields, { numberDoc } from './collections/Number';
import CodeFields, { codeDoc } from './collections/Code';
import RelationshipFields from './collections/Relationship';
import RadioFields, { radiosDoc } from './collections/Radio';

export default buildConfig({
  admin: {
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config?.resolve?.alias,
          fs: path.resolve(__dirname, './mocks/emptyModule.js'),
        },
      },
    }),
  },
  collections: [
    ArrayFields,
    BlockFields,
    CodeFields,
    CollapsibleFields,
    ConditionalLogic,
    DateFields,
    RadioFields,
    GroupFields,
    IndexedFields,
    NumberFields,
    PointFields,
    RelationshipFields,
    RichTextFields,
    SelectFields,
    TabsFields,
    TextFields,
    Uploads,
  ],
  localization: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },
  onInit: async (payload) => {
    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    });

    const createdArrayDoc = await payload.create({ collection: 'array-fields', data: arrayDoc });
    await payload.create({ collection: 'collapsible-fields', data: collapsibleDoc });
    await payload.create({ collection: 'conditional-logic', data: conditionalLogicDoc });
    await payload.create({ collection: 'group-fields', data: groupDoc });
    await payload.create({ collection: 'select-fields', data: selectsDoc });
    await payload.create({ collection: 'radio-fields', data: radiosDoc });
    await payload.create({ collection: 'tabs-fields', data: tabsDoc });
    await payload.create({ collection: 'point-fields', data: pointDoc });
    await payload.create({ collection: 'date-fields', data: dateDoc });
    await payload.create({ collection: 'code-fields', data: codeDoc });

    const createdTextDoc = await payload.create({ collection: textFieldsSlug, data: textDoc });

    const uploadsDir = path.resolve(__dirname, './collections/Upload/uploads');

    if (fs.existsSync(uploadsDir)) fs.readdirSync(uploadsDir).forEach((f) => fs.rmSync(`${uploadsDir}/${f}`));

    const filePath = path.resolve(__dirname, './collections/Upload/payload.jpg');
    const file = await getFileByPath(filePath);

    const createdUploadDoc = await payload.create({ collection: 'uploads', data: uploadsDoc, file });

    const richTextDocWithRelId = JSON.parse(JSON.stringify(richTextDoc).replace('{{ARRAY_DOC_ID}}', createdArrayDoc.id));
    const richTextDocWithRelationship = { ...richTextDocWithRelId };

    const richTextRelationshipIndex = richTextDocWithRelationship.richText.findIndex(({ type }) => type === 'relationship');
    richTextDocWithRelationship.richText[richTextRelationshipIndex].value = { id: createdTextDoc.id };

    const richTextUploadIndex = richTextDocWithRelationship.richText.findIndex(({ type }) => type === 'upload');
    richTextDocWithRelationship.richText[richTextUploadIndex].value = { id: createdUploadDoc.id };
    richTextDocWithRelationship.richTextReadOnly[richTextUploadIndex].value = { id: createdUploadDoc.id };

    await payload.create({ collection: 'rich-text-fields', data: richTextDocWithRelationship });

    await payload.create({ collection: 'number-fields', data: numberDoc });

    const blocksDocWithRichText = { ...blocksDoc };

    // @ts-ignore
    blocksDocWithRichText.blocks[0].richText = richTextDocWithRelationship.richText;
    // @ts-ignore
    blocksDocWithRichText.localizedBlocks[0].richText = richTextDocWithRelationship.richText;

    await payload.create({ collection: 'block-fields', data: blocksDocWithRichText });
  },
});
