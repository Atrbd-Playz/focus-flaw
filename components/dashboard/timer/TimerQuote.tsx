/**
 * TimerQuote — a decorative line floated over the photograph.
 *
 * Purely ornamental, so it is hidden from assistive tech and dropped on the
 * narrowest layouts where the photo is all there is room for. In the
 * artboard it sits at (575, 79) in a fixed 140px column, left-aligned — the
 * script face needs a hard measure or its flourishes collide.
 */
export function TimerQuote({ quote }: { quote: string }) {
  return (
    <p
      aria-hidden="true"
      className="ff-quote hidden max-w-[14ch] font-quote text-sm leading-snug text-quote md:block artboard:absolute artboard:left-[575px] artboard:top-[79px] artboard:w-[140px] artboard:max-w-none artboard:text-left artboard:text-[14px] artboard:leading-[18px]"
    >
      {quote}
    </p>
  );
}