import { IVariable } from "../types/Variable";

export class TestDataService {
  get tableHeader() {
    return [
      {
        label: "Name",
        key: "name",
        keyEn: "nameEn",
        type: "string",
        sortable: true,
      },
      { label: "Tech Name", key: "techName", type: "string", sortable: true },
      {
        label: "Category",
        key: "category",
        keyEn: "categoryEn",
        type: "string",
        sortable: true,
      },
      {
        label: "Data Type",
        key: "dataType",
        keyEn: "dataTypeEn",
        type: "string",
        sortable: true,
      },
      {
        label: "Registertation Method",
        key: "registrationMethod",
        keyEn: "registrationMethodEn",
        type: "string",
        sortable: true,
      },
      {
        label: "Approved By",
        key: "approvedBy",
        type: "string",
        sortable: true,
      },

      { label: "Approved On", key: "approvedOn", type: "date", sortable: true },
      { label: "Active", key: "active", type: "boolean", sortable: false },
    ];
  }

  get variables(): IVariable[] {
    return [
      {
        id: 1,
        version: 2,
        informationLevel: {
          id: 2,
          name: "Melding",
          nameEn: "Message",
          shortName: "M",
          sortering: 1,
        },
        category: {
          id: 8,
          name: "KRG Administrasjon",
          nameEn: "CRN administration",
          description:
            "Informasjon som kun benyttes til intern administrasjon i Kreftregisteret",
          descriptionEn:
            "Information only used for administration within the Cancer Registry of Norway.",
          sortering: 1,
          parent: null,
        },
        dataType: {
          id: 6,
          name: "Integer",
          nameEn: "Integer",
          sortering: null,
          description:
            "Feltet inneholder heltall eller spesifikke numeriske tegn",
          descriptionEn:
            "The field contains whole numbers or specific numeric data entry characters",
        },
        registrationMethod: {
          id: 8,
          name: "Laget av regelmotor/system i Kreftregisteret",
          nameEn: "Generated by rule engine/system in the Cancer Registry",
          mappedName: '{"id": "1", "name": "Beregnet"}',
          description:
            "Variabler som er laget ved hjelp av definerte regler i Kreftregisterets regelmotor, GURI, eller i andre systemer. Kan inkludere både kalkulerte variabler og genererte variabler. ",
          descriptionEn:
            "Variables made through defined rules in the Cancer Registry rule engine, GURI or by other systems. Can include both calculated and generated variables. ",
          sortering: 2,
        },
        status: {
          id: 30,
          name: "Aktiv",
          nameEn: "Active",
          description: null,
          descriptionEn: null,
        },
        techName: "meldingslopenr",
        name: "Meldingsløpenummer",
        nameEn: "Message number id",
        description:
          "Internt løpenummer for hver melding som registreres inn. Løpenummer tildeles fortløpende og automatisk og endres ved sletting og ny registrering av melding. ",
        descriptionEn:
          "Internal ID for each message registered. The ID is given consecutively and automatically, and is changed if the message is deleted and re-registered.  ",
        validFrom: "01-01-1953",
        example: "3739808",
        receivedIn: true,
        givenOut: false,
        required: true,
        createdOn: "17-07-2018",
        createdBy: "sla",
        updatedOn: "25-02-2021",
        updatedBy: "sla",
        approvedOn: "25-02-2021",
        approvedBy: "sla",
        dataSize: 10,
        background:
          "Meldingsnummer starter fra 1 i DbQ og fra 10 000 000 i KNEIP",
        existsInPrimary: true,
        existsInRecurrence: true,
        validForExtraction: 1,
        dataExtractionComment:
          "Variabelen er et internt løpenummer i KRG og skal ikke utleveres. Ved utlevering må det etableres et prosjektspesifikt løpenummer for meldinger dersom det er aktuelt.",
        descriptionOfQuality:
          "Svært god. \n\nFinnes for alle meldinger, men er ikke en stabil koblingsnøkkel ettersom meldingsnummer endres ved sletting og ny registrering av melding. ",
        variableType: {
          id: 0,
          name: "Ukjent",
          nameEn: "Unknown",
          description: "Variabeltypen er ukjent.",
          descriptionEn: "The variable type of the variable is unknown.",
          managed: true,
          createdBy: null,
          createdOn: null,
          updatedBy: "sla",
          updatedOn: "23-11-2021",
          deletedBy: null,
          deletedOn: null,
        },
        temporality: {
          id: 0,
          name: "Konstant",
          nameEn: "Fixed",
          description: null,
          descriptionEn: null,
          managed: true,
          createdBy: null,
          createdOn: null,
          updatedBy: null,
          updatedOn: null,
          deletedBy: null,
          deletedOn: null,
        },
        publicVariable: true,
      },
      {
        id: 3,
        version: 6,
        informationLevel: {
          id: 2,
          name: "Melding",
          nameEn: "Message",
          shortName: "M",
          sortering: 1,
        },
        category: {
          id: 4,
          name: "Diagnostikk, ikke nærmere spesifisert",
          nameEn: "Diagnostics, not further specified",
          description:
            "Informasjon om screening eller utredning av den spesifikke kreftdiagnosen og resultat av utredningen. Kategorien benyttes i de tilfeller informasjonen ikke passer inn i mer spesifikk diagnostikkinformasjon. ",
          descriptionEn:
            "Information about the screening or the diagnostic workup of that specific cancer diagnosis and the result of the diagnostics. This category is used when the information does not fit into more specified dagnostic information. ",
          sortering: 17,
          parent: {
            id: 20,
            name: "Diagnostikk",
            nameEn: "Diagnostics",
            description:
              "Toppnivå for filtrering og gruppering av diagnostikk-variabler. ",
            descriptionEn:
              "Top level for filtering and grouping of diagnostic variables. ",
            sortering: 20,
            parent: null,
          },
        },
        dataType: {
          id: 1,
          name: "String",
          nameEn: "String",
          sortering: null,
          description: "Feltet kan inneholde bokstaver, tall og tegn",
          descriptionEn:
            "The field can contain letters, numbers and characters",
        },
        registrationMethod: {
          id: 1,
          name: "Manuelt kodet i Kreftregisteret",
          nameEn: "Manually coded in the Cancer Registry",
          mappedName: '{"id": "3", "name": "Kodet"}',
          description:
            "Ustrukturert informasjon fra kilde om er manuelt kodet og registrert i Kreftregisteret. ",
          descriptionEn:
            "Unstructured information from source which is manually coded and registered in the Cancer Registry.",
          sortering: 7,
        },
        status: {
          id: 30,
          name: "Aktiv",
          nameEn: "Active",
          description: null,
          descriptionEn: null,
        },
        techName: "basis",
        name: "Basis for diagnose",
        nameEn: "Basis of diagnosis",
        description:
          "Den mest pålitelige metode som er brukt for å fastsette diagnosen i den undersøkelsen meldingen omhandler. ",
        descriptionEn:
          "The most reliable method used to confirm the diagnosis in the examination the message concerns. ",
        validFrom: "01-01-1953",
        example: "70",
        receivedIn: true,
        givenOut: true,
        required: true,
        createdOn: "18-07-2018",
        createdBy: "sla",
        updatedOn: "08-06-2022",
        updatedBy: "sla",
        approvedOn: "08-06-2022",
        approvedBy: "sla",
        dataSize: 2,
        existsInPrimary: true,
        existsInRecurrence: true,
        validForExtraction: 1,
        dataExtractionComment:
          "Denne variabelen er en rådata-variabel og leveres normalt ikke ut. Hvis det ikke er mulig å finne et godt alternativ blant variablene som kan leveres ut, kontakt Kreftregisteret for å diskutere hvilke muligheter som finnes for informasjonen du ønsker.",
        descriptionOfQuality:
          "Svært god. \r\n\r\nFinnes for alle meldinger. God kunnskap om koding av denne variabelen. ",
        variableType: {
          id: 0,
          name: "Ukjent",
          nameEn: "Unknown",
          description: "Variabeltypen er ukjent.",
          descriptionEn: "The variable type of the variable is unknown.",
          managed: true,
          createdBy: null,
          createdOn: null,
          updatedBy: "sla",
          updatedOn: "23-11-2021",
          deletedBy: null,
          deletedOn: null,
        },
        temporality: {
          id: 0,
          name: "Konstant",
          nameEn: "Fixed",
          description: null,
          descriptionEn: null,
          managed: true,
          createdBy: null,
          createdOn: null,
          updatedBy: null,
          updatedOn: null,
          deletedBy: null,
          deletedOn: null,
        },
        publicVariable: true,
      },
    ];
  }
}
