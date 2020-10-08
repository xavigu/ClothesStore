import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import { selectShopCollections } from "../../redux/shop/shop.selectors.js";

const ShopPage = ({ collections }) =>  (
  <div className='shop-page'>
    {
      collections.map(({id, ...otherProps}) => (
        <CollectionPreview key={id} {...otherProps} />
      ))
    }
  </div>
)

const mapStateToProps = createStructuredSelector({
  collections: selectShopCollections,
});

export default connect(mapStateToProps)(ShopPage);
