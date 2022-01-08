import { Edit, Save } from "@mui/icons-material";
import { Box, Button, Switch } from "@mui/material";
import { IBackgroundSettings } from "app/storage/app-data/backgroundSettings";
import InlineFormControl from "components/InlineFormControl";
import SimpleAccordion from "components/SimpleAccordion";
import { ImageProvider } from "constant";
import { useFormikContext } from "formik";
import React, { useCallback } from "react";
import { useEditProviderDialog } from "./dialogs/EditProviderParam";

const ImageProviderSettings = React.memo(() => {
  const { setValues, values, handleSubmit } =
    useFormikContext<IBackgroundSettings>();
  const { openDialog } = useEditProviderDialog();

  const handleToggleProvider = useCallback(
    (provider: ImageProvider) => () => {
      let selected_providers = Array.from(values.selected_providers);

      if (selected_providers.includes(provider)) {
        selected_providers = selected_providers.filter((a) => a !== provider);
      } else {
        selected_providers.push(provider);
      }

      setValues({ ...values, selected_providers });
    },
    [setValues, values]
  );

  return (
    <SimpleAccordion
      title="Image Provider"
      subtitle="The source which the images will be downloaded from"
    >
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        component="form"
        onSubmit={handleSubmit}
      >
        <ImageProviderItem
          name="Unsplash"
          referenceLink="https://unsplash.com"
          enabled={values.selected_providers.includes(ImageProvider.UNSPLASH)}
          onToggleValue={handleToggleProvider(ImageProvider.UNSPLASH)}
          onEditParamClick={() => openDialog(ImageProvider.UNSPLASH, values)}
        />
        <ImageProviderItem
          name="Pixabay"
          referenceLink="https://pixabay.com"
          enabled={values.selected_providers.includes(ImageProvider.PIXABAY)}
          onToggleValue={handleToggleProvider(ImageProvider.PIXABAY)}
          onEditParamClick={() => openDialog(ImageProvider.PIXABAY, values)}
        />
        <ImageProviderItem
          name="Bing"
          referenceLink="https://bing.com"
          enabled={values.selected_providers.includes(ImageProvider.BING)}
          onToggleValue={handleToggleProvider(ImageProvider.BING)}
        />

        <Box alignSelf="flex-end" mt={1} display="flex" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<Save />}
          >
            Save
          </Button>
        </Box>
      </Box>
    </SimpleAccordion>
  );
});

export default ImageProviderSettings;

const ImageProviderItem = (props: {
  name: string;
  referenceLink?: string;
  enabled?: boolean;
  onToggleValue?: (
    event?: React.ChangeEvent<HTMLInputElement>,
    checked?: boolean
  ) => any;
  onEditParamClick?: () => any;
}) => {
  return (
    <InlineFormControl label={props.name} referenceLink={props.referenceLink}>
      <Box>
        {props.onEditParamClick !== undefined && (
          <Button
            variant="outlined"
            size="small"
            onClick={props.onEditParamClick}
            startIcon={<Edit />}
          >
            Edit
          </Button>
        )}
        <Switch checked={props.enabled} onChange={props.onToggleValue} />
      </Box>
    </InlineFormControl>
  );
};
