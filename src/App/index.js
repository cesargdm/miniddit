import React, { Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Home from '../App/containers/Home/lazy'
import Post from '../App/containers/Post/lazy'

import GlobalStyle from './GlobalStyles'

function App() {
  return (
    <>
      <GlobalStyle />
      <Suspense fallback="...">
        <Routes>
          <Route path="/r/all" element={<Home />} />
          <Route path="/r/:category/comments/:user/:slug" element={<Post />} />
          <Route path="/" element={<Navigate to="/r/all" replace />} />
          <Route path="*" element={<>Not found</>} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
