import AppController from "app/controller";
import { IBackgroundImage } from "app/db/model/BackgroundImage";
import { useLiveQuery } from "dexie-react-hooks";

const blankBackground: IBackgroundImage = {
  image_url:
    "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
};

const useSubscribeBackground = (initialized: boolean) => {
  const background = useLiveQuery(
    async () => {
      const result = await AppController.backgroundimage.getCurActiveImage();
      return result ? result : blankBackground;
    },
    [initialized],
    blankBackground
  );

  return background;
};

export default useSubscribeBackground;
