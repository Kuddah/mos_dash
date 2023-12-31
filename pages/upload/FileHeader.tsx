import { Button, Grid } from "@material-ui/core";
import React from "react";

export interface FileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
}

export function FileHeader({ file, onDelete }: FileHeaderProps) {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      style={{ marginBottom: ".5em" }}
    >
      <Grid item>{file.name}</Grid>
      <Grid item>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => onDelete(file)}
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  );
}
