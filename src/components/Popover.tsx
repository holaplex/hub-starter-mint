import { Popover, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

export function PopoverBox({
  triggerButton,
  children
}: {
  triggerButton: JSX.Element;
  children?: ReactNode;
}) {
  return (
    <Popover className='relative inline-block'>
      {({ open }) => (
        <>
          <Popover.Button as='div'>{triggerButton}</Popover.Button>
          <Transition
            as={Fragment}
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
          >
            <Popover.Panel className='absolute w-auto'>
              <div className='overflow-hidden'>{children}</div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
