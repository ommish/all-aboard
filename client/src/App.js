import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthRoute, ProtectedRoute } from './util/route_util';
import Header from './components/header';
import Nav from './components/nav';
import Notifications from './components/helpers/notifications';
import UserProfile from './components/user_profile/user_profile';
import CharacterSheet from './components/character_sheet/character_sheet_container';
import Splash from './components/splash';
import './App.css';


const App = ({ store }) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div>
					<Header/>
					<ProtectedRoute path="/" component={Nav}/>
					<ProtectedRoute path="/" component={Notifications}/>
					<Switch>
						<ProtectedRoute path="/users/:userId" component={UserProfile} />
						<ProtectedRoute path="/characters/new" component={CharacterSheet} />
						<ProtectedRoute
							path="/characters/:characterId"
							component={CharacterSheet}
						/>
						<AuthRoute exact path="/" component={Splash} />
					</Switch>
				</div>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
