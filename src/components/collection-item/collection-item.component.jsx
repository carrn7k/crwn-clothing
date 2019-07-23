import React from 'react';

import './collection-item.styles.scss';

const CollectionItem = ({ id, name, price, imageUrl }) => (
	<div className='collection-item'>
		<div
		 	className='image'
		 	style={{ backgroundImage: `url(${imageUrl})` }}
		>
		</div>
		<div className='collection-footer'>
			<span classNAme='name'>{name}</span>
			<span classNAme='price'>{price}</span>
		</div>
	</div>
)

export default CollectionItem;