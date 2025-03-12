import { useEffect } from 'react';
import Tracker from '@openreplay/tracker';
import trackerAssist from '@openreplay/tracker-assist';

export default function OpenReplayTracker() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tracker = new Tracker({
                projectKey: "V1T3MEDzymBF7ikobZwa",
            });

            tracker.use(trackerAssist());
            tracker.start();
        }
    }, []);

    return null;
}