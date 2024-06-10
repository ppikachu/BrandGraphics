//@ts-ignore
import testImage from '@/assets/test.jpg'
import { useStorage } from '@vueuse/core'
export const socialSizes: FrameSize[] = [
  { label: "Linkedin Square Post",         x: 1080, y: 1080 },
  { label: "Linkedin Article",             x: 1920, y: 1080 },
  { label: "Facebook Business Page Cover", x: 1200, y:  674 },
  { label: "Facebook Story",               x: 1080, y: 1920 },
]

export const graphics: Graphic[] = [
  { label: "None",       svg: ""            },
  { label: "Words 1",    svg: "i_words1"    },
  { label: "Words 2",    svg: "i_words2"    },
  { label: "Words 3",    svg: "i_words3"    },
  { label: "Emotions 1", svg: "i_emotions1" },
  { label: "Emotions 2", svg: "i_emotions2" },
  { label: "Emotions 3", svg: "i_emotions3" },
  { label: "Behavior 1", svg: "i_behavior1" },
  { label: "Behavior 2", svg: "i_behavior2" },
  { label: "Behavior 3", svg: "i_behavior3" },
]

const defaultSettings: Settings = {
  frameSize: socialSizes[1],
  startbase64: testImage,
  photoPosition: 33,
  bgFlip: false,
  bgFilter: "red_mult",
  iso: graphics[6].svg,
  bigText: 'This is your Post image.\nGet it right!',
  bigTextSize: 20,
  bigTextColor: "white",
  bigTextAlign: 'left',
  bigTextVerticalAlign: 'items-end',
  bigTextFontFamily: 'Jura',
  bigTextFontWeight: '700',
}
/**
 * Retrieves settings from local storage or uses default settings.
 * @param defaultSettings - The default settings if no data is found in local storage.
 * @returns The settings object retrieved from local storage or default settings.
 */
export const settings: Settings = useStorage('linkedin-local-storage', defaultSettings).value

export const heightTextArea = ref(10)

export const defaultPresets = [
  {
    name: "preset 1",
    preset: defaultSettings,
  },
]
export const settingsPresets = useStorage('linkedin-local-storage-presets', defaultPresets)

export const extraFiltros = [
  { label: "Red *", class: "red_mult" },
  { label: "Green *", class: "green_mult" },
  { label: "Blue *", class: "blue_mult" },
  // { label: "xx2", class: "walden" },
  // { label: "xx3", class: "willow" },
]
