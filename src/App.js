import { createContext, useState, useEffect, useReducer } from "react";
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux/es/exports";

import { createAction } from "./utils/reducer/reducer.utils";

import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';

import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

import { setCurrentUser, checkUserSession } from "./store/user/user.action";
import { onAuthStateChangedListener, createUserDocumentFromAuth, getCurrentUser } from "./utils/firebase/firebase.utils";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		// // const unsubscribe = onAuthStateChangedListener((user) => {
		// //   if (user) {
		// // 	createUserDocumentFromAuth(user);
		// //   }
	
		// //   dispatch(setCurrentUser(user));
		// // });
	
		// // return unsubscribe;
		// getCurrentUser().then((user) => console.log(user));
		dispatch(checkUserSession());
	  }, []);

	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} ></Route>
				<Route path='shop/*' element={<Shop />} ></Route>
				<Route path='auth' element={<Authentication />} ></Route>
				<Route path='checkout'element={<Checkout />}></Route>
			</Route>
		</Routes>
	);
}

export default App;
