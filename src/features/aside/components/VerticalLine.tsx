export default function VerticalLine({
  length,
  top = 0,
  left = 0,
  right = 0,
  bottom = 0,
}: {
  length: number
  top?: number
  left?: number
  right?: number
  bottom?: number
}) {
  return <div className="vline" style={{ height: length, top, left, right, bottom }}></div>
}
