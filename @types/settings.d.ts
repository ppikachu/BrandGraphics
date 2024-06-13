interface FrameSize {
  id: number;
  label: string;
  x: number;
  y: number;
}

interface Settings {
  frameSize: number | undefined;
  startbase64: string;
  photoPosition: number;
  bgFlip: boolean;
  bgFilter: string;
  iso: number | undefined;
  bigText: string;
  bigTextSize: number;
  bigTextColor: string;
  bigTextAlign: string;
  bigTextVerticalAlign: string;
  bigTextFontFamily: string;
  bigTextFontWeight: string;
}

interface Graphic {
  id: number;
  label: string;
  svg: string;
}

interface Filtro {
  label: string;
  class: string;
}