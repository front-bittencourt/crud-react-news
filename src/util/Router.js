import React from 'react';
import  { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRouter';
import { store, persistor } from '../store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

/* PAGES */
import Header from '../components/header';
import Footer from '../components/footer';
import News from '../views/news';
import Login from '../views/login';
import PublishNews from '../views/publish-news';
import DetailsNews from '../views/detailsNews';

function App() {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              <Route path='/login' component={Login}/>
              <>
                <Header />
                <PrivateRoute path='/publish-news' component={PublishNews} />
                <PrivateRoute path='/edit-news/:id/' component={PublishNews} />
                <PrivateRoute path='/details-news/:id/' component={DetailsNews} />
                <PrivateRoute exact path="/" component={News}/>
                <Footer />
              </>
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
  );
};

export default App;