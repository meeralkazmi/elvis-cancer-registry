import { IVariable } from "../types/Variable";

export class VariableService {
  private elvisApiBaseUrl = "https://metadata.kreftregisteret.no";
  private restApiVersion = "rest/v1";

  private baseApiUrl = `${this.elvisApiBaseUrl}/${this.restApiVersion}`;

  getAllVariables = async () => {
    const res = await fetch(`${this.baseApiUrl}/variables/:filtered?`);
    const reJson: any = await res.json();
    return reJson?.variableList ?? [];
  };

  getVariableById = async (id: string) => {
    const res = await fetch(`${this.baseApiUrl}/variables/${id}`);
    return res.json();
  };

  searchFilters = async (filters: {
    categories?: number[];
    registries?: number[];
    tags?: number[];
    valid_from?: string;
    valid_to?: string;
    keyword?: string;
    validForExtraction?: boolean;
  }): Promise<IVariable[]> => {
    const url = new URL(`${this.baseApiUrl}/variables/:filtered`);

    if (Array.isArray(filters.categories) && filters.categories.length > 0) {
      filters.categories.forEach((cat) =>
        url.searchParams.append("categories[]", String(cat))
      );
    }
    if (Array.isArray(filters.registries) && filters.registries.length > 0) {
      filters.registries.forEach((reg) =>
        url.searchParams.append("registries[]", String(reg))
      );
    }
    if (Array.isArray(filters.tags) && filters.tags.length > 0) {
      filters.tags.forEach((tag) =>
        url.searchParams.append("tags[]", String(tag))
      );
    }
    if (filters.valid_from) {
      url.searchParams.append("valid_from", filters.valid_from);
    }
    if (filters.valid_to) {
      url.searchParams.append("valid_to", filters.valid_to);
    }
    if (filters.keyword) {
      url.searchParams.append("keyword", filters.keyword);
    }
    if (typeof filters.validForExtraction === "boolean") {
      url.searchParams.append(
        "validForExtraction",
        `${filters.validForExtraction}`
      );
    }

    const res = await fetch(url.toString());
    const resJson: any = await res.json();
    return resJson?.variableList ?? [];
  };
}
