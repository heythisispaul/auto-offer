import { Select } from "@/components/Select";
import { constants } from "@/utils/common";
import { useReminderCadenceState } from "../hooks/useReminderCadenceState";

export function ConfigureReminder() {
  const [reminderCadence, updateReminderCadence] = useReminderCadenceState();

  if (!reminderCadence) {
    return null;
  }

  return (
    <fieldset className="my-2">
      <legend className="fieldset-legend">Remind me to claim my offers</legend>
      <Select
        className="m-1"
        aria-label="How often would you like to be reminded you have offers?"
        value={reminderCadence}
        onChange={(e) => {
          updateReminderCadence(
            (e.target as HTMLSelectElement).value as typeof reminderCadence,
          );
        }}
      >
        {constants.reminderCadences.map((cadence) => (
          <Select.Option key={cadence} value={cadence}>
            {cadence}
          </Select.Option>
        ))}
      </Select>
      <p className="fieldset-label">
        You will only be reminded if there are active offers.
      </p>
    </fieldset>
  );
}
