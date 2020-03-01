import React from 'react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router'
import { render } from '@testing-library/react'

import Post from '.'

test('render post page elements', async () => {
  let wrapper

  await act(async () => {
    wrapper = await render(
      <MemoryRouter>
        <Post />
      </MemoryRouter>,
    )
  })

  // Title
  expect(wrapper.findByText('Apple Inc.')).toBeDefined()
  // Comment
  expect(wrapper.findByText('Apple is great')).toBeDefined()
})
