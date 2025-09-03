import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

export default function Formula({
  block,
  formula,
}: {
  block?: boolean;
  formula: string;
}) {
  return block ? (
    <div className="formula-component max-w-full overflow-x-auto">
      <BlockMath math={formula} />
    </div>
  ) : (
    <InlineMath math={formula} />
  );
}
