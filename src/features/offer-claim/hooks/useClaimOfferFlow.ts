import { useState, useCallback } from "preact/hooks";
import { triggerAndAwaitMessage } from "@/utils/scripts";
import { ClaimState } from "@/types";
import { constants } from "@/utils/common";

export type ClaimOfferFlowState = {
  status: ClaimState;
  claimPathname: string;
};

export function useClaimOfferFlow() {
  const [submissionState, setSubmissionState] = useState<ClaimOfferFlowState>({
    status: ClaimState.UNCLAIMED,
    claimPathname: "",
  });

  const handleClaimOffers = useCallback(() => {
    setSubmissionState((current) => ({
      ...current,
      status: ClaimState.CLAIMING,
    }));

    triggerAndAwaitMessage<{ isSuccess: boolean; pathname: string }>({
      action: constants.actions.acceptOffers,
      onComplete: (result) =>
        setSubmissionState({
          status: result.isSuccess ? ClaimState.CLAIMED : ClaimState.ERROR,
          claimPathname: result.pathname,
        }),
    });
  }, []);

  return { ...submissionState, handleClaimOffers };
}
