import { useEffect, useState } from 'react';

export default function useFilePreview(file: FileList, type: string) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (file && file[0]) {
      const newUrl = URL.createObjectURL(new Blob([file[0]], { type }));

      if (newUrl !== imgSrc) {
        setImgSrc(newUrl);
      }
    }
  }, [file]);

  return [imgSrc];
}
