import React from "react";
import { connect } from "react-redux";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import { selectCollection } from "../../redux/shop/shop.selectors";

import "./collection.styles.scss";

const CollectionPage = ({ match, collection }) => (
  <div className="collection-page">
    <h2>{ match.params.collectionId }</h2>
        <CollectionPreview key={collection.id} {...collection} />
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  // This selector needs a part of the state depending on the URL parameter
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
