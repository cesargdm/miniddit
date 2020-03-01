function findAndMutateComment({ children, parents = [], id, onMutate }) {
  if (!parents.length) {
    const newChildren = children.map((comment) =>
      comment.data.id === id ? onMutate(comment) : comment,
    )

    return newChildren
  }

  const [parentToFind] = parents

  return children.map((comment) => {
    if (comment.data.id === parentToFind) {
      const [, ...remainingParents] = parents

      return {
        ...comment,
        data: {
          ...comment.data,
          ...(comment.data.replies
            ? {
                replies: {
                  kind: comment.data.replies.kind,
                  data: {
                    ...comment.data.replies.data,
                    children: findAndMutateComment({
                      children: comment.data.replies.data.children,
                      parents: remainingParents,
                      id,
                      onMutate,
                    }),
                  },
                },
              }
            : {}),
        },
      }
    }

    return comment
  })
}

function createComment(comment) {
  return {
    kind: 't1',
    data: {
      id: Date.now(),
      author: 'You',
      score: 0,
      created_utc: Date.now() / 1000,
      body: comment,
      replies: { data: { children: [] } },
    },
  }
}

export { findAndMutateComment, createComment }
