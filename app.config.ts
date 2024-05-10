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
        size: 'sm',
        variant: 'soft',
      }
    },
    checkbox: {
      // strategy: 'override',
      label: 'text-xs mt-0.5',
    }
  }
})