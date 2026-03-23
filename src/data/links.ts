export interface LinkItem {
  nameKey: string;
  url: string;
  icon?: string;
}

export const links = {
  admin: [
    { nameKey: "jobRoom", url: "https://www.job-room.ch/" },
    { nameKey: "eServices", url: "https://www.travail.swiss/secoalv/l/fr" },
    { nameKey: "unemploymentFund", url: "https://www.arbeit.swiss/secoalv/l/fr/home/menue/institutionen-medien/adressen-arbeitslosenkassen.html" },
  ] as LinkItem[],

  jobs: [
    { nameKey: "Jobup", url: "https://www.jobup.ch/" },
    { nameKey: "Indeed", url: "https://www.indeed.ch/" },
    { nameKey: "LinkedIn", url: "https://www.linkedin.com/jobs/" },
  ] as LinkItem[],

  cvTools: [
    { nameKey: "Canva", url: "https://www.canva.com/" },
    { nameKey: "CVDesignR", url: "https://cvdesignr.com/" },
    { nameKey: "freePhoto", url: "https://www.freepik.com/" },
  ] as LinkItem[],

  guide: {
    nameKey: "guideButton",
    url: "https://view.genially.com/6876145da2686e06b0e693b7",
  },

  social: [
    { nameKey: "hospiceGeneral", url: "https://www.hospicegeneral.ch/" },
    { nameKey: "csrVaud", url: "https://www.vd.ch/themes/social/aide-sociale" },
    { nameKey: "healthInsurance", url: "https://www.bag.admin.ch/bag/fr/home/versicherungen/krankenversicherung/krankenversicherung-versicherte-mit-wohnort-in-der-schweiz/praemienverbilligung.html" },
    { nameKey: "housingAid", url: "https://www.bwo.admin.ch/bwo/fr/home.html" },
  ] as LinkItem[],
};
