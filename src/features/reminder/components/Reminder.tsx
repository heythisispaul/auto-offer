import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export function Reminder({
  handleClaimOffers,
}: {
  handleClaimOffers: () => void;
}) {
  return (
    <Card>
      <Card.Title>Hey There! 👋</Card.Title>
      <p>
        Looks like {`you've`} got some unclaimed offers. Would you like to claim
        them now?
      </p>
      <div className="flex flex-col gap-2 mt-2">
        <Button block className="btn-primary" onClick={handleClaimOffers}>
          Claim offers
        </Button>
        <Button block className="btn-ghost btn-sm" onClick={window.close}>
          Not now
        </Button>
      </div>
    </Card>
  );
}
