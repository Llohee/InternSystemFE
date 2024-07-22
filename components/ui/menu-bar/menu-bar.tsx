import * as React from 'react'
import { Menu, Transition } from '@headlessui/react'
import { cx } from 'class-variance-authority'
import Link, { LinkProps } from 'next/link'

export const MenuBar = React.forwardRef<
  React.ElementRef<typeof Menu>,
  React.ComponentPropsWithoutRef<typeof Menu>
>(({ className, ...props }, ref) => (
  <Menu
    as="div"
    ref={ref}
    className={cx(
      'relative inline-block text-left items-center z-50',
      className
    )}
    {...props}
  />
))

export const MenuBarItems = React.forwardRef<
  React.ElementRef<typeof Menu.Items>,
  React.ComponentPropsWithoutRef<typeof Menu.Items>
>(({ className, ...props }, ref) => (
  <Transition
    as={React.Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <Menu.Items
      ref={ref}
      className={cx(
        'border-[0.5px] border-border-1 shadow-lg rounded-md absolute flex flex-col gap-0 right-0 mt-3 w-80 origin-top-right divide-y-[1px] divide-border-2 bg-white focus:outline-none z-[9000]',
        className
      )}
      {...props}
    />
  </Transition>
))

export const MenuBarItemLink = React.forwardRef<
  React.ElementRef<typeof Menu.Item>,
  React.ComponentPropsWithoutRef<typeof Menu.Item> &
    React.ComponentPropsWithoutRef<typeof Link>
>(({ className, ...props }, ref) => (
  <Menu.Item
    as={Link}
    ref={ref}
    className={cx(
      'flex items-center first:rounded-t-md last:rounded-b-md gap-3 px-3 py-3.5 hover:bg-grey-hover ui-active:bg-grey-hover z-[500]',
      className
    )}
    {...props}
  />
))

export const MenuBarItem = React.forwardRef<
  React.ElementRef<typeof Menu.Item>,
  React.ComponentPropsWithoutRef<typeof Menu.Item>
>(({ className, ...props }, ref) => (
  <Menu.Item
    ref={ref}
    className={cx(
      'flex items-center first:rounded-t-md last:rounded-b-md gap-3 px-3 py-3.5 hover:bg-grey-hover ui-active:bg-grey-hover z-[500]',
      className
    )}
    {...props}
  />
))
