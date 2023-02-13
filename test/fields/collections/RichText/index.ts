import type { CollectionConfig } from '../../../../src/collections/config/types';
import { loremIpsum } from './loremIpsum';

const RichTextFields: CollectionConfig = {
  slug: 'rich-text-fields',
  fields: [
    {
      name: 'selectHasMany',
      hasMany: true,
      type: 'select',
      admin: {
        description: 'This select field is rendered here to ensure its options dropdown renders above the rich text toolbar.',
      },
      options: [
        {
          label: 'Value One',
          value: 'one',
        },
        {
          label: 'Value Two',
          value: 'two',
        },
        {
          label: 'Value Three',
          value: 'three',
        },
        {
          label: 'Value Four',
          value: 'four',
        },
        {
          label: 'Value Five',
          value: 'five',
        },
        {
          label: 'Value Six',
          value: 'six',
        },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
      required: true,
      admin: {
        link: {
          fields: [
            {
              name: 'rel',
              label: 'Rel Attribute',
              type: 'select',
              hasMany: true,
              options: [
                'noopener', 'noreferrer', 'nofollow',
              ],
              admin: {
                description: 'The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.',
              },
            },
          ],
        },
        upload: {
          collections: {
            uploads: {
              fields: [
                {
                  name: 'caption',
                  type: 'richText',
                },
              ],
            },
          },
        },
      },
    },
    {
      name: 'richTextReadOnly',
      type: 'richText',
      admin: {
        readOnly: true,
        link: {
          fields: [
            {
              name: 'rel',
              label: 'Rel Attribute',
              type: 'select',
              hasMany: true,
              options: [
                'noopener', 'noreferrer', 'nofollow',
              ],
              admin: {
                description: 'The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.',
              },
            },
          ],
        },
        upload: {
          collections: {
            uploads: {
              fields: [
                {
                  name: 'caption',
                  type: 'richText',
                },
              ],
            },
          },
        },
      },
    },
  ],
};

function generateRichText() {
  return [
    {
      children: [
        {
          text: "Hello, I'm a rich text field.",
        },
      ],
      type: 'h1',
    },
    {
      children: [
        {
          text: 'I can do all kinds of fun stuff like ',
        },
        {
          type: 'link',
          url: 'https://payloadcms.com',
          newTab: true,
          children: [
            {
              text: 'render links',
            },
          ],
        },
        {
          text: ', ',
        },
        {
          type: 'link',
          linkType: 'internal',
          doc: {
            value: '{{ARRAY_DOC_ID}}',
            relationTo: 'array-fields',
          },
          fields: {},
          children: [
            {
              text: 'link to relationships',
            },
          ],
        },
        {
          text: ', and store nested relationship fields:',
        },
      ],
    },
    {
      children: [
        {
          text: '',
        },
      ],
      type: 'relationship',
      value: {
        id: '',
      },
      relationTo: 'text-fields',
    },
    {
      children: [
        {
          text: 'You can build your own elements, too.',
        },
      ],
    },
    {
      type: 'ul',
      children: [
        {
          children: [
            {
              text: "It's built with SlateJS",
            },
          ],
          type: 'li',
        },
        {
          type: 'li',
          children: [
            {
              text: 'It stores content as JSON so you can use it wherever you need',
            },
          ],
        },
        {
          type: 'li',
          children: [
            {
              text: "It's got a great editing experience for non-technical users",
            },
          ],
        },
      ],
    },
    {
      children: [
        {
          text: 'And a whole lot more.',
        },
      ],
    },
    {
      children: [
        {
          text: '',
        },
      ],
      type: 'upload',
      value: {
        id: '',
      },
      relationTo: 'uploads',
      fields: {
        caption: [
          ...[...Array(4)].map(() => {
            return {
              children: [
                {
                  text: loremIpsum,
                },
              ],
            };
          }),
        ],
      },
    },
    {
      children: [
        {
          text: '',
        },
      ],
    },
    ...[...Array(2)].map(() => {
      return {
        children: [
          {
            text: loremIpsum,
          },
        ],
      };
    }),
  ];
}

export const richTextDoc = {
  selectHasMany: ['one', 'five'],
  richText: generateRichText(),
  richTextReadOnly: generateRichText(),
};

export default RichTextFields;
