import { Card } from "@/components/Card";

export function Claiming() {
  return (
    <Card>
      <div className="flex flex-col items-center space-y-4">
        <span className="loading loading-spinner loading-xl" />
        <h2 className="text-center text-md font-semibold">
          Claiming your offers.
        </h2>
      </div>
    </Card>
  );
}
