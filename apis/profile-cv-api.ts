import { trymObject } from "@/utils"
import axiosClient from "./axios-client"
import { CVDetail, UpdateCVRequest } from "@/models/api/profile-cv-api"

const ProfileAndCV = {
  createCV(accessToken: string, data: UpdateCVRequest): Promise<CVDetail> {
    const url = '/cv/'
    const config = {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    }
    return axiosClient.post(url, trymObject(data), config)
  },
}
export default ProfileAndCV
