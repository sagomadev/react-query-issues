import { Link, Navigate, useParams } from "react-router-dom";
import { IssueComment } from "../components/IssueComment";
import { useIssue } from "../hooks";
import { LoadingIcon } from "../../shared/components/LoadingIcon";

export const IssueView = () => {
  const params = useParams();
  const { id = "0" } = params;

  const { issueQuery } = useIssue(+id);

  issueQuery.isLoading && <LoadingIcon />;

  !issueQuery.data && <Navigate to="./issues/list" />;

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to="./issues/list">Go Back</Link>
      </div>

      <IssueComment issue={issueQuery.data} />
    </div>
  );
};
