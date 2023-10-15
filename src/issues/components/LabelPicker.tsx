import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { useLabels } from "../hooks/useLabels";

export const LabelPicker = () => {
  const labelQuery = useLabels();

  if (labelQuery.isLoading) {
    return <LoadingIcon />;
  }

  return (
    <>
      {labelQuery.data?.map((label) => (
        <span
          key={label.id}
          className="badge rounded-pill m-1 label-picker"
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
        >
          {label.name}
        </span>
      ))}
    </>
  );
};
