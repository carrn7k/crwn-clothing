    
import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

import {
  CollectionsPreviewContainer,
  TitleContainer,
  PreviewContainer
} from './collection-preview.styles';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items }) => (
  <CollectionsPreviewContainer>
    <TitleContainer>{title.toUpperCase()}</TitleContainer>
    <PreviewContainer>
      {items
        .filter((item, idx) => idx < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </PreviewContainer>
  </CollectionsPreviewContainer>
);

export default CollectionPreview;