export default defineAppConfig({
  ui: {
    primary: 'blue',
    gray: 'zinc',
    // MARK: Elements
    icons: {
      dynamic: true
    },
    card: {
      background: 'bg-white dark:bg-gray-800',
      body: {
        background: 'dark:bg-gray-900',
        padding: 'px-2 py-2 sm:p-4',
      },
      header: {
        background: 'dark:bg-gray-900',
        padding: 'px-2 py-2 sm:p-4',
      },
      footer: {
        background: 'dark:bg-gray-900',
        padding: 'px-2 py-2 sm:p-4',
      }
    },
    button: {
      default: {
        size: 'xs',
        variant: 'soft',
      },
      padding: {
        lg: 'px-2 py-2',
        xl: 'px-3.5 py-3.5',
      },
    }
  }
})