import humanizeDuration from 'humanize-duration';

humanizeDuration.languages['vi'] = {
  d: (count) => count === 1 ? 'ngày' : 'ngày',
  h: (count) => count === 1 ? 'giờ' : 'giờ',
  m: (count) => count === 1 ? 'phút' : 'phút',
  s: (count) => count === 1 ? 'giây' : 'giây',
  ms: (count) => count === 1 ? 'mili giây' : 'mili giây',
};

export const humanizeDurationConfig = (value: number) => {
  return humanizeDuration(value, {
    units: ['d', 'h', 'm'],
    delimiter: ' ',
    round: true,
    language: 'vi',
  });
};
