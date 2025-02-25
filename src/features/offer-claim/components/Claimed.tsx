import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { constants } from "@/utils/common";
import { triggerNewTab } from "@/utils/scripts";

const { urls, paths } = constants;

export function Claimed({ pathname }: { pathname: string }) {
  const isOnAllOfferPage = pathname.includes(paths.allOffers);

  const handleNavigateAllOffers = () => {
    window.close();
    triggerNewTab(`${urls.amexBase}${paths.allOffers}`);
  };

  return (
    <Card>
      <Card.Title>{`You're`} all set! 🎉</Card.Title>
      {!isOnAllOfferPage ? (
        <p>
          If you think you have more available, you can also{" "}
          <span
            tabIndex={0}
            role="button"
            className="link link-primary"
            onClick={handleNavigateAllOffers}
            aria-label="Open all offers page"
          >
            check for all your available offers
          </span>{" "}
          and claim those too.
        </p>
      ) : (
        <></>
      )}
      <p>Thanks for using Auto Offer!</p>
      <div className="flex flex-col gap-2 mt-2">
        <Button block className="btn-primary" onClick={window.close}>
          Sounds good
        </Button>
      </div>
    </Card>
  );
}
