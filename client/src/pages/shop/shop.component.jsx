import React, { lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Spinner from "../../components/spinner/spinner.component";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

const CollectionsOverviewContainer = lazy(() => import("../../components/collections-overview/collections-overview.container"));
const CollectionPageContainer = lazy(() => import("../collection/collection.container"));

const ShopPage = ({ fetchCollectionsStart, match }) => {
  // only fires if the result of fetchCollectionsStart changes
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart])

  return(
  <div className='shop-page'>
    <Suspense fallback={<Spinner/>}>
      <Route exact path={`${match.path}`} 
              component={CollectionsOverviewContainer}/>
      <Route path={`${match.path}/:collectionId`} 
              component={CollectionPageContainer}/>
    </Suspense>
  </div>
  )

}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);
