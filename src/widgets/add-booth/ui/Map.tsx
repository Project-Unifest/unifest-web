"use client";

import { useGetMyProfile } from "@/src/entities/members/api";
import { useFestivalListQuery } from "@/src/features/festival/api";
import useBoothDraftStore from "@/src/shared/model/store/booth-draft-store";
import { CampusPosition } from "@/src/shared/model/store/booth-draft-store";
import { Button } from "@/src/shared/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import {
  APIProvider,
  AdvancedMarker,
  ControlPosition,
  Map,
  MapControl,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function GoogleMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // TODO: abstract away myFestival
  const { data: myProfile } = useGetMyProfile();
  const festivals = useFestivalListQuery().data;
  const schoolId = myProfile.schoolId;
  const myFestival = festivals.find((value) => value.schoolId === schoolId);

  const [latitude, longitude, editPosition] = useBoothDraftStore((state) => [
    state.latitude,
    state.longitude,
    state.editPosition,
  ]);
  const router = useRouter();

  if (!apiKey) {
    return <div>문제가 발생했습니다. 다시 시도해주세요.</div>;
  }

  const handleMapClick = (event: MapMouseEvent) => {
    const position = event.detail.latLng;
    if (position) {
      const newPosition = { latitude: position.lat, longitude: position.lng };
      editPosition(newPosition);
    }
  };

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        className="h-screen w-full"
        center={{
          lat: myFestival?.latitude ?? CampusPosition.latitude,
          lng: myFestival?.longitude ?? CampusPosition.longitude,
        }}
        defaultZoom={17}
        gestureHandling="cooperative"
        disableDefaultUI
        onClick={handleMapClick}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
      >
        <AdvancedMarker
          position={{
            lat: latitude,
            lng: longitude,
          }}
        />
        <MapControl position={ControlPosition.LEFT_TOP}>
          <button
            type="button"
            aria-label="back"
            className="p-4"
            onClick={() => router.back()}
          >
            <ChevronLeftIcon />
          </button>
        </MapControl>
      </Map>
      <div className="sticky bottom-0 mt-auto flex w-full pb-4 pt-4">
        <Button
          className="w-full rounded-[10px] bg-pink py-3 text-white shadow-lg hover:bg-pink"
          asChild
        >
          <Link href="/add-booth/set-name">저장 완료</Link>
        </Button>
      </div>
    </APIProvider>
  );
}
