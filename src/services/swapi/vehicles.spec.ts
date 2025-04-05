import { faker } from '@faker-js/faker'
import axios from 'axios'
import { Mock } from 'vitest'
import { getPlanets } from './planets'
import { Vehicle } from '@/types/vehicle'
import _vehicle from '@/fixtures/vehicle.json'
import { getVehicle } from './vehicles'
const vehicle = _vehicle as unknown as Vehicle

vi.mock('axios', () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      put: vi.fn(),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(),
          eject: vi.fn(),
        },
        response: {
          use: vi.fn(),
          eject: vi.fn(),
        },
      },
    },
  }
})

describe('vehicles', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('getVehicle', () => {
    it('fetches a vehicle', async () => {
      const mockValue = {
        data: vehicle,
      }
      ;(axios.get as Mock).mockResolvedValue(mockValue)

      const result = await getVehicle(faker.number.int())

      expect(result).toEqual(vehicle)
    })
  })
})
