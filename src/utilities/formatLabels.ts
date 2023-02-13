import pluralize, { isPlural, singular } from 'pluralize';
import { isNumber } from './isNumber';

const capitalizeFirstLetter = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);

const toWords = (inputString: string, joinWords = false): string => {
  const notNullString = inputString || '';
  const trimmedString = notNullString.trim();
  const arrayOfStrings = trimmedString.split(/[\s-]/);

  const splitStringsArray = [];
  arrayOfStrings.forEach((tempString) => {
    if (tempString !== '') {
      const splitWords = tempString.split(/(?=[A-Z])/).join(' ');
      splitStringsArray.push(capitalizeFirstLetter(splitWords));
    }
  });

  return joinWords
    ? splitStringsArray.join('').replace(/\s/gi, '')
    : splitStringsArray.join(' ');
};

const handlerAsTitle = ((docs: Record<string, unknown> | null | undefined, useAsTitle: string): string | undefined => {
  console.log({ docs, useAsTitle });

  if (!docs) return undefined;
  const chars = useAsTitle.split('.');
  return chars.reduce((a, b) => (isNumber(b) ? a?.[+b] : a?.[b]), docs) as string | undefined;
});

const formatLabels = ((slug: string): { singular: string, plural: string } => {
  const words = toWords(slug);
  return (isPlural(slug))
    ? {
      singular: singular(words),
      plural: words,
    }
    : {
      singular: words,
      plural: pluralize(words),
    };
});

const formatNames = ((slug: string): { singular: string, plural: string } => {
  const words = toWords(slug, true);
  return (isPlural(slug))
    ? {
      singular: singular(words),
      plural: words,
    }
    : {
      singular: words,
      plural: pluralize(words),
    };
});

export {
  formatNames,
  formatLabels,
  toWords,
  handlerAsTitle,
};
