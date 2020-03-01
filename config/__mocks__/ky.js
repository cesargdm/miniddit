module.exports = {
  get: (url) => {
    if (url === 'https://www.reddit.com/r/all.json') {
      return {
        json() {
          return Promise.resolve({
            data: {
              children: [
                {
                  data: {
                    title: 'Batman is Bruce Wayne.',
                    id: '9das8je',
                    permalink: '/r/category/comments/user/batman',
                    score: 0,
                  },
                },
                {
                  data: {
                    title: 'Spiderman is Peter Parker.',
                    id: '9das8jd',
                    permalink: '/r/category/comments/user/batman',
                    score: 0,
                  },
                },
              ],
            },
          })
        },
      }
    }

    return {
      json() {
        return Promise.resolve([
          {
            data: {
              children: [
                {
                  data: {
                    title: 'Apple Inc',
                    score: 0,
                    author: 'Anonymous',
                    url: 'https://apple.com',
                  },
                },
              ],
            },
          },
          {
            data: {
              children: [
                { data: { id: 'j3289h', score: 0, body: 'Apple is great' } },
              ],
            },
          },
        ])
      },
    }
  },
}
