import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  women: 4,
  men: 5,
};

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

// transform shop.collection into an array to use in shop component
export const selectShopCollectionsForPreview = createSelector(
  [selectShopCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector([selectShopCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  )
);

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);
