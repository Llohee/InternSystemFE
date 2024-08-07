
export const DATE_TIME_FORMAT_VIEW = 'DD/MM/YYYY HH:mm'
export const DATE_FORMAT_VIEW = 'DD/MM/YYYY'
export const DATE_FORMAT_SHORT_VIEW = 'D/M'
export const DATE_FORMAT_VIEW_PUT = 'YYYY-MM-DD'
export const DATE_FORMAT_VIEW_SAVE = 'M/D/YYYY'
export const DAY_TIME_FORMAT_VIEW = 'DD [ngày] HH [giờ] mm [phút]'
export const NOTIFICATION_DELAY = 3000
export const LOCK_TENANT_VALUE = process.env.NEXT_PUBLIC_LOCK_TENANT ?? ''
export const LOCK_MODULES = process.env.NEXT_PUBLIC_LOCK_MODULES?.split(
  '@,'
) ?? ['incident', 'other-config/record']

const alertDuration = {
  delay: 0.1,
  duration: 0.61,
  // repeat: Infinity,
}

export const alertAnimationVariant = {
  ring: {
    scale: [0.5, 1, 2.06, 2.06],
    opacity: [0, 1, 0, 0],
    transition: {
      delay: 0.2,
      duration: 1,
      ease: [0, 0, 0.2, 1],
      times: [0, 0.1, 0.75, 1],
      // repeat: Infinity,
    },
  },

  scaleSpring: {
    scale: [1, 1.1, 1],
    transition: alertDuration,
  },

  trashCan: {
    scale: [1, 1.15, 1],
    y: [0, -2, 0],
    transition: alertDuration,
  },

  trashLid: {
    y: [-5.5, 0],
    skewY: [-13, 0],
    transition: alertDuration,
  },
}

