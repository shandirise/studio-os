import { useState } from 'react';
import { Outlet, useMatch } from 'react-router';
import { SettingsNav } from '../components/SettingsNav';
import { SaveBarSlotContext } from '../hooks/saveBarSlot';

/**
 * I · Settings frame: sub-navigation + screen, with a sticky slot for the save bar.
 * The Audit Log screen is designed full width, without the sub-navigation.
 */
export function SettingsLayout() {
  const [saveBarSlot, setSaveBarSlot] = useState<HTMLDivElement | null>(null);
  const fullWidth = useMatch('/settings/audit-log') !== null;

  return (
    <SaveBarSlotContext.Provider value={saveBarSlot}>
      <div className="flex flex-1 flex-col">
        {fullWidth ? (
          <Outlet />
        ) : (
          <div className="flex flex-1 flex-col lg:flex-row">
            <SettingsNav />
            <div className="flex min-w-0 flex-1 flex-col">
              <Outlet />
            </div>
          </div>
        )}
        <div ref={setSaveBarSlot} className="sticky bottom-[60px] z-20 lg:bottom-0" />
      </div>
    </SaveBarSlotContext.Provider>
  );
}
