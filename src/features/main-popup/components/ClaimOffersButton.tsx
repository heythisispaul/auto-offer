import { useEffect, useState } from "preact/hooks";
import { constants } from "@/utils/common";
import { Button } from "@/components/Button";
import { triggerAndAwaitMessage, triggerNewTab } from "@/utils/scripts";

const { urls, paths, actions } = constants;

export function ClaimOffersButton({
  handleClaimOffers,
}: {
  handleClaimOffers: () => void;
}) {
  const [hasOffers, setHasOffers] = useState(false);

  useEffect(() => {
    triggerAndAwaitMessage<boolean>({
      action: actions.checkForOffers,
      onComplete: (result) => {
        setHasOffers(result);
      },
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 my-4">
      <Button
        block
        disabled={!hasOffers}
        className="btn-primary"
        onClick={handleClaimOffers}
      >
        Claim offers
      </Button>
      {!hasOffers ? (
        <p className="base-content opacity-75">
          It {`doesn't`} look there {`there's`} anything here.{" "}
          <span
            tabIndex={0}
            role="button"
            onClick={() => triggerNewTab(`${urls.amexBase}${paths.allOffers}`)}
            className="link link-primary"
            aria-label="Open all offers page"
          >
            Check out the eligible offers
          </span>{" "}
          to claim them.
        </p>
      ) : (
        <> </>
      )}
    </div>
  );
}
