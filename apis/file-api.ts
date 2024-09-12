import { UploadFileResponse } from '@/models/api/file-api'
import axiosClient from './axios-client'

const fileApi = {
  async upload(
    accessToken: string,
    file: File,
    onUploadProgress: any,
    module: string
  ): Promise<any> {
    return this.uploadFile(accessToken, file, onUploadProgress, module).then((data) => ({
      object: data.object,
      name: file.name,
      dowload_url: data.dowload_url,
    }));
  },

  // async getUploadUrl(
  //   accessToken: string,
  //   file: File
  // ): Promise<UploadFileResponse> {
  //   const url = `/files/upload-link/${file.name}`
  //   return axiosClient.get(url, {
  //     headers: {
  //       token: accessToken,
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //     params: {
  //       type: file.type,
  //     },
  //   })
  // },
  async uploadFile(
    accessToken: string,
    file: File,
    onUploadProgress: any,
    module?: string,
  ): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const config = {
      onUploadProgress(progressEvent: any) {
        onUploadProgress(progressEvent);
      },
      headers: {
        'Content-Type': 'multipart/form-data',
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    };

    const url = `/files/upload-logo/${module}`;
    return axiosClient.post(url, formData, config);
  }
}

export default fileApi
