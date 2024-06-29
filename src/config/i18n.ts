import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    lng: "nb",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          variables: "Variables",
          name: "Name",
          techName: "Tech Name",
          category: "Category",
          dataType: "Data Type",
          registrationMethod: "Registration Method",
          approvedBy: "Approved By",
          approvedOn: "Approved On",
          active: "Active",
          description: "Description",
          variableType: "Variable Type",
          dataExtractionComment: "Data Extraction Comment",
          descriptionOfQuality: "Quality Description",
          example: "Example",
          informationLevel: "Information Level",
          createdBy: "Created By",
          createdOn: "Created On",
          validFrom: "Valid From",
          receivedIn: "Received In",
          givenOut: "Given Out",
          required: "Required",
          existsInPrimary: "Exist In Primary",
          existsInRecurrence: "Exists In Recurrence",
          search: "Search",
          noVariable: "No Variable",
          validForExtraction: "Deliverables",
        },
      },
      nb: {
        translation: {
          variables: "Variabler",
          name: "Navn",
          techName: "Teknisk navn",
          category: "Kategori",
          dataType: "Data-type",
          registrationMethod: "Registreringsmetode",
          approvedBy: "Godkjent av",
          approvedOn: "Godkjent på",
          active: "Aktiv",
          description: "Beskrivelse",
          variableType: "Variabel type",
          dataExtractionComment: "Datautvinningskommentar",
          descriptionOfQuality: "Kvalitetsbeskrivelse",
          example: "Eksempel",
          informationLevel: "Informasjonsnivå",
          createdBy: "Laget av",
          createdOn: "Opprettet på",
          validFrom: "Gyldig fra",
          receivedIn: "Mottatt inn",
          givenOut: "Gitt ut",
          required: "Obligatorisk",
          existsInPrimary: "Eksisterer i Primær",
          existsInRecurrence: "Eksisterer i gjentakelse",
          search: "Søk",
          noVariable: "Ingen variabel",
          validForExtraction: "Deliverables",
        },
      },
    },
  });

export default i18n;
