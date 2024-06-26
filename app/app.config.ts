export default defineAppConfig({
  ui: {
    primary: 'blue',
    gray: 'zinc',
    // MARK: Elements
    icons: {
      dynamic: true
    },
    button: {
      default: {
        size: 'xl',
        variant: 'soft',
      },
      padding: {
        lg: 'px-2 py-2',
        xl: 'px-2 py-2',
      },
      gap: {
        lg: 'gap-x-1.5',
        xl: 'gap-x-1.5',
      },
      icon: {
        size: {
          lg: 'h-5 w-5',
          xl: 'h-5 w-5',
        },
      },
    }
  }
})