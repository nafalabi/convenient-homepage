import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface Props {
  defaultExpanded?: boolean;
  title: string;
  subtitle?: string;
  children: JSX.Element;
}

const SimpleAccordion = ({
  defaultExpanded = true,
  title,
  subtitle,
  children,
}: Props) => {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box flexBasis="10rem" flexShrink={0}>
          <Typography>{title}</Typography>
        </Box>
        <Box color="text.secondary">
          <Typography variant="caption">{subtitle}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default SimpleAccordion;
