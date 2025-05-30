import { BoothItem } from "@/src/entities/booth";
import { DeleteButton } from "@/src/features/booth/ui/DeleteButton";
import { EditButton } from "@/src/features/booth/ui/EditButton";
import { Separator } from "@/src/shared/ui/separator";
import Queue from "@/src/widgets/queue/ui";
import PINContainer from "@/src/widgets/queue/ui/pin-container";
import { QueueAvailabilitySwitchButton } from "@/src/features/booth/ui/QueueAvailabilitySwitchButton";

interface BoothDetailPropsType {
  booth: {
    id: number;
    name: string;
    description: string;
    location: string;
    enabled: boolean;
    waitingEnabled: boolean;
  };
}

export default function BoothDetail({ booth }: BoothDetailPropsType) {
  // TODO change component to loading state
  if (!booth) {
    return <>페이지가 비어있어요.</>;
  }

  return (
    <>
      <div className="mb-3">
        <BoothItem
          key={booth.id}
          {...booth}
          editButton={<EditButton boothId={booth.id!} />}
          deleteButton={<DeleteButton boothId={booth.id!} />}
          switchButton={
            <QueueAvailabilitySwitchButton
              boothId={booth.id!}
              initialEnabled={booth.waitingEnabled}
            />
          }
        />
      </div>
      <Separator className="h-2 bg-slate-100" />
      <PINContainer boothId={booth.id!} />
      <Separator className="h-2 bg-slate-100" />
      <Queue />
    </>
  );
}
