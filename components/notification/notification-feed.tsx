"use client";
import { useState, useRef } from "react";
import {
  KnockProvider,
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
} from "@knocklabs/react";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";
import { useUser } from "@clerk/nextjs";

export const NotificationFeed = ({ knockToken }: { knockToken: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  const currentUser = useUser();

  return (
    <KnockProvider
      apiKey={process.env.KNOCK_PUBLIC_API_KEY!}
      userId={currentUser.user?.id!}
      userToken={knockToken}
    >
      {/* <KnockFeedProvider feedId={process.env.KNOCK_CHANNEL_ID!}> */}
      <KnockFeedProvider feedId={"8b421a22-b3e0-46a7-a1d6-f62c97c043d7"}>
        <>
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
          />
        </>
      </KnockFeedProvider>
    </KnockProvider>
  );
};
