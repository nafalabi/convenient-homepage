import AppController from "app/controller";
import readAsBase64 from "app/utils/readAsBase64";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";

const blankBackground =
  "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";

const useSubscribeBackground = (initialized: boolean) => {
  const [isImageLoaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(blankBackground);

  const backgroundInfo = useLiveQuery(async () => {
    const result = await AppController.backgroundimage.getCurActiveImage();
    return result;
  }, [initialized]);

  useEffect(() => {
    (async () => {
      if (!backgroundInfo?.image_url) return;
      setLoaded(false);
      const imageBase64 = await readAsBase64(backgroundInfo.image_url);
      setImageUrl(imageBase64);
      setLoaded(true);
    })();
  }, [backgroundInfo]);

  return { backgroundInfo, isImageLoaded, imageUrl };
};

export default useSubscribeBackground;
