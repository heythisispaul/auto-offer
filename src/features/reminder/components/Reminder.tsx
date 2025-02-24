import { useState } from "preact/hooks";
import { Button } from "@/components/Button";
import { triggerOfferAccept } from "@/utils/scripts";
import { ClaimState } from "@/features/offer-claim/types";

export function Reminder() {
  const [claimState, setClaimState] = useState<ClaimState>(
    ClaimState.UNCLAIMED,
  );

  const handleClaimOffers = () => {
    setClaimState(ClaimState.CLAIMING);
    triggerOfferAccept({
      onComplete: (isSuccess) =>
        setClaimState(isSuccess ? ClaimState.CLAIMED : ClaimState.ERROR),
    });
  };

  return (
    <div className="card w-96 bg-base-100 card-md shadow-sm rounded-md">
      <div className="card-body">
        <h2 className="card-title">Hey There! 👋</h2>
        <p>
          Looks like you&apos;ve got some unclaimed offers. Would you like to
          claim them now?
        </p>
        <div className="flex flex-col gap-2 mt-2">
          <Button block className="btn-primary" onClick={handleClaimOffers}>
            Claim offers
          </Button>
          <Button block className="btn-ghost btn-sm" onClick={window.close}>
            Not now
          </Button>
        </div>
      </div>
    </div>
  );
}
