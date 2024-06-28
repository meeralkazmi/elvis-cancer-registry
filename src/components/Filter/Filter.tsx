import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Chip,
  Grid,
  Typography,
  ButtonGroup,
  FormControl,
} from "@mui/material";

import { IVariable, ICategory } from "../../types/Variable";
import { VariableService } from "../../services/VariableService";
import { useTranslation } from "react-i18next";
import { RotateLeft } from "@mui/icons-material";

interface IFiltersProps {
  onSelect: (variable: IVariable) => void;
}

interface IFiltersState {
  validFrom: string;
  validTo: string;
  tags: number[];
  categories: number[];
  keyword: string;
  registries: number[];
}

const initialFilters: IFiltersState = {
  validFrom: "",
  validTo: "1959",
  tags: [],
  categories: [],
  keyword: "",
  registries: [],
};

export const Filter: React.FC<IFiltersProps> = ({ onSelect }) => {
  const [variables, setVariables] = useState<IVariable[]>([]);
  const [filters, setFilters] = useState<IFiltersState>(initialFilters);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [tags, setTags] = useState<number[]>([]);
  const [qualityRegisters, setQualityRegisters] = useState<number[]>([]);
  const { t } = useTranslation();
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const fetchFilterValues = useCallback(async () => {
    const variableService = new VariableService();
    try {
      const response = await variableService.searchFilters({
        categories: [],
        registries: [],
        tags: [],
        valid_from: "",
        valid_to: "",
        keyword: "",
        latestSearchTime: "",
      });
    } catch (error) {
      console.error("Error fetching filter values:", error);
    }
  }, []);

  const fetchVariables = useCallback(async () => {
    const variableService = new VariableService();
    try {
      const response = await variableService.searchFilters({
        categories: filters.categories,
        registries: filters.registries,
        tags: filters.tags,
        valid_from: filters.validFrom,
        valid_to: filters.validTo,
        keyword: filters.keyword,
        latestSearchTime: "", // Provide the latest search time if needed
      });

      //setVariables(response.variables);
    } catch (error) {
      console.error("Error fetching variables:", error);
    }
  }, [filters]);

  useEffect(() => {
    fetchFilterValues();
  }, [fetchFilterValues]);

  useEffect(() => {
    fetchVariables();
  }, [filters, fetchVariables]);

  const handleFilterChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name as keyof IFiltersState]: value,
    }));
  };

  const handleChipDelete = (chipToDelete: number, type: string) => {
    if (type === "tags") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        tags: prevFilters.tags.filter((tag) => tag !== chipToDelete),
      }));
    } else if (type === "registries") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        registries: prevFilters.registries.filter(
          (registry) => registry !== chipToDelete
        ),
      }));
    }
  };

  const handleButtonClick = (button: string) => {
    setSelectedButton((prevSelectedButton) =>
      prevSelectedButton === button ? null : button
    );
  };
  const handleResetFilters = () => {
    setFilters(initialFilters);
  };
  const years = Array.from({ length: 8 }, (_, i) => 1953 + i); // 1953 to 1960
  return (
    <Box>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={6} sm={4} md={2}>
          <FormControl fullWidth size="small">
            <Typography>{t("validFrom")}</Typography>
            <Select
              label={t("validFrom")}
              name="validFrom"
              value={filters.validFrom}
              //onChange={handleFilterChange}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <FormControl fullWidth size="small">
            <Typography>{t("validTo")}</Typography>
            <Select
              label={t("validTo")}
              name="validTo"
              value={filters.validTo}
              //onChange={handleFilterChange}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Typography>{t("tags")}</Typography>
          <Select
            multiple
            value={filters.tags}
            // onChange={handleFilterChange}
            name="tags"
            displayEmpty
            fullWidth
            size="small"
            renderValue={(selected) =>
              (selected as number[]).map((tagId) => (
                <Chip
                  key={tagId}
                  label={tagId.toString()}
                  onDelete={() => handleChipDelete(tagId, "tags")}
                />
              ))
            }
          >
            {tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <Typography>{t("registries")}</Typography>
          <Select
            multiple
            value={filters.registries}
            // onChange={handleFilterChange}
            name="registries"
            displayEmpty
            fullWidth
            size="small"
            renderValue={(selected) =>
              (selected as number[]).map((registryId) => (
                <Chip
                  key={registryId}
                  label={registryId.toString()}
                  onDelete={() => handleChipDelete(registryId, "registries")}
                />
              ))
            }
          >
            {qualityRegisters.map((registry) => (
              <MenuItem key={registry} value={registry}>
                {registry}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Typography>{t("categories")}</Typography>
          <Select
            multiple
            value={filters.categories}
            // onChange={handleFilterChange}
            name="categories"
            displayEmpty
            fullWidth
            size="small"
            renderValue={(selected) =>
              (selected as number[]).map((categoryId) => (
                <Chip
                  key={categoryId}
                  label={
                    categories.find((category) => category.id === categoryId)
                      ?.name || ""
                  }
                  onDelete={() => {}}
                />
              ))
            }
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Button
            onClick={handleResetFilters}
            variant="outlined"
            size="small"
            sx={{ mt: 3 }}
          >
            <RotateLeft />
          </Button>
        </Grid>

        <Grid item xs={12}>
          <ButtonGroup disableElevation aria-label="button group">
            <Button
              variant={
                selectedButton === "Deliverable Variable"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleButtonClick("Deliverable Variable")}
              size="small"
            >
              Deliverable Variable
            </Button>
            <Button
              variant={
                selectedButton === "Alle Variable" ? "contained" : "outlined"
              }
              onClick={() => handleButtonClick("Alle Variable")}
              size="small"
            >
              Alle Variable
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Box>
  );
};
