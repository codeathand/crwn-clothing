import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';

import { CATEGORIES_ACTION_TYPES } from './category.types';

// export const fetchCategoriesAsync = () => async (dispatch) => {
//     dispatch(fetchCategoriesStart());
//     try {
//         const categoriesArray = await getCategoriesAndDocuments('categories');
//         dispatch(fetchCategoriesSuccess(categoriesArray));
//     } catch (error) {
//         dispatch(fetchCategoriesFailed(error));
//     }
// }

export function* fetchCategoriesAsync() {
    try {
        // const categoriesArray = await getCategoriesAndDocuments('categories');
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
        // dispatch(fetchCategoriesSuccess(categoriesArray));
        yield put(fetchCategoriesSuccess(categoriesArray))
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
}

function* test11() {
    const a = 2 + 3;
    const b = 4;
    yield a;
    yield a + b;
}

const test111 = test11();

console.log(`test11 ${JSON.stringify(test111.next())}`);
console.log(`test11 ${JSON.stringify(test111.next())}`);