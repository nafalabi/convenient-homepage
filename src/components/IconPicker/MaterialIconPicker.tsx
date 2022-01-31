/**
 * Reference
 * https://github.com/mui-org/material-ui-docs/blob/latest/docs/src/pages/components/material-icons/SearchIcons.js
 */
import React from "react";
import { Box, styled } from "@mui/system";
import { Index as FlexSearchIndex, IndexSearchResult } from "flexsearch";
import debounce from "@mui/utils/debounce";
import {
  FormControlLabel,
  Icon as FontIcon,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Theme,
} from "@mui/material";
import { FixedSizeGrid } from "react-window";

import { IconDataMaterial } from "./types";
import toSnakeCase from "app/utils/toSnakeCase";
import materialIcons from "./material-icons.json";
import synonyms from "./synonyms";

const searchIndex = new FlexSearchIndex({
  tokenize: "full",
});

const allIconsMap: { [key: string]: IconDataMaterial } = {};
const allIcons: IconDataMaterial[] = materialIcons.sort().map((iconName) => {
  let theme;
  if (iconName.indexOf("outlined") !== -1) {
    theme = "Outlined";
  } else if (iconName.indexOf("two_tone") !== -1) {
    theme = "Two tone";
  } else if (iconName.indexOf("rounded") !== -1) {
    theme = "Rounded";
  } else if (iconName.indexOf("sharp") !== -1) {
    theme = "Sharp";
  } else {
    theme = "Filled";
  }

  const name = iconName.replace(/(outlined|two_tone|rounded|sharp)$/, "");
  let searchable = name;
  if (synonyms[searchable]) {
    searchable += ` ${synonyms[searchable]}`;
  }
  searchIndex.addAsync(iconName, searchable);

  const icon = {
    importName: iconName,
    name,
    theme,
    renderName: toSnakeCase(iconName) ?? "",
  };
  allIconsMap[iconName] = icon;
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

const StyledFontIcon: any = styled(FontIcon)(({ theme }: { theme: Theme }) => ({
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

const COUNT_PER_LINE = 15;

const Icons = React.memo(function Icons(props: {
  icons: IconDataMaterial[];
  onClickIcon: (iconid: string) => void;
  theme: string;
}) {
  const { icons, onClickIcon } = props;
  let baseClassName = "material-icons";
  if (props.theme === "Outlined") {
    baseClassName += "-outlined";
  } else if (props.theme === "Two tone") {
    baseClassName += "-two-tone";
  } else if (props.theme === "Rounded") {
    baseClassName += "-rounded";
  } else if (props.theme === "Sharp") {
    baseClassName += "-sharp";
  }

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      <FixedSizeGrid
        columnCount={COUNT_PER_LINE}
        columnWidth={32}
        height={250}
        rowCount={icons.length / COUNT_PER_LINE}
        rowHeight={32}
        width={32 * COUNT_PER_LINE + 16}
      >
        {({ columnIndex, rowIndex, style }) => {
          const iconIndex = rowIndex * COUNT_PER_LINE + columnIndex;
          const icon = icons[iconIndex];

          if (!icon) return null;

          return (
            <StyledIcon
              key={icon.importName}
              onClick={() => onClickIcon(icon.importName)}
              title={icon.importName}
              style={style}
            >
              <StyledFontIcon
                fontSize="large"
                tabIndex={-1}
                title={icon.importName}
                baseClassName={baseClassName}
              >
                {icon.renderName}
              </StyledFontIcon>
            </StyledIcon>
          );
        }}
      </FixedSizeGrid>
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
                <FontIcon>search</FontIcon>
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
      <Box height="auto" width="auto" overflow="hidden">
        <Icons icons={icons} onClickIcon={props.onClickIcon} theme={theme} />
      </Box>
    </Box>
  );
};

export default MaterialIconPicker;
