import Link from 'next/link'
import React from 'react'

interface LinkNavigationProps {
  nav: { disp: string; link: string }[]
}

const LinkNavigation = (props: LinkNavigationProps) => {
  return (
    <div className="mb-3 flex items-center gap-3">
      {props.nav.map((obj, index) => (
        <>
          {index !== 0 && (
            <svg
              data-testid="geist-icon"
              fill="currentColor"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              viewBox="0 0 24 24"
              className="text-neutral-300 w-7 h-7"
            >
              <path d="M16.88 3.549L7.12 20.451"></path>
            </svg>
          )}
          <Link href={obj.link}>
            <span className="text-sm text-neutral-400 hover:text-black">
              {obj.disp}
            </span>
          </Link>
        </>
      ))}
    </div>
  )
}

export default LinkNavigation
