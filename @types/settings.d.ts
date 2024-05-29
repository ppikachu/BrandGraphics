interface FrameSize {
  label: string;
  x: number;
  y: number;
}

interface Settings {
  frameSize: FrameSize;
  startbase64: string;
  photoPosition: number;
  bgFlip: boolean;
  bgFilter: string;
  iso: string;
  bigText: string;
  bigTextSize: number;
  bigTextColor: string;
  bigTextAlign: string;
  bigTextVerticalAlign: string;
  bigTextFontFamily: string;
  bigTextFontWeight: string;
}

interface Graphic {
  label: string;
  svg: string;
}