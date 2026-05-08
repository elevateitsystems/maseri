declare namespace JSX {
  interface IntrinsicElements {
    "swiper-container": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      init?: string;
      effect?: string;
      "grab-cursor"?: string;
      "centered-slides"?: string;
      loop?: string;
      "slides-per-view"?: string;
      speed?: string;
      autoplay?: string;
    };
    "swiper-slide": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}