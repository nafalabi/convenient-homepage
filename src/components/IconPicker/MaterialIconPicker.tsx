import React from "react";
import * as MIcon from "@mui/icons-material";
import { Box, styled } from "@mui/system";
import { Index as FlexSearchIndex, IndexSearchResult } from "flexsearch";
import synonyms from "./synonyms";
import debounce from "@mui/utils/debounce";
import {
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  SvgIcon,
  TextField,
  Theme,
} from "@mui/material";
import { IconDataMaterial } from "./types";

const searchIndex = new FlexSearchIndex({
  tokenize: "full",
});

/**
 * Considering we can't define type for 'import *'\
 * assign it to a new variable and define the type
 */
const materialIcons: { [key: string]: any } = MIcon;
const allIconsMap: { [key: string]: IconDataMaterial } = {};
const allIcons: IconDataMaterial[] = Object.keys(materialIcons)
  .sort()
  .map((importName) => {
    let theme;
    if (importName.indexOf("Outlined") !== -1) {
      theme = "Outlined";
    } else if (importName.indexOf("TwoTone") !== -1) {
      theme = "Two tone";
    } else if (importName.indexOf("Rounded") !== -1) {
      theme = "Rounded";
    } else if (importName.indexOf("Sharp") !== -1) {
      theme = "Sharp";
    } else {
      theme = "Filled";
    }

    const name = importName.replace(/(Outlined|TwoTone|Rounded|Sharp)$/, "");
    let searchable = name;
    if (synonyms[searchable]) {
      searchable += ` ${synonyms[searchable]}`;
    }
    searchIndex.addAsync(importName, searchable);

    const icon = {
      importName,
      name,
      theme,
      Component: materialIcons[importName],
    };
    allIconsMap[importName] = icon;
    return icon;
  });

const StyledIcon = styled("span")(({ theme }) => ({
  display: "inline-flex",
  flexDirection: "column",
  color: theme.palette.text.secondary,
  "& > div": {
    display: "flex",
  },
  "& > div > *": {
    flexGrow: 1,
    fontSize: ".6rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
    width: 0,
  },
}));

const StyledSvgIcon: any = styled(SvgIcon)(({ theme }: { theme: Theme }) => ({
  boxSizing: "content-box",
  cursor: "pointer",
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5),
  margin: theme.spacing(0.5, 0),
  "&:hover": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
  },
}));

const Icons = React.memo(function Icons(props: {
  icons: IconDataMaterial[];
  onClickIcon: (iconid: string) => void;
}) {
  const { icons, onClickIcon } = props;

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {icons.map((icon) => {
        return (
          <StyledIcon
            key={icon.importName}
            onClick={() => onClickIcon(icon.importName)}
            title={icon.importName}
          >
            <StyledSvgIcon
              component={icon.Component}
              fontSize="large"
              tabIndex={-1}
              title={icon.importName}
            />
          </StyledIcon>
        );
      })}
    </div>
  );
});

const MaterialIconPicker = (props: {
  onClickIcon: (iconid: string) => void;
}) => {
  const [theme, setTheme] = React.useState("Filled");
  const [keys, setKeys] = React.useState<IndexSearchResult | null>(null);

  const handleChange = React.useMemo(
    () =>
      debounce((value) => {
        if (value === "") {
          setKeys(null);
        } else {
          searchIndex.searchAsync(value).then((results) => {
            setKeys(results);
          });
        }
      }, 220),
    []
  );

  React.useEffect(() => {
    return () => {
      handleChange.clear();
    };
  }, [handleChange]);

  const icons = React.useMemo(
    () =>
      (keys === null ? allIcons : keys.map((key) => allIconsMap[key])).filter(
        (icon) => theme === icon.theme
      ),
    [theme, keys]
  );

  return (
    <Box pt={1}>
      <Box pb={1}>
        <TextField
          label="Search"
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MIcon.Search />
              </InputAdornment>
            ),
          }}
          onChange={(event) => handleChange(event.target.value)}
        />
      </Box>
      <Box pb={1}>
        <RadioGroup row>
          {["Filled", "Outlined", "Rounded", "Two tone", "Sharp"].map(
            (currentTheme) => {
              return (
                <FormControlLabel
                  key={currentTheme}
                  control={
                    <Radio
                      checked={theme === currentTheme}
                      onChange={() => setTheme(currentTheme)}
                      value={currentTheme}
                      size="small"
                    />
                  }
                  label={currentTheme}
                />
              );
            }
          )}
        </RadioGroup>
      </Box>
      <Box height="250px" width="500px" overflow="auto">
        <Icons icons={icons} onClickIcon={props.onClickIcon} />
      </Box>
    </Box>
  );
};

export default MaterialIconPicker;
