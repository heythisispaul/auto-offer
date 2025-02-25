import { Card } from "@/components/Card";
import { triggerNewTab } from "@/utils/scripts";
import { constants } from "@/utils/common";
import { Button } from "@/components/Button";

const { urls, paths } = constants;

export function ClaimError() {
  return (
    <Card>
      <Card.Title>Sorry, something went wrong</Card.Title>
      <p>
        Looks like something unexpected happened. If you continue to see this,
        please report this issue.
      </p>
      <div className="flex flex-col gap-2 mt-2">
        <Button
          className="btn-neutral mt-4"
          block
          onClick={() => triggerNewTab(`${urls.repo}${paths.issues}`)}
        >
          Log issue
        </Button>
        <Button block className="btn-ghost btn-sm" onClick={window.close}>
          Close
        </Button>
      </div>
    </Card>
  );
}
