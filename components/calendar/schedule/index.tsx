import React, { useState } from 'react';
import { TODAY } from '../data';
import { EventType, ScheduleType } from '../type';
import { AllSchedule } from './allSchedule';
import { ScheduleSetting } from './scheduleSetting';

export const Schedule = (event: EventType[], getEvent: () => void) => {
    const [showSetting, setShowSetting] = useState<boolean>(false);
    const [showCreate, setShowCreate] = useState<boolean>(false);
    const [eventID, setEventID] = useState<ScheduleType>({
        title: '',
        start_at: TODAY,
        end_at: '',
        id: '',
    });

    return (
        <>
            {showSetting || showCreate ? (
                <ScheduleSetting
                    setting={{ state: showSetting, setState: setShowSetting }}
                    create={setShowCreate}
                    initial={{ state: eventID, setState: setEventID }}
                    getEvent={getEvent}
                />
            ) : (
                <AllSchedule
                    setting={{ state: showSetting, setState: setShowSetting }}
                    create={{ state: showCreate, setState: setShowCreate }}
                    initial={{ state: eventID, setState: setEventID }}
                    getEvent={getEvent}
                    event={event}
                />
            )}
        </>
    );
};
