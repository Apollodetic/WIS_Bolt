import React from 'react';
    import ReactDOM from 'react-dom';
    import { Provider } from 'react-redux';
    import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
    import App from './App.jsx';
    import store from './store';

    const client = new ApolloClient({
      uri: '/graphql',
      cache: new InMemoryCache()
    });

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </Provider>
      </React.StrictMode>
    );
