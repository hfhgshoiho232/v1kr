"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ#"]

const brands = {
  A: [
    "AACO HEATING AND ELECTRIC MOTORS",
    "ABP-ANTRIEBSTECHNIK",
    "ACS CONTROL SYSTEM",
    "AE ADVANCED ENERGY",
    "AESSEAL",
    "AHP MERKLE",
    "AIRPOL",
    "ALCO CONTROLS (BRAND OF EMERSON)",
    "AB TRASMISSIONI ( FORMER AB BALBONI )",
    "AC-MOTOREN",
    "ADAMS LUBETECH",
    "AECO",
    "AFAG",
    "AIR TEK",
    "AKO REGELUNGSTECHNIK",
    "ALFA LAVAL",
    "ABISOFIX",
    "ACE / ACE CONTROLS",
    "ADVANCED MOTION CONTROLS",
    "AERZEN",
    "AFS AIRFILTER SYSTEME",
    "AIRON PNEUMATIC",
    "AL-KO",
    "ALFATEC FÖRDERSYSTEME",
    "APEX",
    "AQUAFLEX",
    "ASA HYDRAULIK",
    "ATP HYDRAULICS S.R.L",
    "AUTOMATION SERVICE",
    "AVENTICS",
    "AXEL LARSSON",
    "AXELENT",
    "AXFLOW",
  ],
  B: [
    "B&R ELECTRONICS",
    "BADESTNOST",
    "BALLUFF",
    "BAUMER",
    "BECKER",
    "BECKHOFF PROZESSTECHNIK",
    "BEDIA",
    "BELL BELLOW",
    "BELLOWS OF AMERICA",
    "BENDER BELGIUM",
    "BLOCK TRANSFORMATOREN",
    "BLOHM + VOSS",
    "BONFIGLIOLI",
    "BORUSAN",
    "BOSCH (BRAND OF BOSCH REXROTH)",
    "BRINKMANN PUMPEN",
    "BURKERT CHRISTIAN (BRAND OF BÜRKERT)",
    "BURCKHARDT",
    "BRÜEL",
    "BAUSER",
    "BEI SENSORS",
    "BKE",
    "BRINKMANN PUMPEN",
    "BAUER",
    "BECKER ANTRIEBSTECHNIK",
    "BERTHOUD TECHNOLOGIES",
    "BETA UTENSILI",
    "BLAIN",
    "BLOHM",
    "BOSCH (BRAND OF BOSCH GROUP)",
    "BOSSARD",
    "BRÜDER",
    "BURKERT STEUERGERATE",
    "BUSCH",
  ],
  C: [
    "CAB-CONTROL",
    "CAMOZZI (BRAND OF CAMOZZI)",
    "CAE ELEKTRONIK",
    "CAREL",
    "CEJN",
    "COILTECH",
    "COGNEX",
    "COEL MOTORI",
    "COMOSO",
    "COMPAIR (BRAND OF)",
    "COMPOOL",
    "CONTITECH",
    "COMER",
    "CROUZET (BRAND OF CUSTOM SENSORS)",
    "CAMOZZI CORPORATION",
    "CASA (BRAND OF ARTOS)",
    "CEJN INSTRUMENT",
    "CLOOS",
    "COMAT",
    "COSEL-PA",
    "COLORTRONIC",
    "COMMONWEALTH",
    "CONTRINEX",
    "COREMO OCMEA",
    "CRESSTO",
    "CROUZET",
  ],
  D: [
    "DATASENSOR",
    "DAYTON ELECTRIC",
    "DKC",
    "DEUBLIN",
    "DESERT AIRE (BRAND OF)",
    "DESERT AIRE PREMIER",
    "DEUTSCH",
    "DICTAPHONE",
    "DIGIMATIC",
    "DIGITRONIC",
    "DENSO",
    "DOLD",
    "DPT DRIVES",
    "DUPLOMATIC AUTOMATION",
    "DYNAPAR",
    "DATASENSOR",
    "DANFOSS IND",
    "DELTA",
    "DEUBLIN (BRAND OF DEUBLIN)",
    "DESERT",
    "DEUTRONIC",
    "DISA",
    "DIGITALIA",
    "DESIREE ELECTRONIC",
    "DOLDHAM",
    "DRIVE SYSTEMS",
    "DUNGS",
    "DYNISCO",
    "DIGITAL",
    "DESTACO",
    "EATON",
    "EDWARDS",
    "EFECTOR",
    "ELECTRONIC POWER",
    "EMCO",
    "EMKA",
    "SETTIMA",
    "SIEMENS",
    "ELK",
    "ELECTRONIC ASSISTANCE",
  ],
  E: [],
  F: [
    "FAGGIOLATI PUMPS",
    "FAICOM",
    "FAIRCHILD SEMICONDUCTOR (BRAND OF ROTORK)",
    "FANTINI COSMI",
    "FARBO",
    "FARRIS",
    "FASCO",
    "FASTWEL",
    "FEIN",
    "FELM",
    "FERGO ARMATUREN",
    "FERMOD",
    "FESTO",
    "FG INOX (FGINOX)",
    "FIAMA",
    "FILETTA",
    "FINDER PUMPS (BRAND OF DOVER)",
    "FINDEVA",
    "FIPA",
    "FIRESTONE",
    "FIRST SENSOR",
    "FISCHER CONNECTORS",
    "FISCHER MESS- UND REGELTECHNIK",
    "FISHER CONTROLS (BRAND OF EMERSON)",
    "FLECK",
    "FLENDER (BRAND OF SIEMENS)",
    "FLEXBIMEC",
    "FLOTTWEG",
    "FLOVEX",
    "FLOWSERVE FLOW CONTROL",
    "FLSMIDTH",
    "FLUCOM",
    "FLURO",
    "FLUX",
    "FMV LAMEL",
    "FODESCO",
    "FRAKO",
    "FRANKE BEARINGS",
    "FRER",
    "FRIATEC",
    "Friedrich Schwingtechnik Vibrator Motor  / Vimarc",
    "FRIEDRICHS FILTERSYSTEME",
    "FRISTAM",
    "FSG (FERNSTEUERGERÄTE KURT OELSCH)",
    "FST (FILTRATIONS-SEPARATIONS-TECHNIK)",
    "FUCHS UMWELTTECHNIK",
    "FUEHLERSYSTEME",
  ],
  G: [
    "GAI-TRONICS (HUBBELL COMPANY)",
    "GARDNER DENVER",
    "GARLOCK",
    "GAST",
    "GEA GRASSO",
    "GEA WESTFALIA SEPARATOR",
    "GEFRAN",
    "GEM-FA",
    "GENEBRE",
    "GEORGII KOBOLD",
    "GEORGIN",
    "GERARDI",
    "GESIPA",
    "GGB BEARINGS",
    "GILBARCO VEEDER-ROOT",
    "GIOVENZANA",
    "GIROL SRL",
    "GIULIANI ANELLO",
    "GLAMOX",
    "GLYCODUR",
    "GM INTERNATIONAL",
    "GNEUSS",
    "GORMAN-RUPP PUMPS",
    "GOTEC",
    "GOTTAK",
    "GOULDS PUMPS (BRAND OF ITT)",
    "GOYEN / MECAIR / GOYEN MECAIR (BRAND OF PENTAIR)",
    "GRANZOW",
    "GRECON",
    "GRICES",
    "GRÜNBECK",
    "GRUNER",
    "GS INDUSTRIE ELEKTRONIK",
    "GSR VENTILTECHNIK",
    "GÜDEL / GUDEL / GÜDEL SUMER",
    "GÜNTNER GUNTNER GUENTNER",
    "GVR POMPE",
  ],
  H: [
    "HAACON",
    "HAARSLEV",
    "HACH / HACH LANGE",
    "HAGER",
    "HAHN GASFEDERN",
    "HANOVIA",
    "HANSEN TECHNOLOGIES",
    "HARRER & KASSEN",
    "HARTMANN + LÄMMLE (BRAND OF VOITH)",
    "HAUBER-ELEKTRONIK",
    "HAUG",
    "HAVER & BOECKER",
    "HBM / HOTTINGER BALDWIN MESSTECHNIK GMBH",
    "HEINZMANN",
    "HEKATRON",
    "HELMHOLZ",
    "HEPCO",
    "HERMA",
    "HERMETIC-PUMPEN",
    "HEW",
    "HIDRIA",
    "HILLIARD",
    "HINAKA",
    "HKS",
    "HO-MATIC",
    "HOBART",
    "HOERBIGER",
    "HOMA",
    "HS-COOLER / HS COOLER",
    "HUADE",
    "HUBA CONTROL",
    "HYCON",
    "HYDRO CONTROL (BRAND OF WALVOIL)",
    "HYDROMA",
    "HYPERLINE",
    "HYPERTAC / HYPERTRONICS (BRAND OF SMITHS INTERCONNECT)",
    "HYPRO",
  ],
  I: [
    "I-TORK CONTROLS",
    "IBC automatic  / IBC control",
    "ICI CALDAIE",
    "ICME (BRAND OF LAFERT GROUP)",
    "IGUS",
    "IHT AUTOMATION",
    "IKO",
    "ILAPAK (BRAND OF IMA GROUP)",
    "ILME",
    "INDUSTRIE TECHNIK",
    "INNOCONT",
    "INNOLEVEL",
    "INNOVARI",
    "INOX",
    "INOXPA",
    "INTERNORMEN (BRAND OF EATON)",
    "INTORQ",
    "INVICTA VIBRATORS",
    "IREM",
    "ISKRATEL",
    "ISO",
    "ITALCOPPIE SENSORI",
    "ITEM",
    "ITW HALOILA",
  ],
  J: [
    "JAHNS HYDRAULIK",
    "JAKSA",
    "JAMICON",
    "JAQUET",
    "JAURE (KOP-FLEX) (BRAND OF REGAL BELOIT)",
    "JENOPTIK",
    "JOHN CRANE",
    "JORC",
    "JOVENTA",
    "JTEKT",
  ],
  K: [
    "KAISER+KRAFT",
    "KARL KLEIN VENTILATORENBAU",
    "KASTO",
    "KAWASAKI PRECISION MACHINERY",
    "KB ELECTRONICS (BRAND OF NIDEC)",
    "KEBA",
    "KELVION (GEA HEAT EXCHANGERS GROUP)",
    "KENDEIL",
    "KENDRION",
    "KEY TECHNOLOGY",
    "KEYSIGHT",
    "KIESELMANN",
    "KIMO INSTRUMENTS",
    "KIPPRIBOR",
    "KISSLING",
    "KLASCHKA",
    "KLAUKE (BRAND OF EMERSON)",
    "KLINGENBURG",
    "KLINGER",
    "KLIXON (BRAND OF SENSATA TECHNOLOGIES)",
    "KOBOLD",
    "KOCH TECHNIK",
    "KOGANEI",
    "KORENIX",
    "KPA",
    "KRACHT",
    "KRAUTKRAMER (BRAND OF GE SENSING & INSPECTION TECHNOLOGIES)",
    "KROEPLIN DIMENSION MEASUREMENT",
    "KROMSCHROEDER / KROMSCHRÖDER / KROMSCHRODER",
    "KRONENBERG",
    "KRONES",
    "KS KLIMA-SERVICE",
    "KSB",
    "KSR KUEBLER (BRAND OF WIKA GROUP)",
    "KUEBLER / KÜBLER",
    "KUMERA",
  ],
  L: [
    "LAE ELECTRONIC",
    "LAEMPE",
    "LAIPPLE KEB / BRINKMANN",
    "LARIUS",
    "LASKA",
    "LEDUC",
    "LEGRIS (BRAND OF PARKER)",
    "LEINE & LINDE",
    "LEM",
    "LENORD+BAUER",
    "LENZE",
    "LEUZE ELECTRONIC",
    "LEWA",
    "LINCOLN ELECTRIC",
    "LINK BELT",
    "LINZ ELECTRIC",
    "LIONBALL",
    "LOC-LINE",
    "LOGIX (BRAND OF FLOWSERVE)",
    "LÖNNE / LONNE (BRAND OF BRAMMER)",
    "LOOS INTERNATIONAL / BOSCH INDUSTRIEKESSEL",
    "LOVAL",
    "LOVATO",
    "LUBE CORP",
    "LÜDECKE / LUEDECKE",
    "LUEN (BRAND OF OMT S.P.A.)",
    "LUMEL",
    "LUTZ PUMPEN",
    "LUTZ-JESCO",
  ],
  M: [
    "M PUMPS",
    "M&M INTERNATIONAL (BRAND OF ROTORK INSTRUMENTS)",
    "M-SYSTEM",
    "MAAG PUMP",
    "MAGTROL",
    "MAHLE (FILTRATION GROUP)",
    "MAIER HEIDENHEIM",
    "MAJA-MASCHINENFABRIK",
    "MAKITA",
    "MALLARDI FIRENZE",
    "MAPRO INTERNATIONAL",
    "MARCHEL",
    "MAYSER",
    "MAYTEC",
    "MAZURCZAK",
    "MD TOTCO (BRAND OF NATIONAL OILWELL VARCO)",
    "MECALECTRO",
    "MEDC",
    "MEDENUS",
    "MEFIAG (BRAND OF CECO)",
    "MEISTER STRÖMUNGSTECHNIK",
    "MERLIN GERIN (BRAND OF SCHNEIDER ELECTRIC)",
    "MEROBEL (BRAND OF REDEX GROUP)",
    "MERTIK MAXITROL",
    "MESSKO",
    "METAFLUX",
    "METAFRAM (BRAND OF SINTERTECH)",
    "METROL",
    "MICHELL INSTRUMENTS (EASIDEW)",
    "MICRO MOTORS",
    "MICROPRECISION",
    "MICROSONIC",
    "MIDLAND ACS BRAND OF ROTORK",
    "MILTON ROY",
    "MINCO",
    "MINDMAN",
    "MINGARDI",
    "MINK BÜRSTEN",
    "MIX S.R.L.",
    "MOFLON",
    "MONDEO",
    "MÖNNINGHOFF",
    "MONO PUMPS (EZSTRIP)",
    "MONTWILL",
    "MOTEC (BRAND OF AMETEK)",
    "MOTOR POWER",
    "MOTOVARIO / SPAGGIARI TRASMISSIONI",
  ],
  N: [
    "NABERTHERM",
    "NADER",
    "NBC ELETTRONICA",
    "NENUTEC",
    "NETTER VIBRATION",
    "NEUGART GEARS",
    "NEXANS / AMERCABLE",
    "NIBCO",
    "NICOMATIC",
    "NICOTRA",
    "NIDEC MOTOR",
    "NIEDAX GROUP",
    "NILE TOOLS (BRAND OF MUROMOTO TEKKO JAPAN)",
    "NIMATIC",
    "NIOB FLUID",
    "NOCADO",
    "NORBRO (BRAND OF FLOWSERVE)",
    "NORD GETRIEBE",
    "NORDMANN ENGINEERING",
    "NOVEXX",
    "NOVOTEC (SYSTEM- UND INDUSTRIETECHNIK)",
    "NTN-SNR",
    "NUAIRE",
    "NUEGA / NÜGA",
    "NUOVA FIMA",
    "NUOVO PIGNONE (BRAND OF GE)",
  ],
  O: [
    "OCTAGON SYSTEMS",
    "OEG BRAKES / OFFICINA ELETTROMECCANICA GOTTIFREDI",
    "OEMER",
    "OGURA CLUTCH",
    "OILTECH",
    "OLAER (BRAND OF PARKER)",
    "OLI",
    "OMAC",
    "ON SEMICONDUCTOR",
    "ONKA",
    "OPKON ELEKTRONIK",
    "OPTEK-DANULAT",
    "OPTRIS",
    "ORANGE RESEARCH",
    "ORBINOX",
    "OSIP PUMP",
    "OSLV",
    "OXFORD INSTRUMENT",
  ],
  P: [
    "PALBIT",
    "PAVONE SISTEMI",
    "PCH ENGINEERING",
    "PCS INSTRUMENTS",
    "PEAK SYSTEM",
    "PEDROLLO",
    "PENNANT",
    "PERKIN ELMER",
    "PETER ELECTRONIC",
    "PFANNENBERG",
    "PFEIFFER VACUUM",
    "PFERD",
    "PFEUFFER",
    "PHENOMENEX",
    "PIEPER",
    "PIL SENSOREN",
    "PIMATIC",
    "PIOVAN",
    "PMV (BRAND OF FLOWSERVE)",
    "PNEUMATROL",
    "PNEUMAX",
    "POLYLUX",
    "POLYPAC",
    "POMPETRAVAINI",
    "PONAR",
    "POWER INNOVATION",
    "PRAGATI",
    "PRAHER PLASTICS",
    "PRECITEC",
    "PRECITOOL",
    "PROCENTEC",
    "PROCOM VALVES",
    "PROCON",
    "PROCON PUMPS",
    "PRODUAL",
    "PROFROID",
    "PROGALVANO",
    "PROTEMPO",
    "PROVAL",
    "PRÜFTECHNIK DIETER BUSCH",
    "PTP INDUSTRY",
    "PUREX",
  ],
  Q: [],
  R: [
    "RÄDER VOGEL",
    "RAEL MOTORI",
    "RANCO (BRAND OF ROBERTSHAW)",
    "RECO",
    "REGLOPLAS",
    "REGO",
    "REHOBOT",
    "REITZ VENTILATOREN",
    "RENOLD",
    "RESATRON",
    "REVERE TRANSDUCERS (BRAND OF VPG TRANSDUCERS)",
    "RHEON",
    "RIETSCHOTEN",
    "RIKEN SEIKI",
    "RINCK ELECTRONIC",
    "RK ROSE + KRIEGER (A PHOENIX MECANO COMPANY)",
    "ROBOPAC (BRAND OF AETNA GROUP)",
    "ROESSEL-MESSTECHNIK / RÖSSEL-MESSTECHNIK / ROSSEL-MESSTECHNIK",
    "ROLLIX",
    "RONKEN INDUSTRIES",
    "ROSENBERG",
    "ROSTA",
    "RÖTELMANN",
    "ROTOR NL (BRAND OF REGAL BELOIT)",
    "ROTOX",
    "ROWAN ELETTRONICA",
    "RS ISOLSEC",
    "RTK (REGELTECHNIK KORNWESTHEIM)",
    "RUBSAMEN & HERR",
    "RUWAC",
  ],
  S: [
    "S+S REGELTECHNIK",
    "SABIANA",
    "SAIA-BURGESS / SAIA / BURGESS / SBC (BRAND OF HONEYWELL)",
    "SAIER DOSIERTECHNIK",
    "SAMIFLEX",
    "SANYO DENKI",
    "SAP SRL",
    "SART VON ROHR SAS",
    "SARTORIUS",
    "SATEC",
    "SBC LINEAR CO",
    "SC HYDRAULIC",
    "SCAIME",
    "SCALDALAI",
    "SCAME",
    "SCANRECO",
    "SCHAFFNER",
    "SCHERZINGER",
    "SCHISCHEK",
    "SCHMERSAL",
    "SCHÖNBUCH ELECTRONIC",
    "SCHUBERT & SALZER",
    "SCHUNK",
    "SCHUTZE SPRITZTECHNIK / ALFRED SCHÜTZE",
    "SECATEC-SENSOREN",
    "SEFRAM",
    "SEIM",
    "SEKO",
    "SELEMA (BRAND OF FIMI GROUP)",
    "SELI",
    "SENSIT",
    "SENSOPART",
    "SERFILCO",
    "SERVINOX",
    "SERVOMEX",
    "SESAME MOTOR CORP.",
    "SFERAX",
    "SHC",
    "SHIELD (BRAND OF PONY S.R.L.)",
    "SHIMADZU",
    "SHOWA",
    "SHOWA GIKEN INDUSTRIAL",
    "SHURFLO (BRAND OF PENTAIR)",
    "SIBRE",
    "SIEBEC",
    "SIGMATEK",
    "SIMALUBE",
  ],
  T: [
    "TAKENAKA",
    "TAKEX",
    "TAPFLO",
    "TARTARINI (BRAND OF EMERSON)",
    "TDK EPCOS",
    "TECFLAM",
    "TECHNOTRANS",
    "TECOFI",
    "TECSIS (BRAND OF WIKA)",
    "TECSYSTEM",
    "TEDEA-HUNTLEIGH (BRAND OF VPG TRANSDUCERS)",
    "TEKEL INSTRUMENTS (BRAND OF ITALSENSOR)",
    "TEKNO STAMAP",
    "TELCO",
    "TELCOMEC",
    "TELE RADIO",
    "TELECO FRENI",
    "TELECRANE",
    "TEMATEC",
    "TEMPORITI",
    "TEMPRESS",
    "TEREX",
    "TERMICS",
    "TESCOM (BRAND OF EMERSON)",
    "THALES",
    "THERMIK",
    "THERMOKON SENSORTECHNIK",
    "THIES CLIMA",
    "THORLABS",
    "THYSSEN KRUPP",
    "TIDLAND (BRAND OF MAXCESS)",
    "TILLQUIST",
    "TIPPKEMPER / MATRIX ELEKTRONIK",
    "TOGNELLA",
    "TOHNICHI",
    "TOOL-TEMP",
    "TOPWORX (BRAND OF EMERSON)",
    "TORIN SIFAN",
    "TORK",
    "TORWEGGE",
    "TOS RAKOVNIK",
    "TOSOKU",
    "TOSS",
    "TRAFAG SENSORS & CONTROLS",
    "TRAMEC",
    "TRANSMOTEC",
    "TRELLEBORG",
  ],
  U: [
    "UE SYSTEMS",
    "UEBERALL",
    "UFM - UNIVERSAL FLOW MONITORS",
    "UNI-AIR PNEUMATICS / CYLINDERS BY HYPEX",
    "UNITTA (BRAND OF GATES)",
    "UNIVERSAL HYDRAULIK",
    "URACA",
  ],
  V: [
    "VACUUMSCHMELZE",
    "VALCO MELTON",
    "VALMET",
    "VALVOLE HOFMANN BY BONINO ENGINEERING",
    "VAN SYSTEM",
    "VANZETTI",
    "VARGUS",
    "VARISCO",
    "VARVEL",
    "VBS / VACUUM BARRIER SYSTEMS",
    "VEAB",
    "VERSA VALVES",
    "VICTOR REINZ",
    "VIKING PUMP",
    "VISHAY",
    "VMECA",
    "VS SENSORIK",
    "VULCANIC",
  ],
  W: [
    "W. GESSMANN",
    "WADECO",
    "WALRUS",
    "WALTHER PRAEZISION",
    "WALTHER-WERKE",
    "WATSON-MARLOW",
    "WEBER-HYDRAULIK",
    "WEBOMATIC",
    "WEBTEC (HYDRAULIC MEASUREMENT AND CONTROL)",
    "WEDECO",
    "WEFORMA DÄMPFUNGSTECHNIK",
    "WEIMA",
    "WEINTEK",
    "WEKA AG",
    "WERIT",
    "WEST CONTROL SOLUTIONS / INSTRUMENTS",
    "WESTELETTRIC",
    "WESTWARD",
    "WHEELABRATOR",
    "WIELAND",
    "WILCOXON",
    "WILKERSON",
    "WILO",
    "WINKELMANN",
    "WINNER HYDRAULICS",
    "WOLKE",
  ],
  X: [],
  Y: ["YAMADA", "YAMASHIN FILTER", "YARWAY", "YOKOGAWA", "YOSHITAKE", "YOUNG TECH / YTC (BRAND OF ROTORK)", "YUKEN"],
  Z: ["ZEBRA TECHNOLOGIES", "ZENITEL", "ZETTLER", "ZORZINI", "ZYKLOMAT"],
}

const suppliers = {
  A: [
    { name: "AAEON", description: "Computing Platform Service Partner", logo: "/supplier-logos/aaeon.png" },
    {
      name: "Abracon",
      description: "Frequency Control & Timing Devices, RF & Antenna, Magnetics",
      logo: "/supplier-logos/abracon.png",
    },
    { name: "Adam Tech", description: "Connectors and Cable Assemblies", logo: "/supplier-logos/adam-tech.png" },
    { name: "ADATA", description: "Memory and Storage Solutions", logo: "/supplier-logos/adata.png" },
    { name: "ADDA", description: "Cooling Fans and Thermal Management", logo: "/supplier-logos/adda.png" },
    {
      name: "Advanced Thermal Solutions",
      description: "Innovations in Thermal Management",
      logo: "/supplier-logos/ats.png",
    },
    {
      name: "Advantech B+B SmartWorx",
      description: "Industrial Connectivity Solutions",
      logo: "/supplier-logos/advantech.png",
    },
    { name: "AEL Crystals", description: "Powered By ABRACON", logo: "/supplier-logos/ael-crystals.png" },
    {
      name: "AGDisplays",
      description: "Advanced Display Solutions Specialist",
      logo: "/supplier-logos/agdisplays.png",
    },
    { name: "AiSHi", description: "Think Ahead", logo: "/supplier-logos/aishi.png" },
    { name: "Allegro MicroSystems", description: "Power and Sensing Solutions", logo: "/supplier-logos/allegro.png" },
    { name: "Alliance Memory", description: "Memory Solutions", logo: "/supplier-logos/alliance-memory.png" },
    { name: "Altech Corp.", description: "Electronic and Control Components", logo: "/supplier-logos/altech.png" },
    { name: "ambiq", description: "Ultra-Low Power Semiconductor Solutions", logo: "/supplier-logos/ambiq.png" },
    { name: "AME", description: "Electrical Components", logo: "/supplier-logos/ame.png" },
    { name: "American Bright", description: "LED Lighting Solutions", logo: "/supplier-logos/american-bright.png" },
    {
      name: "American Zettler",
      description: "Electromechanical Relays and Switches",
      logo: "/supplier-logos/american-zettler.png",
    },
    { name: "Amp'ed RF", description: "Wireless Connectivity Solutions", logo: "/supplier-logos/amped-rf.png" },
    { name: "Amphenol", description: "Interconnect Solutions", logo: "/supplier-logos/amphenol.png" },
    {
      name: "Amphenol LTW",
      description: "Innovation In Waterproof Solutions",
      logo: "/supplier-logos/amphenol-ltw.png",
    },
    { name: "Amphenol RF", description: "RF Interconnect Solutions", logo: "/supplier-logos/amphenol-rf.png" },
    {
      name: "Amphenol Intercon Systems",
      description: "High-Speed and Power Interconnects",
      logo: "/supplier-logos/amphenol-intercon.png",
    },
    { name: "AMPIRE", description: "LCD Display Solutions", logo: "/supplier-logos/ampire.png" },
    { name: "Amulet Technologies", description: "GUI Solutions", logo: "/supplier-logos/amulet.png" },
    { name: "ams OSRAM", description: "Sensor Solutions and Photonics", logo: "/supplier-logos/ams-osram.png" },
    { name: "AMT", description: "Encoder and Motion Control", logo: "/supplier-logos/amt.png" },
    { name: "Antistat", description: "ESD and Production Consumables", logo: "/supplier-logos/antistat.png" },
    { name: "Aries Electronics", description: "Interconnect Solutions", logo: "/supplier-logos/aries.png" },
    { name: "Arkalumen", description: "LED Drivers and Controls", logo: "/supplier-logos/arkalumen.png" },
    { name: "ASSMANN WSW Components", description: "Electronic Components", logo: "/supplier-logos/assmann.png" },
    { name: "AZ Displays", description: "Display Solutions", logo: "/supplier-logos/az-displays.png" },
    { name: "Azoteq", description: "Proximity and Touch Solutions", logo: "/supplier-logos/azoteq.png" },
  ],
  B: [
    { name: "Belden", description: "Connectivity and networking products", logo: "/supplier-logos/belden.png" },
    { name: "Bergquist", description: "Thermal management solutions", logo: "/supplier-logos/bergquist.png" },
    { name: "Bomar", description: "Precision electronic components", logo: "/supplier-logos/bomar.png" },
    { name: "Bourns", description: "Electronic components", logo: "/supplier-logos/bourns.png" },
  ],
  C: [
    { name: "Caddock", description: "High performance film resistors", logo: "/supplier-logos/caddock.png" },
    { name: "Cinch", description: "Connectivity solutions", logo: "/supplier-logos/cinch.png" },
    { name: "Coilcraft", description: "Magnetic components", logo: "/supplier-logos/coilcraft.png" },
    { name: "Cree", description: "LED components and RF devices", logo: "/supplier-logos/cree.png" },
  ],
  D: [
    {
      name: "Delta Electronics",
      description: "Power and thermal management solutions",
      logo: "/supplier-logos/delta.png",
    },
    {
      name: "Diodes Incorporated",
      description: "Discrete, logic, and analog semiconductors",
      logo: "/supplier-logos/diodes.png",
    },
  ],
  E: [
    { name: "EPCOS", description: "Electronic components, modules and systems", logo: "/supplier-logos/epcos.png" },
    { name: "Eaton", description: "Power management solutions", logo: "/supplier-logos/eaton.png" },
    {
      name: "Efinix",
      description: "Programmable product platforms and technology",
      logo: "/supplier-logos/efinix.png",
    },
    { name: "El Sensor Technologies", description: "Sensor solutions", logo: "/supplier-logos/el-sensor.png" },
    { name: "ELATEC RFID Systems", description: "RFID readers and transponders", logo: "/supplier-logos/elatec.png" },
    { name: "EnOcean", description: "Self-powered IoT", logo: "/supplier-logos/enocean.png" },
    { name: "ERG", description: "Endicott Research Group, Inc.", logo: "/supplier-logos/erg.png" },
    { name: "ERP Power", description: "LED drivers and power supplies", logo: "/supplier-logos/erp-power.png" },
    { name: "Espressif Systems", description: "Wi-Fi and Bluetooth solutions", logo: "/supplier-logos/espressif.png" },
    { name: "Everspin Technologies", description: "MRAM solutions", logo: "/supplier-logos/everspin.png" },
    {
      name: "Excellence Optoelectronics Inc.",
      description: "LED components and modules",
      logo: "/supplier-logos/eoi.png",
    },
    { name: "Ezurio", description: "Wireless modules", logo: "/supplier-logos/ezurio.png" },
  ],
  F: [
    { name: "Fair-Rite", description: "Ferrite components", logo: "/supplier-logos/fair-rite.png" },
    {
      name: "Fairchild Semiconductor",
      description: "Power and mobile semiconductors",
      logo: "/supplier-logos/fairchild.png",
    },
    { name: "Fibocom", description: "IoT and automotive connectivity", logo: "/supplier-logos/fibocom.png" },
    { name: "Flexxon", description: "Industrial grade storage solutions", logo: "/supplier-logos/flexxon.png" },
    { name: "FLIR", description: "Thermal imaging systems", logo: "/supplier-logos/flir.png" },
    {
      name: "Formerica OptoElectronics Inc.",
      description: "LED components and lighting solutions",
      logo: "/supplier-logos/formerica.png",
    },
    { name: "Fox", description: "Powered By ABRACON", logo: "/supplier-logos/fox.png" },
    { name: "Fraen", description: "Optics and thermal management", logo: "/supplier-logos/fraen.png" },
    {
      name: "Future Electronics Dev Tools",
      description: "Development tools and kits",
      logo: "/supplier-logos/future-electronics.png",
    },
  ],
  G: [
    { name: "GCT", description: "Connectors and interconnect components", logo: "/supplier-logos/gct.png" },
    { name: "General Luminaire", description: "Lighting solutions", logo: "/supplier-logos/general-luminaire.png" },
    { name: "Geyer Electronic", description: "Quartz crystals and oscillators", logo: "/supplier-logos/geyer.png" },
    { name: "GMN", description: "User interface solutions", logo: "/supplier-logos/gmn.png" },
    { name: "Good-Ark Semiconductor", description: "Semiconductor components", logo: "/supplier-logos/good-ark.png" },
    { name: "GradConn", description: "RF and coaxial connectors", logo: "/supplier-logos/gradconn.png" },
    { name: "Grayhill", description: "Switches and human interface devices", logo: "/supplier-logos/grayhill.png" },
    { name: "Greenliant", description: "Storage solutions", logo: "/supplier-logos/greenliant.png" },
    { name: "GREPOW", description: "Battery solutions", logo: "/supplier-logos/grepow.png" },
  ],
  H: [
    { name: "HALO Electronics", description: "Magnetic components and modules", logo: "/supplier-logos/halo.png" },
    { name: "HARTING", description: "Connectivity and network components", logo: "/supplier-logos/harting.png" },
    { name: "HercuLux Optics", description: "LED optics", logo: "/supplier-logos/herculux.png" },
    { name: "Heyco", description: "Molded wire protection products", logo: "/supplier-logos/heyco.png" },
    { name: "Hirose Electric", description: "Connectors", logo: "/supplier-logos/hirose.png" },
    { name: "Hongfa", description: "Relays and switches", logo: "/supplier-logos/hongfa.png" },
    { name: "Hosonic", description: "Frequency control products", logo: "/supplier-logos/hosonic.png" },
    { name: "HPWINNER", description: "LED lighting solutions", logo: "/supplier-logos/hpwinner.png" },
    { name: "Huixin Electronics Technology", description: "Electronic components", logo: "/supplier-logos/huixin.png" },
  ],
  I: [
    { name: "ICC", description: "Intervox", logo: "/supplier-logos/icc.png" },
    { name: "IK Semicon", description: "Semiconductor solutions", logo: "/supplier-logos/ik-semicon.png" },
    { name: "ILSI", description: "Powered By ABRACON", logo: "/supplier-logos/ilsi.png" },
    {
      name: "Indium Corporation",
      description: "Solder and thermal management materials",
      logo: "/supplier-logos/indium.png",
    },
    { name: "Infineon", description: "Semiconductor solutions", logo: "/supplier-logos/infineon.png" },
    { name: "Innolux", description: "Display solutions", logo: "/supplier-logos/innolux.png" },
    { name: "Inolux", description: "LED components", logo: "/supplier-logos/inolux.png" },
    { name: "Inventek Systems", description: "Wireless solutions", logo: "/supplier-logos/inventek.png" },
    { name: "Inventronics", description: "LED drivers", logo: "/supplier-logos/inventronics.png" },
    { name: "Io Audio", description: "Audio solutions", logo: "/supplier-logos/io-audio.png" },
    { name: "IQD", description: "Frequency products", logo: "/supplier-logos/iqd.png" },
    { name: "Isocom Components", description: "Optocouplers and relays", logo: "/supplier-logos/isocom.png" },
    { name: "iWave Systems", description: "Embedded computing solutions", logo: "/supplier-logos/iwave.png" },
    { name: "IXYS", description: "Power semiconductors", logo: "/supplier-logos/ixys.png" },
  ],
  J: [],
  K: [
    { name: "Kemet", description: "Capacitors and electronic components", logo: "/supplier-logos/kemet.png" },
    {
      name: "Keystone",
      description: "Electronic interconnect components and hardware",
      logo: "/supplier-logos/keystone.png",
    },
    { name: "King Power", description: "Power supply solutions", logo: "/supplier-logos/king-power.png" },
    { name: "Kristel", description: "Display solutions", logo: "/supplier-logos/kristel.png" },
    { name: "KYOCERA AVX", description: "Electronic components", logo: "/supplier-logos/kyocera-avx.png" },
    {
      name: "Kyocera International",
      description: "Electronic components and equipment",
      logo: "/supplier-logos/kyocera.png",
    },
  ],
  L: [
    { name: "LEDdynamics", description: "LED lighting solutions", logo: "/supplier-logos/leddynamics.png" },
    { name: "LEDilsolutions", logo: "/supplier-logos/leddynamics.png" },
    { name: "LEDil", description: "LED optics", logo: "/supplier-logos/ledil.png" },
    { name: "Leopard Imaging", description: "Embedded vision systems", logo: "/supplier-logos/leopard-imaging.png" },
    { name: "Litemax", description: "Industrial display solutions", logo: "/supplier-logos/litemax.png" },
    { name: "LITEON", description: "Optoelectronics and power supply solutions", logo: "/supplier-logos/liteon.png" },
    { name: "Littelfuse", description: "Circuit protection solutions", logo: "/supplier-logos/littelfuse.png" },
    { name: "Lumex", description: "Optoelectronic components", logo: "/supplier-logos/lumex.png" },
    { name: "Lumileds", description: "LED lighting solutions", logo: "/supplier-logos/lumileds.png" },
    { name: "Luminus Devices", description: "LED components", logo: "/supplier-logos/luminus.png" },
  ],
  M: [
    {
      name: "Major League Electronics",
      description: "Electronic components distribution",
      logo: "/supplier-logos/major-league.png",
    },
    { name: "Mallory", description: "Batteries and energy storage", logo: "/supplier-logos/mallory.png" },
    { name: "Marquardt", description: "Switches and switching systems", logo: "/supplier-logos/marquardt.png" },
    {
      name: "MaxLinear",
      description: "Radio frequency and mixed-signal integrated circuits",
      logo: "/supplier-logos/maxlinear.png",
    },
    { name: "MEAN WELL", description: "Power supplies", logo: "/supplier-logos/mean-well.png" },
    { name: "MechaTronix", description: "Thermal management solutions", logo: "/supplier-logos/mechatronix.png" },
    { name: "Melexis", description: "Sensor and driver ICs", logo: "/supplier-logos/melexis.png" },
    { name: "METZ CONNECT", description: "Connection technology", logo: "/supplier-logos/metz-connect.png" },
    { name: "Micro Commercial Components", description: "Discrete semiconductors", logo: "/supplier-logos/mcc.png" },
    {
      name: "Microchip",
      description: "Microcontrollers and analog semiconductors",
      logo: "/supplier-logos/microchip.png",
    },
    {
      name: "MikroElektronika",
      description: "Development tools and embedded solutions",
      logo: "/supplier-logos/mikroe.png",
    },
    {
      name: "Mill-Max",
      description: "Precision-machined interconnect components",
      logo: "/supplier-logos/mill-max.png",
    },
    { name: "MINMAX", description: "Power supplies", logo: "/supplier-logos/minmax.png" },
    { name: "MMD", description: "Powered By ABRACON", logo: "/supplier-logos/mmd.png" },
    { name: "MOONS' Industries", description: "Motion control products", logo: "/supplier-logos/moons.png" },
    {
      name: "Morningstar",
      description: "Solar charge controllers and inverters",
      logo: "/supplier-logos/morningstar.png",
    },
    { name: "MultiTech", description: "IoT communication devices", logo: "/supplier-logos/multitech.png" },
    { name: "Myrra", description: "Magnetic components", logo: "/supplier-logos/myrra.png" },
  ],
  N: [
    { name: "Nearson", description: "Antennas", logo: "/supplier-logos/nearson.png" },
    {
      name: "Nexperia",
      description: "Discrete and logic semiconductor components",
      logo: "/supplier-logos/nexperia.png",
    },
    { name: "NIC Components", description: "Passive electronic components", logo: "/supplier-logos/nic.png" },
    { name: "Nichicon", description: "Capacitors", logo: "/supplier-logos/nichicon.png" },
    { name: "Nicomatic", description: "Micro-connectors", logo: "/supplier-logos/nicomatic.png" },
    {
      name: "Nisshinbo Micro Devices",
      description: "Analog and mixed-signal ICs",
      logo: "/supplier-logos/nisshinbo.png",
    },
    { name: "NKK Switches", description: "Switches and keyboards", logo: "/supplier-logos/nkk.png" },
    { name: "NorComp", description: "Connectors", logo: "/supplier-logos/norcomp.png" },
    { name: "NXP", description: "Semiconductor solutions", logo: "/supplier-logos/nxp.png" },
  ],
  O: [
    { name: "onsemi", description: "Power and sensor technologies", logo: "/supplier-logos/onsemi.png" },
    { name: "Opto 22", description: "Industrial automation and control", logo: "/supplier-logos/opto22.png" },
    { name: "Opulent", description: "LED lighting solutions", logo: "/supplier-logos/opulent.png" },
    { name: "OriginGPS", description: "GPS modules", logo: "/supplier-logos/origingps.png" },
    { name: "Orion Fans", description: "Cooling fans and thermal management", logo: "/supplier-logos/orion.png" },
    { name: "Oupiin", description: "Cooling solutions", logo: "/supplier-logos/oupiin.png" },
  ],
  P: [
    { name: "Paktron Capacitors", description: "Film capacitors", logo: "/supplier-logos/paktron.png" },
    { name: "Panasonic", description: "Electronic components and solutions", logo: "/supplier-logos/panasonic.png" },
    { name: "PARA LIGHT", description: "LED components", logo: "/supplier-logos/para-light.png" },
    { name: "Pericom Saronix-eCera", description: "Timing solutions", logo: "/supplier-logos/pericom.png" },
    { name: "Power Dynamics", description: "Power supply solutions", logo: "/supplier-logos/power-dynamics.png" },
    { name: "Power Integrations", description: "Power conversion ICs", logo: "/supplier-logos/power-integrations.png" },
    { name: "Promate Solutions", description: "Power and thermal management", logo: "/supplier-logos/promate.png" },
    { name: "ProTek Devices", description: "Circuit protection devices", logo: "/supplier-logos/protek.png" },
    { name: "Pulse Electronics", description: "Electronic components", logo: "/supplier-logos/pulse.png" },
  ],
  Q: [
    { name: "QST", description: "Sensor solutions", logo: "/supplier-logos/qst.png" },
    { name: "Quadrangle Products", description: "Electronic components", logo: "/supplier-logos/quadrangle.png" },
    { name: "Qualtek", description: "Power cords and accessories", logo: "/supplier-logos/qualtek.png" },
    { name: "QuickLogic", description: "Embedded FPGA solutions", logo: "/supplier-logos/quicklogic.png" },
  ],
  R: [
    { name: "Raltron", description: "Frequency control products", logo: "/supplier-logos/raltron.png" },
    { name: "Rayovac", description: "Batteries", logo: "/supplier-logos/rayovac.png" },
    {
      name: "Realtek",
      description: "Communications network and computer peripheral ICs",
      logo: "/supplier-logos/realtek.png",
    },
    { name: "RECOM", description: "Power supplies", logo: "/supplier-logos/recom.png" },
    { name: "RENA", description: "Electronic components", logo: "/supplier-logos/rena.png" },
    { name: "Renesas", description: "Semiconductor solutions", logo: "/supplier-logos/renesas.png" },
    { name: "RF Industries", description: "Interconnect products", logo: "/supplier-logos/rfi.png" },
    { name: "Richtek", description: "Power management ICs", logo: "/supplier-logos/richtek.png" },
    { name: "ROHM", description: "Semiconductor and electronic components", logo: "/supplier-logos/rohm.png" },
  ],
  S: [
    { name: "Sagrad", description: "Wireless modules", logo: "/supplier-logos/sagrad.png" },
    { name: "Same Sky - CUI Devices", description: "Electronic components", logo: "/supplier-logos/same-sky.png" },
    { name: "Samsung Electro-Mechanics", description: "Electronic components", logo: "/supplier-logos/samsung.png" },
    { name: "Samsung LED", description: "LED components", logo: "/supplier-logos/samsung-led.png" },
    { name: "Samwha USA", description: "Capacitors", logo: "/supplier-logos/samwha.png" },
    { name: "Schaffner EMC", description: "EMC/EMI components and solutions", logo: "/supplier-logos/schaffner.png" },
    {
      name: "Schneider Electric",
      description: "Energy management and automation",
      logo: "/supplier-logos/schneider.png",
    },
    {
      name: "SCHURTER",
      description: "Circuit protection, connectors and switches",
      logo: "/supplier-logos/schurter.png",
    },
    { name: "ScioSense", description: "Sensor solutions", logo: "/supplier-logos/sciosense.png" },
    { name: "SEGGER", description: "Embedded systems tools", logo: "/supplier-logos/segger.png" },
    { name: "Semtech", description: "Analog and mixed-signal semiconductors", logo: "/supplier-logos/semtech.png" },
    { name: "Senodia", description: "MEMS sensors", logo: "/supplier-logos/senodia.png" },
    { name: "Sensirion", description: "Environmental and flow sensors", logo: "/supplier-logos/sensirion.png" },
    { name: "Seoul Semiconductor", description: "LED products", logo: "/supplier-logos/seoul.png" },
    { name: "Seoul Viosys", description: "UV LED solutions", logo: "/supplier-logos/seoul-viosys.png" },
    { name: "Sharp", description: "Electronic components and solutions", logo: "/supplier-logos/sharp.png" },
    { name: "Sierra Wireless", description: "IoT solutions", logo: "/supplier-logos/sierra-wireless.png" },
    { name: "Signet CNK Inc.", description: "Electronic components", logo: "/supplier-logos/signet.png" },
    { name: "Signify North America", description: "Lighting solutions", logo: "/supplier-logos/signify.png" },
    { name: "Silergy", description: "Analog and mixed-signal ICs", logo: "/supplier-logos/silergy.png" },
    { name: "Silex Technology", description: "Wireless connectivity solutions", logo: "/supplier-logos/silex.png" },
    { name: "SINBON", description: "Cable assembly and connectors", logo: "/supplier-logos/sinbon.png" },
    { name: "SkyHigh Memory", description: "Memory solutions", logo: "/supplier-logos/skyhigh.png" },
    { name: "SMC", description: "Pneumatic components", logo: "/supplier-logos/smc.png" },
    { name: "SMARTRAC", description: "RFID technology", logo: "/supplier-logos/smartrac.png" },
    { name: "Socle", description: "Semiconductor solutions", logo: "/supplier-logos/socle.png" },
    { name: "SolidRun", description: "Embedded systems", logo: "/supplier-logos/solidrun.png" },
    { name: "Solomon Systech", description: "Display IC solutions", logo: "/supplier-logos/solomon.png" },
    { name: "Song Chuan", description: "Relays", logo: "/supplier-logos/song-chuan.png" },
    {
      name: "Source Photonics",
      description: "Optical communication products",
      logo: "/supplier-logos/source-photonics.png",
    },
    { name: "Stackpole Electronics", description: "Resistive components", logo: "/supplier-logos/stackpole.png" },
    { name: "STMicroelectronics", description: "Semiconductor solutions", logo: "/supplier-logos/st.png" },
    { name: "Sullins", description: "Connectors", logo: "/supplier-logos/sullins.png" },
    { name: "SUNON", description: "Cooling fans", logo: "/supplier-logos/sunon.png" },
    { name: "SUNS International", description: "Switches and sensors", logo: "/supplier-logos/suns.png" },
    { name: "Susumu", description: "Thin film resistors", logo: "/supplier-logos/susumu.png" },
    { name: "Synapse Wireless", description: "IoT solutions", logo: "/supplier-logos/synapse.png" },
  ],
  T: [
    { name: "Tadiran Batteries", description: "Lithium batteries", logo: "/supplier-logos/tadiran.png" },
    {
      name: "Taiwan Semiconductor",
      description: "Discrete semiconductors",
      logo: "/supplier-logos/taiwan-semiconductor.png",
    },
    { name: "TAIYO YUDEN", description: "Electronic components", logo: "/supplier-logos/taiyo-yuden.png" },
    { name: "Taoglas", description: "Antenna solutions", logo: "/supplier-logos/taoglas.png" },
    { name: "TE Connectivity", description: "Connectivity and sensor solutions", logo: "/supplier-logos/te.png" },
    { name: "TechNexion", description: "Embedded computing solutions", logo: "/supplier-logos/technexion.png" },
    { name: "Telit Cinterion", description: "IoT enablement", logo: "/supplier-logos/telit.png" },
    { name: "Tempo Semiconductor", description: "Audio solutions", logo: "/supplier-logos/tempo.png" },
    { name: "Tianma America", description: "Display solutions", logo: "/supplier-logos/tianma.png" },
    { name: "Toradex", description: "Embedded computing solutions", logo: "/supplier-logos/toradex.png" },
    {
      name: "Touch International",
      description: "Touch screen solutions",
      logo: "/supplier-logos/touch-international.png",
    },
    { name: "Touchstone Technology", description: "Semiconductor solutions", logo: "/supplier-logos/touchstone.png" },
    { name: "TPK America", description: "Touch solutions", logo: "/supplier-logos/tpk.png" },
    { name: "Triad Magnetics", description: "Magnetic components", logo: "/supplier-logos/triad.png" },
    { name: "TT Electronics", description: "Engineered electronics", logo: "/supplier-logos/tt-electronics.png" },
    { name: "TXC", description: "Frequency control products", logo: "/supplier-logos/txc.png" },
  ],
  U: [
    { name: "u-blox", description: "Positioning and wireless communication", logo: "/supplier-logos/u-blox.png" },
    { name: "Unigen", description: "Memory modules", logo: "/supplier-logos/unigen.png" },
    { name: "Union Technology Corp.", description: "Electronic components", logo: "/supplier-logos/utc.png" },
  ],
  V: [
    { name: "VARTA Microbattery", description: "Batteries", logo: "/supplier-logos/varta.png" },
    { name: "VCC", description: "Indication solutions", logo: "/supplier-logos/vcc.png" },
    { name: "Viking", description: "Connectors", logo: "/supplier-logos/viking.png" },
    { name: "Vishay", description: "Electronic components", logo: "/supplier-logos/vishay.png" },
    { name: "VPG Foil Resistors", description: "Precision resistors", logo: "/supplier-logos/vpg.png" },
  ],
  W: [
    { name: "WAGO", description: "Electrical interconnection products", logo: "/supplier-logos/wago.png" },
    { name: "Wakefield Thermal", description: "Thermal management solutions", logo: "/supplier-logos/wakefield.png" },
    { name: "Wall Industries", description: "Power supplies", logo: "/supplier-logos/wall.png" },
    { name: "Walsin Technology Corporation", description: "Passive components", logo: "/supplier-logos/walsin.png" },
    { name: "Wandboard", description: "Single board computers", logo: "/supplier-logos/wandboard.png" },
    {
      name: "WECO Electrical Connectors",
      description: "Terminal blocks and connectors",
      logo: "/supplier-logos/weco.png",
    },
    { name: "Wieland Electric", description: "Industrial connectivity", logo: "/supplier-logos/wieland.png" },
    { name: "WIMA", description: "Film capacitors", logo: "/supplier-logos/wima.png" },
    { name: "WiseChip Semiconductor", description: "OLED displays", logo: "/supplier-logos/wisechip.png" },
    { name: "WIZnet", description: "Internet of Things solutions", logo: "/supplier-logos/wiznet.png" },
    {
      name: "Würth Elektronik",
      description: "Electronic and electromechanical components",
      logo: "/supplier-logos/wurth.png",
    },
  ],
  Y: [{ name: "Yageo", description: "Passive components", logo: "/supplier-logos/yageo.png" }],
  Z: [
    { name: "Zettler Magnetics", description: "Electromagnetic components", logo: "/supplier-logos/zettler.png" },
    { name: "ZF Electronics", description: "Switches and sensors", logo: "/supplier-logos/zf.png" },
    { name: "Zilog", description: "Microcontrollers", logo: "/supplier-logos/zilog.png" },
    { name: "Zytronic", description: "Touch sensor technology", logo: "/supplier-logos/zytronic.png" },
  ],
}

export default function CataloguePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLetter, setSelectedLetter] = useState("A")
  const [activeTab, setActiveTab] = useState("brands")
  const letterRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const filteredBrands = searchTerm
    ? Object.values(brands)
        .flat()
        .filter((brand) => brand.toLowerCase().includes(searchTerm.toLowerCase()))
    : brands[selectedLetter] || []

  const filteredSuppliers = searchTerm
    ? Object.values(suppliers)
        .flat()
        .filter((supplier) => supplier.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : suppliers[selectedLetter] || []

  const scrollToLetter = (letter: string) => {
    setSelectedLetter(letter)
    if (letterRefs.current[letter]) {
      letterRefs.current[letter]?.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for the sticky header

      for (const letter of alphabet) {
        const element = letterRefs.current[letter]
        if (
          element &&
          element.offsetTop <= scrollPosition &&
          element.offsetTop + element.offsetHeight > scrollPosition
        ) {
          setSelectedLetter(letter)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="container mx-auto px-4 py-8 w-full max-w-[1400px]">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li className="text-gray-400 select-none">&gt;</li>
            <li className="text-gray-900">Catalogue</li>
          </ol>
        </nav>

        <Tabs defaultValue="brands" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="brands" className="flex-1">
              Brands
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex-1">
              Suppliers Line Card
            </TabsTrigger>
          </TabsList>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder={`Search ${activeTab === "brands" ? "brand" : "supplier"} ...`}
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Alphabet Navigation */}
          <div className="flex flex-wrap gap-2 sticky top-0 bg-gray-50 py-4 z-10">
            {alphabet.map((letter) => (
              <Button
                key={letter}
                variant={selectedLetter === letter ? "default" : "outline"}
                className="w-10 h-10 p-0"
                onClick={() => scrollToLetter(letter)}
              >
                {letter}
              </Button>
            ))}
          </div>

          <TabsContent value="brands" className="space-y-8">
            {searchTerm ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBrands.map((brand, index) => (
                  <Link
                    key={index}
                    href={`/catalogue/${brand.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {brand}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(brands).map(([letter, brandList]) => (
                  <div key={letter} ref={(el) => (letterRefs.current[letter] = el)}>
                    <h2 className="text-4xl font-bold text-green-500 mb-6">{letter}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                      {brandList.map((brand, index) => (
                        <Link
                          key={index}
                          href={`/catalogue/${brand.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                          className="text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {brand}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-8">
            {searchTerm ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredSuppliers.map((supplier, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="aspect-[3/2] relative mb-4">
                        <Image
                          src={supplier.logo || "/placeholder.svg"}
                          alt={supplier.name}
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>
                      <h3 className="font-semibold text-center mb-2">{supplier.name}</h3>
                      <p className="text-sm text-center text-gray-600">{supplier.description}</p>
                      <div className="text-center mt-4">
                        <Link
                          href={`/catalogue/supplier/${supplier.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          More | See Products
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-12">
                {Object.entries(suppliers).map(([letter, supplierList]) => (
                  <div key={letter} ref={(el) => (letterRefs.current[letter] = el)}>
                    <h2 className="text-4xl font-bold text-green-500 mb-6">{letter}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {supplierList.map((supplier, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="aspect-[3/2] relative mb-4">
                              <Image
                                src={supplier.logo || "/placeholder.svg"}
                                alt={supplier.name}
                                fill
                                className="object-contain rounded-lg"
                              />
                            </div>
                            <h3 className="font-semibold text-center mb-2">{supplier.name}</h3>
                            <p className="text-sm text-center text-gray-600">{supplier.description}</p>
                            <div className="text-center mt-4">
                              <Link
                                href={`/catalogue/supplier/${supplier.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                More | See Products
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

