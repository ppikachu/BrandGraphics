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
      editText: '2. Edit Text',
      logo: 'Logo',
      size: 'Size',
      align: 'Align',
      vertical: 'Vertical',
      getImage: '3. Get Image',
      download: 'Download',
      help: 'Help',
      fix_before_download: 'Fix before download',

    },
    es: {
      preview: 'Vista previa',
      formatAndImage: 'Formato & Imagen (click para cambiar)',
      portraitPost: 'Portada 1920x1080',
      squarePost: 'Cuadrado 1080x1080',
      flip: 'Voltear',
      crop: 'Cortar',
      filter: 'Filtro',
      editText: '2. Editar texto',
      logo: 'Logo',
      size: 'Tamaño',
      align: 'Alinear',
      vertical: 'Vertical',
      getImage: '3. Obtener imagen',
      download: 'Descargar',
      help: 'Ayuda',
      fix_before_download: 'Arreglar error antes de descargar',
    }
  }
}))
