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
  IconButton,
  Checkbox,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { RotateLeft } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../config/store";
import { updateVariables } from "../../slices/variableSlice";
import { VariableService } from "../../services/VariableService";
import CategoriesData from "../../data/CategoriesData.json";
import TagsData from "../../data/TagsData.json";
import RegistriesData from "../../data/RegisteriesData.json";
import { IVariable } from "../../types/Variable";

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
  validForExtraction: boolean;
}

const initialFilters: IFiltersState = {
  validFrom: "",
  validTo: "",
  tags: [],
  categories: [],
  keyword: "",
  registries: [],
  validForExtraction: false,
};

export const Filter: React.FC<IFiltersProps> = ({ onSelect }) => {
  const [filters, setFilters] = useState<IFiltersState>(initialFilters);
  const [categories, setCategories] = useState<any[]>(
    CategoriesData.categories
  );
  const [tags, setTags] = useState<any[]>(TagsData.tags);
  const [qualityRegisters, setQualityRegisters] = useState<any[]>(
    RegistriesData.registries
  );
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

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
        validForExtraction: filters.validForExtraction,
      });

      dispatch(updateVariables(response));
    } catch (error) {
      console.error("Error fetching variables:", error);
    }
  }, [
    dispatch,
    filters.categories,
    filters.keyword,
    filters.registries,
    filters.tags,
    filters.validForExtraction,
    filters.validFrom,
    filters.validTo,
  ]);

  useEffect(() => {
    fetchVariables();
  }, [filters, fetchVariables]);

  const handleFilterChange = (event: any) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name as keyof IFiltersState]: value,
    }));
  };

  const handleTagChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    tagId: number
  ) => {
    const updatedTags = handleNestedChange(tags, filters.tags, tagId);
    setFilters((prevFilters) => ({
      ...prevFilters,
      tags: updatedTags,
    }));
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    categoryId: number
  ) => {
    const updatedCategories = handleNestedChange(
      categories,
      filters.categories,
      categoryId
    );
    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: updatedCategories,
    }));
  };
  const handleNestedChange = (
    items: any[],
    selectedItems: number[],
    itemId: number
  ): number[] => {
    const item = items.find((item) => item.Id === itemId);
    if (!item) return selectedItems;

    if (item.Children && item.Children.length > 0) {
      const childrenIds = item.Children.map(
        (child: { Id: number }) => child.Id
      );
      const allSelected = childrenIds.every((id: number) =>
        selectedItems.includes(id)
      );

      let updatedSelectedItems: number[];
      if (allSelected) {
        updatedSelectedItems = selectedItems.filter(
          (id) => !childrenIds.includes(id) && id !== itemId
        );
      } else {
        updatedSelectedItems = [...selectedItems, ...childrenIds, itemId];
      }
      return updatedSelectedItems;
    } else {
      const isSelected = selectedItems.includes(itemId);
      if (isSelected) {
        return selectedItems.filter((id) => id !== itemId);
      } else {
        return [...selectedItems, itemId];
      }
    }
  };

  const handleChipDelete = (chipToDelete: number, type: string) => {
    setFilters((prevFilters) => {
      switch (type) {
        case "tags":
          return {
            ...prevFilters,
            tags: prevFilters.tags.filter((tag) => tag !== chipToDelete),
          };
        case "registries":
          return {
            ...prevFilters,
            registries: prevFilters.registries.filter(
              (registry) => registry !== chipToDelete
            ),
          };
        case "categories":
          return {
            ...prevFilters,
            categories: prevFilters.categories.filter(
              (category) => category !== chipToDelete
            ),
          };
        default:
          return prevFilters;
      }
    });
  };

  const toggleValidForExtraction = useCallback(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      validForExtraction: !prevFilters.validForExtraction,
    }));
  }, []);

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const years = Array.from({ length: 8 }, (_, i) => 1953 + i); // 1953 to 1960

  return (
    <Box>
      <Grid container spacing={1} alignItems="center">
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="small"
          name="keyword"
          onChange={handleFilterChange}
        />
        <IconButton aria-label="delete">
          <SearchIcon />
        </IconButton>

        <Grid item xs={6} sm={4} md={2}>
          <FormControl fullWidth size="small">
            <Typography>{t("validFrom")}</Typography>
            <Select
              label={t("validFrom")}
              name="validFrom"
              value={filters.validFrom}
              onChange={handleFilterChange}
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
              onChange={handleFilterChange}
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
            onChange={handleFilterChange}
            name="tags"
            displayEmpty
            fullWidth
            size="small"
            renderValue={(selected) =>
              (selected as number[]).map((tagId) => (
                <Chip
                  key={tagId}
                  label={tags.find((tag) => tag.Id === tagId)?.Name || ""}
                  onDelete={() => handleChipDelete(tagId, "tags")}
                />
              ))
            }
          >
            {tags.map((tags) => (
              <React.Fragment key={tags.Id}>
                <MenuItem value={tags.Id}>
                  <Checkbox
                    checked={filters.tags.includes(tags.Id)}
                    onChange={(event) => handleTagChange(event, tags.Id)}
                  />
                  <ListItemText primary={tags.Name} />
                </MenuItem>
                {tags.Children &&
                  tags.Children.map((child: any) => (
                    <MenuItem
                      key={child.Id}
                      value={child.Id}
                      style={{ paddingLeft: 32 }}
                    >
                      <Checkbox
                        checked={filters.tags.includes(child.Id)}
                        onChange={(event) =>
                          handleCategoryChange(event, child.Id)
                        }
                      />
                      <ListItemText primary={child.Name} />
                    </MenuItem>
                  ))}
              </React.Fragment>
            ))}
          </Select>
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <Typography>{t("registries")}</Typography>
          <Select
            multiple
            value={filters.registries}
            onChange={handleFilterChange}
            name="registries"
            displayEmpty
            fullWidth
            size="small"
            renderValue={(selected) =>
              (selected as number[]).map((registryId) => (
                <Chip
                  key={registryId}
                  label={
                    qualityRegisters.find(
                      (registry) => registry.Id === registryId
                    )?.Name || ""
                  }
                  onDelete={() => handleChipDelete(registryId, "registries")}
                />
              ))
            }
          >
            {qualityRegisters.map((registry) => (
              <MenuItem key={registry.Id} value={registry.Id}>
                {registry.Name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <Typography>{t("categories")}</Typography>
          <Select
            multiple
            value={filters.categories}
            onChange={handleFilterChange}
            name="categories"
            displayEmpty
            fullWidth
            size="small"
            renderValue={(selected) =>
              (selected as number[]).map((categoryId) => (
                <Chip
                  key={categoryId}
                  label={
                    categories.find((category) => category.Id === categoryId)
                      ?.Name || ""
                  }
                  onDelete={() => handleChipDelete(categoryId, "categories")}
                />
              ))
            }
          >
            {categories.map((category) => (
              <React.Fragment key={category.Id}>
                <MenuItem value={category.Id}>
                  <Checkbox
                    checked={filters.categories.includes(category.Id)}
                    onChange={(event) =>
                      handleCategoryChange(event, category.Id)
                    }
                  />
                  <ListItemText primary={category.Name} />
                </MenuItem>
                {category.Children &&
                  category.Children.map((child: any) => (
                    <MenuItem
                      key={child.Id}
                      value={child.Id}
                      style={{ paddingLeft: 32 }}
                    >
                      <Checkbox
                        checked={filters.categories.includes(child.Id)}
                        onChange={(event) =>
                          handleCategoryChange(event, child.Id)
                        }
                      />
                      <ListItemText primary={child.Name} />
                    </MenuItem>
                  ))}
              </React.Fragment>
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
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <ButtonGroup disableElevation aria-label="button group">
            <Button
              variant={filters.validForExtraction ? "contained" : "outlined"}
              onClick={toggleValidForExtraction}
              size="small"
            >
              Deliverable Variable
            </Button>
            <Button
              variant={filters.validForExtraction ? "outlined" : "contained"}
              onClick={toggleValidForExtraction}
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
