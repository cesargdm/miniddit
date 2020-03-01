import React from 'react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router'
import { render, fireEvent } from '@testing-library/react'

import App from '.'

test('goes to detail page on <Post /> click', async () => {
  let wrapper

  await act(async () => {
    wrapper = await render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )
  })

  const [batmanPost] = await wrapper.findAllByTestId('post')

  await act(async () => {
    await fireEvent.click(batmanPost)
  })

  expect(wrapper.findByTestId('post-detail-page')).toBeDefined()
})
