import { useEffect } from "preact/hooks";
import { ConfigureReminder } from "@/features/main-popup/components/ConfigureReminder";
import { Reminder } from "@/features/reminder/components/Reminder";
import {
  Claiming,
  ClaimError,
  Claimed,
} from "@/features/offer-claim/components";
import { useClaimOfferFlow } from "@/features/offer-claim/hooks/useClaimOfferFlow";
import { ClaimState } from "@/types";
import { ClaimOffersButton } from "@/features/main-popup/components/ClaimOffersButton";
import { ViewSourceButton } from "@/features/main-popup/components/ViewSourceButton";
import { Card } from "./Card";

export function Popup() {
  const { status, claimPathname, handleClaimOffers } = useClaimOfferFlow();

  const isReminder = window.location.search.includes("reminder");

  useEffect(() => {
    chrome.runtime.connect({ name: "popup" });
  }, []);

  if (status === ClaimState.CLAIMING) {
    return <Claiming />;
  }

  if (status === ClaimState.CLAIMED) {
    return <Claimed pathname={claimPathname} />;
  }

  if (status === ClaimState.ERROR) {
    return <ClaimError />;
  }

  if (isReminder) {
    return <Reminder handleClaimOffers={handleClaimOffers} />;
  }

  return (
    <Card>
      <Card.Title>Auto Offer</Card.Title>
      <p>Never miss an American Express offer again.</p>
      <p>
        With Auto Offer, you can quickly claim all available card offers, and
        set reminders so you never forget.
      </p>
      <div className="mt-3 flex flex-col w-full gap-2">
        <ClaimOffersButton handleClaimOffers={handleClaimOffers} />
        <ConfigureReminder />
        <ViewSourceButton />
      </div>
    </Card>
  );
}
