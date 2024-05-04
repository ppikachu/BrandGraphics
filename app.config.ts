export default defineAppConfig({
  ui: {
    primary: 'red',
    gray: 'zinc',
    // MARK: Elements
    icons: {
      dynamic: true
    },
    card: {
      background: 'bg-white dark:bg-gray-800',
      body: {
        base: '',
        background: 'dark:bg-gray-900',
        padding: 'px-2 py-2 sm:p-4',
      },
      header: {
        base: '',
        background: 'dark:bg-gray-900',
        padding: 'px-2 py-2 sm:p-4',
      },
      footer: {
        base: '',
        background: 'dark:bg-gray-900',
        padding: 'px-2 py-2 sm:p-4',
      }
    },
    button: {
      default: {
        size: 'xs',
        // variant: 'soft',
      }
    },
    buttonGroup: {
      default: {
        size: 'xs',
      }
    },
    checkbox: {
      // strategy: 'override',
      label: 'text-xs mt-0.5',
    }
  }
})