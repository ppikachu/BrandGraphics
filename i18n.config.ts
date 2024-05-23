import { format } from "path";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      preview: 'Preview',
      formatAndImage: 'Format & Image (click to change)',
      portraitPost: 'Portrait Post 1920x1080',
      squarePost: 'Square Post 1080x1080',
      flip: 'Flip',
      crop: 'Crop',
      filter: 'Filter',
      editText: 'Edit Text',
      logo: 'Logo',
      size: 'Size',
      align: 'Align',
      vertical: 'Vertical',
      getImage: 'Get Image',
      download: 'Download',
      help: 'Help',
      
    },
    es: {
      preview: 'Vista previa'
    }
  }
}))
