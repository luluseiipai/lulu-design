export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <div style={{ margin: '2em' }}>
      <h4 style={{ marginBottom: '10px' }}>组件演示</h4>
      <Story />
    </div>
  ),
]

import '../src/styles/index.scss'
