import { axiosClient } from '~/api/axiosClient';
import { Media } from '~/dto/common/Media';

export async function uploadFile(value: Media) {
  const formData = new FormData();
  // Array.from(value.file).forEach((file) => {
  formData.append('image', value.file as File);
  // });
  const resUrl = await axiosClient.post(
    `${import.meta.env.VITE_BASE_URL}/media/upload-image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );

  // update value url
  value.url = resUrl.data.data[0].url;
  // remove object - error when json
  value.file = undefined;
}
