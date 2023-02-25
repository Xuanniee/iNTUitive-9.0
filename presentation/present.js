require('dotenv').config({path: '../.env'});    

const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const getPDF = async (file) => {
    let readFileSync = fs.readFileSync(file);
    try {
        let pdfExtract = await pdfParse(readFileSync);
        // console.log("File content: ", pdfExtract.text);
        // console.log("Total pages: ", pdfExtract.numpages);
        // console.log("All content: ", pdfExtract.info);
        return pdfExtract;
    } catch (error) {
        throw new Error(error);
    }
};
const pdfRead = "./Article.pdf";

function summariseFunction(filePathToPDF) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    async function summarise(text) {
        const article = await getPDF(text);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: article.text.substring(0, 15000) + "\n\nTl:dr",
            temperature: 0.7,
            max_tokens: 100,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 1,
        });
        console.log(response.data.choices[0]["text"]);
    }
    summarise(filePathToPDF);
    
    /*
    function present(summary) {
        const pptxgen = require("pptxgenjs");
        let pres = new pptxgen();
        summary.forEach((text) => {
            buildSlide(pres, text);
        });
    
        pres.writeFile({ fileName: "demo.pptx" });
    }
    
    async function buildSlide(pres, text) {
        let slide = pres.addSlide();
    
        let textboxText = text;
        let textboxOpts = {
            x: 0,
            y: "50%",
            w: "80%",
            fontSize: 36,
            fill: { color: "ffffff" },
        };
    
        slide.addText(textboxText, textboxOpts);
    
        // const response = await openai
        //     .createImage({
        //         prompt: text,
        //         n: 1,
        //         size: "1024x1024",
        //     })
        //     .then((response) => {
        //         slide.addImage({
        //             x: 4.5,
        //             y: 2.5,
        //             w: 1.5,
        //             h: 1.5,
        //             path: response.data.data[0].url,
        //         });
        //     });
    }
    let text = [
        "What  drives  the  success  of  reforestation  projects  in  tropical  developing",
        "the  net  loss  of  forest  area  globally  has  slowed  from  8.3  million  ha",
        "(Meyfroidt  and  Lambin,  2011 ).Reforestation  through  planting  trees  on  cleared  land  is  an",
        "reported  in  the  forest  transition  literature,  however  reforestation  is",
        "increases,  the  study  of  forest  rehabilitation  could  shed  light  on",
    ];
    //     "Little  information  exists  to  indicate  the  success  of  reforestation",
    //     "projects  in  achieving  ecological  or  socio-economic  beneﬁts.",
    //     "planted  trees  have  survived  to  maturity,  they  have  not  necessarilyGlobal  Environmental  Change  24  (2014)  334–348",
    //     "Trees  Campaign,  the  National  Greening  Program  in  the  Philippines,  and  the  5  million  ha  reforestation",
    //     "information  exists  on  the  drivers  inﬂuencing  reforestation  success  and  how  these  interact  to  determine",
    //     "In  this  study  we  surveyed  43  reforestation  projects  on",
    //     "Leyte  Island,  The  Philippines  to  identify  the  drivers  that  most  inﬂuence  reforestation  success  as",
    //     "We  also  measured  12  success  indicators,  including  forest",
    //     "establishment,  forest  growth,  environmental  and  socio-economic  success  indicators.",
    //     "regressions  were  used  to  identify  signiﬁcant  relationships  among  drivers  and  indicators  and  this  analysis",
    //     "revegetation  method,  funding  source,  education  and  awareness  campaigns,  the  dependence  of  local",
    //     "people  on  forests,  reforestation  incentives,  project  objectives,  forest  protection  mechanisms  and  the",
    //     "condition  of  road  infrastructure  were  highly  connected  drivers  that  inﬂuenced  multiple  success",
    //     "socioeconomic  incentives,  forest  protection  mechanisms,  sustainable  livelihoods,  diversiﬁcation  of",
    //     "systemic  and  beneﬁcial  effect  on  the  success  of  reforestation  programs  in  tropical  developing  countries.",
    //     "the  rural  areas  of  developing  countries  because  if  reforestation",
    //     "A  number  of  problems  with  past  reforestation  projects  can  be",
    //     "foresters,  reforestation  traditionally  meant  establishing  trees  for  a",
    //     "original  forest  cover  on  degraded  areas  or  about  planting  corridors",
    //     "development,  the  emphasis  of  reforestation  is  on  establishing  trees",
    //     "economic  requirements  for  reforestation  success  appear  to  be  a",
    //     "However,  the  success  or  failure  of  reforestation  projects",
    //     "reforestation  success  drivers  and  their  interactions.",
    //     "al,  policy  and  management  drivers;  and  reforestation  project",
    //     "of  reforestation  projects  (Fig.",
    //     "drivers  of  reforestation  success  and  the  indicators.",
    //     "survival  rate  (a  key  indicator  of  reforestation  success).",
    //     "the  Philippines  lost  its  forest  cover  rapidly  through  heavy  logging,",
    //     "ago  and  were  meant  to  restore  forest  cover,  provide  environmental",
    //     "the  Philippines  planted  approximately  1.7  million  ha  of  forest",
    //     "Understanding  reforestation  success  drivers  will  be  central  to  the",
    //     "of forest loss and degradationReforestation project",
    //     "1.  Conceptual  modelused  for  assessing  reforestation  success  on  Leyte  Island,  the  Philippines  (Adapted  from  Le  et  al.,  2012 ).",
    //     "/  Global  Environmental  Change  24  (2014)  334–348 336operations,  and  conversion  of  forest  into  agriculture,  has  resulted",
    //     "substantial  reforestation  on  the  island  as  part  of  many  past  projects",
    //     "and  the  types  of  reforestation  projects  and  socio-economic  setting",
    //     "Hence  the  focus  of  our  study  was  on  reforestation  projects",
    //     "that  aimed  to  establish  trees  on  formerly  forested  land.",
    //     "Out  of  a  total  of  62  current  or  completed  reforestation  projects",
    //     "selected  reforestation  projects  are  summarised  in  Table  A.2.",
    //     "The  reforestation  project  survey  was  based  on  the  conceptual",
    //     "model  for  assessing  reforestation  success  developed  by  Le  et  al.",
    //     "technical  aspects  of  site  management,  project  socio-economic",
    //     "community  based  forest  management  agreement  projects  or  the",
    //     "property  or  business  manager  for  private  reforestation  projects.",
    //     "project  site  biophysical  characteristics,  tree  establishment  success,",
    //     "For  each  reforestation  project  site,  three",
    //     "A  set  of  signiﬁcant  drivers  for  each  indicator  was  the  result  of",
    //     "of  relationships  that  affect  reforestation  success.",
    //     "Reforestation  project  success",
    //     "The  mean  short-term  tree  survival  rate  of  reforestation  projects",
    //     "Philippines,  which  reported  a  short-term  tree  survival  rate  for",
    //     "64–68%  and  for  forest  sector  loan  II  projects  (community  based",
    //     "forest  management  agreement  projects)  of  71–93%  (Chokkalingam",
    //     "Compared  to  the  actual  area  planted,  most  reforestation",
    //     "projects  (83.7%)  achieved  an  intact  forested  area  of  >70%  of  the",
    //     "actual  planted  area,  the  mean  intact  forested  area  being  88%  of  the",
    //     "ground  biomass  compared  to  mixed  native  species  plantations",
    //     "Key  drivers  affecting  reforestation  project  success",
    //     "of  a  project  achieving  a  short-term  tree  survival  rate  of  /C2180%  were",
    //     "site,  soil  depth,  and  the  short-term  tree  survival  rate)  were",
    //     "statistically  signiﬁcant  in  predicting  the  actual  planted  area",
    //     "followed  by  integrated  production  system  project  objective,  road",
    //     "conditions,  soil  depth,  and  short-term  tree  survival  rate.",
    //     "reforestation  projects  to  meeting  their  planting  area  targets.",
    //     "improving  tree  survival  and  the  ability  of  reforestation  projectsto  meet  their  planting  area  targets.",
    //     "when  planning  reforestation  projects,  including  how  to  minimise",
    //     "158),  an  integrated  production  system  project  objective  (e.g. agroforestry,  non-timber  forest  products,  livestock,  and  ﬁsh),",
    //     "sealed  roads  and  short-term  survival  rate  of  trees  all  had  signiﬁcant",
    //     "positive  effects  on  the  area  of  a  reforestation  site  planted  compared",
    //     "Government-funded  projects  tended  to  reforest",
    //     "government  funded  projects  in  our  study  were  better  at  meeting",
    //     "term  forest  management  (Chokkalingam  et  al.,  2006 ),  explaining",
    //     "success,  including  seedlings  sourced  from  project  nurseries  (x2(1,",
    //     "43)  =  5.021,  p  <  0.05),  support  for  reforestation  projects  through",
    //     "and  other  project  economic  objectives  such  as  food  production",
    //     "negative  relationship  with  project  target  area  in  our  study  (Pearson",
    //     "target  area  increased,  projects  tended  to  plant  less  of  their  target.",
    //     "management  and  project  target  area  (Pearson  correlation",
    //     "tended  to  have  poorer  site  management,  which  would  affect  tree",
    //     "reforestation  projects  were  better  able  to  meet  their  planting",
    //     "Soil  depth  had  a  signiﬁcant  negative  relationship  with  project",
    //     "sites  available  for  reforestation  are  located  at  higher  elevations",
    //     "tion  projects  tend  to  occur  in  agricultural  areas  or  are  better  able  to",
    //     "target  good  sites  and  this  may  explain  why  smaller  reforestation",
    //     "Summary of signiﬁcant relationships among reforestation success drivers and indicators for reforestation projectson Leyte Island, the Philippin es.",
    //     "Project economic objective: integrated production system",
    //     "Road condition to project site (0 = sealed; 1 = unsealed) /C0.304***",
    //     "/  Global  Environmental  Change  24  (2014)  334–348 340Socio-economic success indicators",
    //     "total volume (m3ha/C01year/C01); indicator 5: mean annual increments for above ground biomass (Mg ha/C01year/C01); indicator 6: simpson’s diversity index of trees; indicator 7: decrease in soil erosion (after–before project) (0 = no,",
    //     "increase in cash income (after–before project) (0 = no, 1 = yes); indicator 12: increase in food security (after–before project) (0 = no, 1 = yes); +, /C0: Positive and negative relationship between drivers and indicators for multiple linear",
    //     "target  area)  were  statistically  signiﬁcant  in  predicting  the  forest",
    //     "reforestation  site  is  important  for  tree  establishment  activities",
    //     "arrangements,  and  the  area  of  forest  remaining  intact  compared",
    //     "to  the  planted  area,  suggests  that  unless  socio-economic  incentives",
    //     "Our  results  also  show  that  reforestation  projects  with",
    //     "The  positive  relationship  between  actual  area  planted  and  target",
    //     "Mixed  introduced  species  plantations  performed  best  for  mean",
    //     "of  trees  with  diameter  at  breast  height  /C2110  cm  and  forest  growth.",
    //     "Forest  growth  is  related  to  tree  density;  generally  growth  will  be",
    //     "We  also  found  that  those  reforestation  projects  using  seedlings",
    //     "Stand  age  had  a  signiﬁcant  negative  relationship  with  forest",
    //     "signiﬁcant  effect  on  forest  growth.",
    //     "Reforestation  projects  located",
    //     "on  growth  in  our  study  area,  with  reforestation  projects  located",
    //     "signiﬁcantly  lower  growth  compared  to  mixed  introduced  species",
    //     "forest  growth  in  our  study  area  was  due  to  differences  in  plantation",
    //     "/  Global  Environmental  Change  24  (2014)  334–348 342The  unexpectedly  high  inﬂuence  that  rock  type  had  on  tree",
    //     "at  higher  elevations,  and  mixed  native  species  plantations  were",
    //     "tree  species  diversity  (mixed  native  species)  were  planted  in",
    //     "this  explains  why  rock  type  was  related  to  tree  species  diversity  in",
    //     "We  also  found  a  signiﬁcant  relationship  between  tree  species",
    //     "inﬂuence  tree  species  diversity  (Terradas  et  al.,  2004 ),  presumably",
    //     "tree  species  have  different  growth  rates.",
    //     "projects  with  surrounding  native  forest  had  signiﬁcantly  higher",
    //     "plantations  had  the  greatest  tree  species  diversity.",
    //     "Seedling  source  had  a  signiﬁcant  inﬂuence  on  tree  species",
    //     "diversity  of  reforestation  sites  within  our  study  area,  with  projects",
    //     "community  based  forest  management  agreement  projects  tend  to",
    //     "tend  to  reforest  using  mixed  species  plantations  while  plantations",
    //     "mixed  native  species),  by  72  times  if  the  actual  planted  area  was",
    //     "found  that  where  reforestation  projects  were  able  to  plant  more  of",
    //     "non-linear  relationship  between  reforestation  area  and  erosion",
    //     "than  the  total  area  planted  to  forest.",
    //     "number  of  jobs  provided  by  a  reforestation  project.",
    //     "number  of  jobs  provided  by  a  reforestation  project.",
    //     "production,  contract  tree  planting,  site  maintenance  and  protec-",
    //     "projects  in  our  study  area,  presumably  due  to  increased",
    //     "Project  location  (Eastern  vs  Western  Leyte)  had  a  signiﬁcant",
    //     "projects  in  our  study  area,  however  the  reasons  for  this  are  not",
    //     "odds  of  a  project  improving  market  access  increased  by  8  times  if",
    //     "market  access  as  a  result  of  reforestation  projects.",
    //     "area  when  timber  was  harvested  from  the  project  site.",
    //     "of  jobs  provided  by  the  reforestation  project,  and  increase  in  market",
    //     "access  resulting  from  the  reforestation  project,  all  had  signiﬁcant",
    //     "tance  to  projects,  such  as  selecting  the  right  species,  market",
    //     "information  and  marketing  support  for  forest  products,  and  this  can",
    //     "from  reforestation  projects.",
    //     "access  resulting  from  reforestation  projects  and  were  more  likely",
    //     "designed  to  maintain  food  production  where  trees  are  planted  on",
    //     "reforestation  success  that  would  explain  why  food  security  was",
    //     "Relationships  among  reforestation  success  drivers  and  between",
    //     "Correlation  tests  among  the  reforestation  success  drivers",
    //     "tation  project  success  drivers  and  indicators  in  our  study  area",
    //     "people  of  forests,  reforestation  incentives  (such  as  payments  for",
    //     "production),  forest  protection  mechanisms  (such  as  ﬁre,  weed  and",
    //     "among  reforestation  success  drivers  and  indicators  means  that",
    //     "relationships  among  drivers  and  indicators  of  reforestation",
    //     "success  in  our  study  area,  and  in  general  found  that  revegetation",
    //     "The  success  of  reforestation  efforts  strongly  depends  on  species",
    //     "3.  System  of  signiﬁcant  relationships  among  success  drivers  and  indicators  for  reforestation  projects  conducted  on  Leyte  Island,  the  Philippines  (MONO,  monoculture",
    //     "/  Global  Environmental  Change  24  (2014)  334–348  345containing  productive  marketable  species  can  improve  forest",
    //     "(tree  diversity,  decrease  in  soil  erosion  and  landslide  frequency).",
    //     "Therefore,  before  any  reforestation  project  starts,",
    //     "reforestation  as  successful  in  the  long  term  if  it  did  not  improve",
    //     "important  to  the  success  of  reforestation  projects,  including",
    //     "success,  particularly  those  project  involving  community-based",
    //     "reforestation  programs  is  important  to  success,  particular  where",
    //     "management  factors  inﬂuence  reforestation  success  and  these",
    //     "reforestation  as  a  system  and  understand  how  success  drivers  and",
    //     "dence  of  local  people  on  forest  and  road  conditions  were  among  the",
    //     "most  highly  connected  drivers  of  reforestation  success,  inﬂuencing",
    //     "marketing  support,  species  selection  and  forest  management",
    //     "beneﬁcial  effect  on  reforestation  success  in  tropical  developing",
    //     "in  Tropical  Plantation  Forests.,  43.",
    //     "Community-Based  Forest  Manage-",
    //     "Forest  Partnerships  to  Develop  Tree  Plantations:  Case  Studies  in  the  Philippines.",
    //     "the  forest  lands  of  Leyte,  Philippines.",
    //     "forest  management  program  of  the  Philippines.",
    //     "Growth  and  Yield  and  Economic  Analysis  of  Selected  Forest  Tree",
    //     "FAO  (2002)  Forest  plantation  productivity.",
    //     "Philippine  forest  ecosystems  and  climate  change:",
    //     "Sustainability  of  Reforestation  Projects:  A  Case  Study  from  the  Philippines,",
    //     "reforestation  success  in  tropical  developing  countries.",
    //     "(Eds.),  Forest  Restoration  in  Landscapes:  Beyond  Planting  Trees.",
    //     "Forest  restoration  and  rehabilitation  in  the  philippines.",
    // ];
    // let text = "Machine learning is the future!";
    present(text);
    */
   let text = [
        "What  drives  the  success  of  reforestation  projects  in  tropical  developing",
        "the  net  loss  of  forest  area  globally  has  slowed  from  8.3  million  ha",
        "(Meyfroidt  and  Lambin,  2011 ).Reforestation  through  planting  trees  on  cleared  land  is  an",
        "reported  in  the  forest  transition  literature,  however  reforestation  is",
        "increases,  the  study  of  forest  rehabilitation  could  shed  light  on",];
    return text;
}

module.exports = summariseFunction;