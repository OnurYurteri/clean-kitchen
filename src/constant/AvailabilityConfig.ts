import DayConfig from '../types/DayConfig'

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const AvailabilityConfig: { [key: string]: DayConfig } = {
  MON: {
    max: 4,
  },
  TUE: {
    max: 2,
  },
  WED: {
    max: 2,
  },
  THU: {
    max: 2,
  },
  FRI: {
    max: 2,
  },
  SAT: {
    max: 2,
  },
  SUN: {
    max: 2,
  },
}

const getConfig = (day: number): any => {
  return AvailabilityConfig[days[day]]
}

export default AvailabilityConfig
export { getConfig }
