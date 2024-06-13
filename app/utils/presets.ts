//@ts-ignore
import testImage from '@/assets/test.jpg'
import { useStorage } from '@vueuse/core'

export const defaultPresets = [
  {
    label: "preset 1",
    preset: defaultSettings,
  },
  {
    label: "preset 2",
    preset: {
      frameSize: socialSizes[2]?.id,
      startbase64: testImage,
      photoPosition: 33,
      bgFlip: false,
      bgFilter: "red_mult",
      iso: graphics[6]?.id,
      bigText: 'This is your 2nd Preset.\nGet it right!',
      bigTextSize: 20,
      bigTextColor: "white",
      bigTextAlign: 'left',
      bigTextVerticalAlign: 'items-end',
      bigTextFontFamily: 'Jura',
      bigTextFontWeight: '700',
    },
  },
]
export const settingsPresets = useStorage('storage-presets', defaultPresets).value
