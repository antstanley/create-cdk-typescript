console.log('test')

function test(): void {
  const message = ' this is a test'
  console.log(message)
  const complexObject = {
    prop: 'some detail',
    obj: {
      prop: {
        obj: {
          val: 'asdas',
        },
      },
    },
  }

  console.log(complexObject)
}

test()
