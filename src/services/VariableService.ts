export class VariableService {
  private elvisApiBaseUrl = "https://metadata.kreftregisteret.no";
  private restApiVersion = "rest/v1";

  private baseApiUrl = `${this.elvisApiBaseUrl}/${this.restApiVersion}`;

  getAllVariables = async () => {
    const res = await fetch(`${this.baseApiUrl}/variables`);
    return res.json();
  };

  getVariableById = async (id: string) => {
    const res = await fetch(`${this.baseApiUrl}/variables/${id}`);
    return res.json();
  };

  searchVariables = async (keyword: string) => {
    const res = await fetch(
      `${this.baseApiUrl}/variables/:search?keyword=${keyword}`
    );
    return res.json();
  };
}
