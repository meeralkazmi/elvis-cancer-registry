export interface IInformationLevel {
  id: number;
  name: string;
  nameEn: string;
  shortName: string;
  sortering: number;
}
export interface ICategory {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  sortering: number;
  parent: any;
}
export interface IDataType {
  id: number;
  name: string;
  nameEn: string;
  sortering: number;
  description: string;
  descriptionEn: string;
}
export interface IRegistrationMethod {
  id: number;
  name: string;
  nameEn: string;
  mappedName: string;
  description: string;
  descriptionEn: string;
  sortering: number;
}
export interface IStatus {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
}
export interface IVariableType {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  managed: boolean;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
  deletedBy: string;
  deletedOn: string;
}
export interface ITemporality {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  managed: boolean;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
  deletedBy: string;
  deletedOn: string;
}

export interface IVariable {
  id: number;
  version: number;
  informationLevel: IInformationLevel;
  category: ICategory;
  dataType: IDataType;
  registrationMethod: IRegistrationMethod;
  status: IStatus;
  techName: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  validFrom: string;
  example: string;
  receivedIn: boolean;
  givenOut: boolean;
  required: boolean;
  createdOn: string;
  createdBy: string;
  updatedOn: string;
  updatedBy: string;
  approvedOn: string;
  approvedBy: string;
  dataSize: number;
  background: string;
  existsInPrimary: boolean;
  existsInRecurrence: boolean;
  validForExtraction: number;
  dataExtractionComment: string;
  descriptionOfQuality: string;
  variableType: IVariableType;
  temporality: ITemporality;
  publicVariable: boolean;
}
