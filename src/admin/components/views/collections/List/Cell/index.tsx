import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../../../utilities/Config';
import RenderCustomComponent from '../../../../utilities/RenderCustomComponent';
import cellComponents from './field-types';
import { Props } from './types';
import { getTranslation } from '../../../../../../utilities/getTranslation';

const DefaultCell: React.FC<Props> = (props) => {
  const {
    field,
    colIndex,
    collection: {
      slug,
    },
    cellData,
    rowData: {
      id,
    } = {},
  } = props;

  const { routes: { admin } } = useConfig();
  const { t, i18n } = useTranslation('general');

  let WrapElement: React.ComponentType<any> | string = 'span';

  const wrapElementProps: {
    to?: string
  } = {};

  if (colIndex === 0) {
    WrapElement = Link;
    wrapElementProps.to = `${admin}/collections/${slug}/${id}`;
  }

  const CellComponent = cellData && cellComponents[field.type];

  if (!CellComponent) {
    return (
      <WrapElement {...wrapElementProps}>
        {(cellData === '' || typeof cellData === 'undefined') && t('noLabel', { label: getTranslation(typeof field.label === 'function' ? 'data' : field.label || 'data', i18n) })}
        {typeof cellData === 'string' && cellData}
        {typeof cellData === 'number' && cellData}
        {typeof cellData === 'object' && JSON.stringify(cellData)}
      </WrapElement>
    );
  }

  return (
    <WrapElement {...wrapElementProps}>
      <CellComponent
        field={field}
        data={cellData}
      />
    </WrapElement>
  );
};

const Cell: React.FC<Props> = (props) => {
  const {
    colIndex,
    collection,
    cellData,
    rowData,
    field,
    field: {
      admin: {
        components: {
          Cell: CustomCell,
        } = {},
      } = {},
    },
  } = props;

  return (
    <RenderCustomComponent
      componentProps={{
        rowData,
        colIndex,
        cellData,
        collection,
        field,
      }}
      CustomComponent={CustomCell}
      DefaultComponent={DefaultCell}
    />
  );
};

export default Cell;
