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
  Checkbox,
  ListItemText,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { RotateLeft } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { updateVariables } from "../../slices/variableSlice";
import { VariableService } from "../../services/VariableService";
import CategoriesData from "../../data/CategoriesData.json";
import TagsData from "../../data/TagsData.json";
import RegistriesData from "../../data/RegisteriesData.json";
import { IVariable } from "../../types/Variable";
import { Export } from "../Export";

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
interface ISelectItem {
  Id: number;
  Name: string;
  Children: { Id: number; Name: string }[];
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

export const Filter: React.FC<IFiltersProps> = () => {
  const [filters, setFilters] = useState<IFiltersState>(initialFilters);

  const categories: any = CategoriesData.categories;
  const tags: any = TagsData.tags;
  const qualityRegisters: any = RegistriesData.registries;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const variables = useAppSelector((state) => state.variables);
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
  }, [dispatch, filters]);

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

  const handleTagChange = (tagId: number) => {
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

  const handleRegistryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    registryId: number
  ) => {
    const updatedRegistries = handleNestedChange(
      qualityRegisters,
      filters.registries,
      registryId
    );
    setFilters((prevFilters) => ({
      ...prevFilters,
      registries: updatedRegistries,
    }));
  };

  const handleNestedChange = (
    items: any[],
    selectedItems: number[],
    itemId: number
  ): number[] => {
    const findItemById = (items: any[], itemId: number): any | undefined => {
      for (const item of items) {
        if (item.Id === itemId) {
          return item;
        }
        if (item.Children && item.Children.length > 0) {
          const foundInChildren = findItemById(item.Children, itemId);
          if (foundInChildren) {
            return foundInChildren;
          }
        }
      }
      return undefined;
    };

    const toggleItem = (items: any[], itemId: number): number[] => {
      const item = findItemById(items, itemId);
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
          updatedSelectedItems = Array.from(
            new Set([...selectedItems, ...childrenIds, itemId])
          );
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

    return toggleItem(items, itemId);
  };

  const handleChipDelete = (
    chipToDelete: number,
    type: keyof IFiltersState
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: (prevFilters[type] as number[]).filter(
        (item) => item !== chipToDelete
      ),
    }));
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

  const getChipName = useCallback(
    (itemId: number, data: any[]) => {
      let tagName = "";

      data.every((dataItem) => {
        if (Array.isArray(dataItem?.Children)) {
          const child = dataItem.Children.find((c: any) => c.Id === itemId);
          if (child) {
            tagName = t(child.Name);
          }
        }

        if (dataItem.Id === itemId) {
          tagName = t(dataItem.Name);
        }
        return !tagName;
      });

      return tagName;
    },
    [t]
  );
  console.log("Translation key:", t("Syke historie ikke konkrete spesifisert"));

  return (
    <Box p={2}>
      <Grid container spacing={1} alignItems="flex-start">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            sx={{ width: "92%" }}
            id="outlined-basic"
            placeholder={`${t("search")}...`}
            variant="outlined"
            size="small"
            name="keyword"
            value={filters.keyword}
            onChange={(e) => {
              handleFilterChange(e);
              setFilters({ ...filters, keyword: e.target.value });
            }}
            InputProps={{
              endAdornment: <SearchIcon color="primary" />,
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <FormControl size="small">
            <Box display="flex" alignItems="center">
              <Typography variant="body1" component="div" mr={1}>
                {t("validFrom")}
              </Typography>
              <Select
                label={t("validFrom")}
                name="validFrom"
                value={filters.validFrom}
                onChange={handleFilterChange}
                sx={{ width: "100px" }}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <FormControl fullWidth size="small">
            <Box display="flex" alignItems="center">
              <Typography variant="body1" component="div" mr={1}>
                {t("validTo")}
              </Typography>
              <Select
                label={t("validTo")}
                name="validTo"
                value={filters.validTo}
                onChange={handleFilterChange}
                sx={{ width: "100px" }}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Button
            onClick={handleResetFilters}
            variant="contained"
            size="large"
            startIcon={<RotateLeft />}
            sx={{ width: "50px" }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          {" "}
          <Export selectedVariables={variables.value} />{" "}
        </Grid>
        <Grid item xs={12}>
          <Typography>{t("tags")}</Typography>
          <FormControl
            sx={{ width: "30%", paddingRight: 2, paddingBottom: 2 }}
            size="small"
          >
            <Select
              multiple
              value={filters.tags}
              onChange={handleFilterChange}
              name="tags"
              displayEmpty
            >
              {tags.map((tag: ISelectItem) => (
                <React.Fragment key={tag.Id}>
                  <MenuItem value={tag.Id}>
                    <Checkbox
                      checked={filters.tags.includes(tag.Id)}
                      onChange={() => handleTagChange(tag.Id)}
                    />

                    <ListItemText primary={t(tag.Name)} />
                  </MenuItem>
                  {tag.Children &&
                    tag.Children.map((child: any) => (
                      <MenuItem
                        key={child.Id}
                        value={child.Id}
                        style={{ paddingLeft: 32 }}
                      >
                        <Checkbox
                          checked={filters.tags.includes(child.Id)}
                          onChange={() => handleTagChange(child.Id)}
                        />

                        <ListItemText primary={t(child.Name)} />
                      </MenuItem>
                    ))}
                </React.Fragment>
              ))}
            </Select>
          </FormControl>
          {filters.tags.map((tagId) => (
            <Chip
              key={tagId}
              label={getChipName(tagId, tags)}
              onDelete={() => handleChipDelete(tagId, "tags")}
              sx={{ marginBottom: 2 }}
              color="primary"
              size="small"
            />
          ))}
        </Grid>

        <Grid item xs={12}></Grid>

        <Grid item xs={12}>
          <Typography>{t("registries")}</Typography>
          <FormControl
            sx={{ width: "30%", paddingRight: 2, paddingBottom: 2 }}
            size="small"
          >
            <Select
              multiple
              value={filters.registries}
              onChange={handleFilterChange}
              name="registries"
              displayEmpty
            >
              {qualityRegisters.map((registry: ISelectItem) => (
                <React.Fragment key={registry.Id}>
                  <MenuItem value={registry.Id}>
                    <Checkbox
                      checked={filters.registries.includes(registry.Id)}
                      onChange={(event) =>
                        handleRegistryChange(event, registry.Id)
                      }
                    />

                    <ListItemText primary={t(registry.Name)} />
                  </MenuItem>
                  {registry.Children &&
                    registry.Children.map((child: any) => (
                      <MenuItem
                        key={child.Id}
                        value={child.Id}
                        style={{ paddingLeft: 32 }}
                      >
                        <Checkbox
                          checked={filters.registries.includes(child.Id)}
                          onChange={(event) =>
                            handleRegistryChange(event, child.Id)
                          }
                        />
                        <ListItemText primary={t(child.Name)} />
                      </MenuItem>
                    ))}
                </React.Fragment>
              ))}
            </Select>
          </FormControl>
          {filters.registries.map((registryId) => (
            <Chip
              key={registryId}
              label={getChipName(registryId, qualityRegisters)}
              onDelete={() => handleChipDelete(registryId, "registries")}
              sx={{ marginBottom: 2 }}
              color="primary"
              size="small"
            />
          ))}
        </Grid>

        <Grid item xs={12}>
          <Typography>{t("categories")}</Typography>
          <FormControl
            sx={{ width: "30%", paddingRight: 2, paddingBottom: 2 }}
            size="small"
          >
            <Select
              multiple
              value={filters.categories}
              onChange={handleFilterChange}
              name="categories"
              displayEmpty
            >
              {categories.map((category: ISelectItem) => (
                <React.Fragment key={category.Id}>
                  <MenuItem value={category.Id}>
                    <Checkbox
                      checked={filters.categories.includes(category.Id)}
                      onChange={(event) =>
                        handleCategoryChange(event, category.Id)
                      }
                    />
                    <ListItemText primary={t(category.Name)} />
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
                        <ListItemText primary={t(child.Name)} />
                      </MenuItem>
                    ))}
                </React.Fragment>
              ))}
            </Select>
          </FormControl>
          {filters.categories.map((categoryId) => (
            <Chip
              key={categoryId}
              label={getChipName(categoryId, categories)}
              onDelete={() => handleChipDelete(categoryId, "categories")}
              color="primary"
              size="small"
              sx={{ marginBottom: 2 }}
            />
          ))}
        </Grid>

        <Grid item xs={12}>
          <ButtonGroup disableElevation aria-label="button group">
            <Button
              variant={filters.validForExtraction ? "contained" : "outlined"}
              onClick={toggleValidForExtraction}
              size="small"
            >
              {t("deliverableVariable")}
            </Button>
            <Button
              variant={filters.validForExtraction ? "outlined" : "contained"}
              onClick={toggleValidForExtraction}
              size="small"
            >
              {t("allVariable")}
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Box>
  );
};
