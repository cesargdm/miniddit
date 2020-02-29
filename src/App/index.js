import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from '../App/containers/Home/lazy'
import Post from '../App/containers/Post/lazy'

import GlobalStyle from './GlobalStyles'

function App() {
  return (
    <>
      <GlobalStyle />
      <Suspense fallback="Loading...">
        <Router>
          <Routes>
            <Route path="/r/all" element={<Home />} />
            <Route
              path="/r/:category/comments/:user/:slug"
              element={<Post />}
            />
            <Route path="*" element={'asdasds'} />
          </Routes>
        </Router>
      </Suspense>
    </>
  )
}

export default App
