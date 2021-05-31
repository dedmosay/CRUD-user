import React from 'react';
import { BrowserRouter as Route } from 'react-router-dom';
import { Home } from '../pages';
import { Layout } from '../hoc';
import './App.scss';

export default function App() {
  return (
    <div>
      <Layout>
        <Route exact path="/">
          <Home />
        </Route>
      </Layout>
    </div>
  );
}