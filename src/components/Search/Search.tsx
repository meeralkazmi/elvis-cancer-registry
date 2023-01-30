import React, { useState, useEffect, useCallback } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  SearchContiner,
  SearchIconWrapper,
  StyledInputBase,
  StyledPopper,
} from "./style";
import { Autocomplete, Box, Divider, Typography } from "@mui/material";
import { IVariable } from "../../types/Variable";
import { VariableService } from "../../services/VariableService";
import { useTranslation } from "react-i18next";

interface ISearch {
  onSelect: (variable: IVariable) => void;
}

export const Search: React.FC<ISearch> = (props) => {
  const [value, setValue] = useState<IVariable | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = React.useState<readonly IVariable[]>([]);

  const { t } = useTranslation();

  const searchVariables = useCallback(async () => {
    const variableService = new VariableService();
    const res = await variableService.searchVariables(inputValue);
    setOptions(res);
  }, [inputValue]);

  useEffect(() => {
    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    searchVariables();
  }, [value, inputValue, searchVariables]);

  return (
    <Autocomplete
      id="variable-seearch"
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      isOptionEqualToValue={(option, value) => option.id === value.id}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText={t("noVariable")}
      onChange={(_event: any, newValue: IVariable | null) => {
        if (newValue) props.onSelect(newValue);
        setValue(newValue);
      }}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <SearchContiner ref={params.InputProps.ref}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder={`${t("search")}...`} {...params} />
        </SearchContiner>
      )}
      PopperComponent={StyledPopper}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Box px={2} py={1} >
              <Typography variant="h6" color="primary" >{option.name}</Typography>
              <Typography variant="caption" >{option.description}</Typography>
            </Box>
            <Divider />
          </li>
        )
      }}
    />
  );
};
