//@ts-ignore
import testImage from '@/assets/test.jpg'

export const socialSizes = [
  { label: "Linkedin Square Post",         x: 1080, y: 1080 },
  { label: "Linkedin Article",             x: 1920, y: 1080 },
  { label: "Facebook Business Page Cover", x: 1200, y:  674 },
  { label: "Facebook Story",               x: 1080, y: 1920 },
]

export const graphics = [
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


export const defaultSettings = {
  frameSize: { x: 1920, y: 1080 },
  startbase64: testImage,
  photoPosition: 33,
  bgFlip: false,
  bgFilter: "nashville",
  iso: "i_words1",
  bigText: 'This is your Post image.\nGet it right!',
  bigTextSize: 20,
  bigTextColor: "white",
  bigTextAlign: 'left',
  bigTextVerticalAlign: 'items-end',
}

function setSize(x: number, y: number) {
  // localStorage.setItem('linkedin-local-storage', JSON.stringify( { "frameSize": { x: x, y: y }}))
  localStorage.setItem('linkedin-local-storage', "frameSize.x=" + x )
}