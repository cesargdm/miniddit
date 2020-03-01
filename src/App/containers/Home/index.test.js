import React from 'react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router'
import { render, fireEvent } from '@testing-library/react'

import Home from '.'

test('Renders <Post /> elements', async () => {
  let wrapper

  act(() => {
    wrapper = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
  })

  const postElements = await wrapper.findAllByTestId('post')

  expect(postElements).toHaveLength(2)
})

test('Renders <Post /> text', async () => {
  let wrapper

  act(() => {
    wrapper = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
  })

  const batmanPost = await wrapper.findByText('Batman is Bruce Wayne.')
  expect(batmanPost).toBeDefined()

  const spidermanPost = wrapper.findByText('Peter Parker is Spiderman.')
  expect(spidermanPost).toBeDefined()
})

test('Updates score on vote at <Post />', async () => {
  let wrapper

  act(() => {
    wrapper = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
  })

  let [score] = await wrapper.findAllByTestId('post-score')

  expect(score.textContent).toBe('0')

  await act(async () => {
    const [voteUp] = await wrapper.findAllByTestId('post-vote-up')

    await fireEvent.click(voteUp)
  })
  ;[score] = await wrapper.findAllByTestId('post-score')

  expect(score.textContent).toBe('1')

  await act(async () => {
    const [voteDown] = await wrapper.findAllByTestId('post-vote-down')

    await fireEvent.click(voteDown)
  })

  expect(score.textContent).toBe('-1')
})
