import _vehicle from '@/fixtures/vehicle.json'
import { faker } from '@faker-js/faker'
import { api } from './api'
import { Vehicle } from '@/types/vehicle'
import { getVehicle } from './vehicles'
const vehicle = _vehicle as unknown as Vehicle

vi.mock('./api')

describe(getVehicle, () => {
  afterEach(vi.clearAllMocks)

  it('should fetch and return the proper vehicle', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: vehicle })
    const id = faker.number.int()
    const result = await getVehicle(id)

    expect(result).toEqual(vehicle)
    expect(api.get).toHaveBeenCalledWith(`/vehicles/${id}`)
  })

  it('should throw an error if the API call fails', async () => {
    const error = new Error('API error')
    vi.mocked(api.get).mockRejectedValue(error)
    const id = faker.number.int()

    await expect(getVehicle(id)).rejects.toThrow(error)
    expect(api.get).toHaveBeenCalledWith(`/vehicles/${id}`)
  })
})
