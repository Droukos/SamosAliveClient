// @ts-nocheck
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import L, { LatLng } from "leaflet";
import polyline from "@mapbox/polyline";
import en from "@/plugins/i18n/locales/en-osrm.json";
import el from "@/plugins/i18n/locales/el-osrm.json";
import { OsmGeneral } from "@/types/osm";
import Steps = OsmGeneral.Steps;
import Routes = OsmGeneral.Routes;
import OsrmInstruction = OsmGeneral.OsrmInstruction;
import Maneuver = OsmGeneral.Maneuver;
import Lane = OsmGeneral.Lane;

export function decodePolyline(routeGeometry: string): LatLng[] {
  const cs = polyline.decode(routeGeometry, 5),
    result = new Array(cs.length);
  for (let i = cs.length - 1; i >= 0; i--) {
    result[i] = L.latLng(cs[i]);
  }
  return result;
}

function getLang(language: string) {
  return language === "en" ? en.v5 : el.v5;
}

export function formatDistance(d: number /* (meters) */, language: string) {
  const lang = getLang(language);
  if (d >= 1000) {
    return (d / 1000).toFixed(2) + " " + lang.units.kilometers;
  } else {
    return d.toFixed(2) + " " + lang.units.meters;
  }
}

function capitalizeFirstLetter(language: string, str: string) {
  return str.charAt(0).toLocaleUpperCase(language) + str.slice(1);
}

function camelCase(s: string) {
  const words = s.split(" ");
  let result = "";
  for (let i = 0, l = words.length; i < l; i++) {
    result += words[i].charAt(0).toUpperCase() + words[i].substring(1);
  }
  return result;
}

function leftOrRight(d: string) {
  return d.indexOf("left") >= 0 ? "Left" : "Right";
}

function ordinalize(language: string, num: number) {
  return getLang(language).constants.ordinalize[num.toString()] || "";
}

function directionFromDegree(language: string, degree: number) {
  const lang = getLang(language);

  if (!degree && degree !== 0) {
    return "";
  } else if (degree >= 0 && degree <= 20) {
    return lang.constants.direction.north;
  } else if (degree > 20 && degree < 70) {
    return lang.constants.direction.northeast;
  } else if (degree >= 70 && degree <= 110) {
    return lang.constants.direction.east;
  } else if (degree > 110 && degree < 160) {
    return lang.constants.direction.southeast;
  } else if (degree >= 160 && degree <= 200) {
    return lang.constants.direction.south;
  } else if (degree > 200 && degree < 250) {
    return lang.constants.direction.southwest;
  } else if (degree >= 250 && degree <= 290) {
    return lang.constants.direction.west;
  } else if (degree > 290 && degree < 340) {
    return lang.constants.direction.northwest;
  } else if (degree >= 340 && degree <= 360) {
    return lang.constants.direction.north;
  } else {
    throw new Error("Degree " + degree + " invalid");
  }
}

function laneConfig(step: Steps) {
  // Reduce any lane combination down to a contracted lane diagram
  if (!step.intersections || !step.intersections[0].lanes)
    throw new Error("No lanes object");

  const config: string[] = [];
  let currentLaneValidity: boolean | null = null;

  step.intersections[0].lanes.forEach(function(lane: Lane) {
    if (currentLaneValidity === null || currentLaneValidity !== lane.valid) {
      lane.valid ? config.push("o") : config.push("x");
      currentLaneValidity = lane.valid;
    }
  });
  return config.join("");
}

function tokenize(
  language: string,
  instruction: any,
  tokens: any,
  options: any
) {
  let startedWithToken = false;

  const output = instruction
    .replace(/{(\w+)(?::(\w+))?}/g, function(
      token: any,
      tag: any,
      grammar: any,
      offset: any
    ) {
      let value = tokens[tag];

      // Return unknown token unchanged
      if (typeof value === "undefined") {
        return token;
      }

      // If this token appears at the beginning of the instruction, capitalize it.
      if (offset === 0) {
        startedWithToken = true;
        value = capitalizeFirstLetter(language, value);
      }
      if (options && options.formatToken) {
        value = options.formatToken(tag, value);
      }
      return value;
    })
    .replace(/ {2}/g, " "); // remove excess spaces

  if (!startedWithToken) {
    return capitalizeFirstLetter(language, output);
  }
  return output;
}

function getWayName(language: any, step: any, options: any) {
  const classes = options ? options.classes || [] : [];
  if (!Array.isArray(classes))
    throw new Error("classes must be an Array or undefined");

  let wayName;
  let name = step.name || "";
  const ref = (step.ref || "").split(";")[0];

  // Remove hacks from Mapbox Directions mixing ref into name
  if (name === step.ref) {
    // if both are the same we assume that there used to be an empty name, with the ref being filled in for it
    // we only need to retain the ref then
    name = "";
  }
  name = name.replace(" (" + step.ref + ")", "");
  const lang = getLang(language);

  // In attempt to avoid using the highway name of a way,
  // check and see if the step has a class which should signal
  // the ref should be used instead of the name.
  const wayMotorway = classes.indexOf("motorway") !== -1;

  if (name && ref && name !== ref && !wayMotorway) {
    const phrase = lang.phrase["name and ref"];
    wayName = tokenize(
      language,
      phrase,
      {
        name: name,
        ref: ref
      },
      options
    );
  } else if (!name && ref) {
    wayName =
      options && options.formatToken ? options.formatToken("ref", ref) : ref;
  } else {
    wayName =
      options && options.formatToken ? options.formatToken("name", name) : name;
  }
  return wayName;
}

/**
 * Formulate a localized text instruction from a step.
 *
 * @param  {string} language           Language code.
 * @param  {object} step               Step including maneuver property.
 * @param  {object} opts               Additional options.
 * @param  {string} opts.legIndex      Index of leg in the route.
 * @param  {string} opts.legCount      Total number of legs in the route.
 * @param  {array}  opts.classes       List of road classes.
 * @param  {string} opts.waypointName  Name of waypoint for arrival instruction.
 *
 * @return {string} Localized text instruction.
 */
export function compile(language: string, step: Steps, opts: any) {
  if (!language) throw new Error("No language code provided");
  if (!language) throw new Error("No language code provided");
  const lang = getLang(language);
  if (!step.maneuver) throw new Error("No step maneuver provided");
  const options = opts || {};

  const type = step.maneuver.type;
  const modifier = step.maneuver.modifier;
  const mode = step.mode;
  const side = step.driving_side;

  if (!type) {
    throw new Error("Missing step maneuver type");
  }
  if (type !== "depart" && type !== "arrive" && !modifier) {
    throw new Error("Missing step maneuver modifier");
  }

  // Use special instructions if available, otherwise `defaultinstruction`
  let instructionObject;
  if (lang.modes[mode]) {
    instructionObject = lang.modes[mode];
  } else {
    const omitSide = type === "off ramp" && modifier.indexOf(side) >= 0;
    if (lang[type][modifier] && !omitSide) {
      instructionObject = lang[type][modifier];
    } else {
      instructionObject = lang[type].default;
    }
  }

  // Special case handling
  let laneInstruction;
  switch (type) {
    case "use lane":
      laneInstruction = lang.constants.lanes[laneConfig(step)];
      if (!laneInstruction) {
        // If the lane combination is not found, default to continue straight
        instructionObject = lang["use lane"].no_lanes;
      }
      break;
    case "rotary":
    case "roundabout":
      if (
        step.rotary_name &&
        step.maneuver.exit &&
        instructionObject.name_exit
      ) {
        instructionObject = instructionObject.name_exit;
      } else if (step.rotary_name && instructionObject.name) {
        instructionObject = instructionObject.name;
      } else if (step.maneuver.exit && instructionObject.exit) {
        instructionObject = instructionObject.exit;
      } else {
        instructionObject = instructionObject.default;
      }
      break;
    default:
  }

  // Decide way_name with special handling for name and ref
  const wayName = getWayName(language, step, options);

  // Decide which instruction string to use
  // In order of precedence:
  //   - exit + destination signage
  //   - destination signage
  //   - exit signage
  //   - junction name
  //   - road name
  //   - waypoint name (for arrive maneuver)
  //   - default
  let instruction;
  if (step.destinations && step.exits && instructionObject.exit_destination) {
    instruction = instructionObject.exit_destination;
  } else if (step.destinations && instructionObject.destination) {
    instruction = instructionObject.destination;
  } else if (step.exits && instructionObject.exit) {
    instruction = instructionObject.exit;
  } else if (step.junction_name && instructionObject.junction_name) {
    instruction = instructionObject.junction_name;
  } else if (wayName && instructionObject.name) {
    instruction = instructionObject.name;
  } else if (options.waypointName && instructionObject.named) {
    instruction = instructionObject.named;
  } else {
    instruction = instructionObject.default;
  }

  const destinations = step.destinations && step.destinations.split(": ");
  const destinationRef = destinations && destinations[0].split(",")[0];
  const destination =
    destinations && destinations[1] && destinations[1].split(",")[0];
  let firstDestination;
  if (destination && destinationRef) {
    firstDestination = destinationRef + ": " + destination;
  } else {
    firstDestination = destinationRef || destination || "";
  }

  const nthWaypoint =
    options.legIndex >= 0 && options.legIndex !== options.legCount - 1
      ? ordinalize(language, options.legIndex + 1)
      : "";

  // Replace tokens
  // NOOP if they don't exist
  const replaceTokens = {
    way_name: wayName,
    destination: firstDestination,
    exit: (step.exits || "").split(";")[0],

    exit_number: ordinalize(language, step.maneuver.exit || 1),
    rotary_name: step.rotary_name,
    lane_instruction: laneInstruction,
    modifier: lang.constants.modifier[modifier],
    direction: directionFromDegree(language, step.maneuver.bearing_after),
    nth: nthWaypoint,
    waypoint_name: options.waypointName,
    junction_name: (step.junction_name || "").split(";")[0]
  };

  return tokenize(language, instruction, replaceTokens, options);
}

function maneuverToInstructionType(maneuver: Maneuver, lastLeg: boolean) {
  switch (maneuver.type) {
    case "new name":
      return "Continue";
    case "depart":
      return "Head";
    case "arrive":
      return lastLeg ? "DestinationReached" : "WaypointReached";
    case "roundabout":
    case "rotary":
      return "Roundabout";
    case "merge":
    case "fork":
    case "on ramp":
    case "off ramp":
    case "end of road":
      return camelCase(maneuver.type);
    // These are all reduced to the same instruction in the current model
    //case 'turn':
    //case 'ramp': // deprecated in v5.1
    default:
      return camelCase(maneuver.modifier);
  }
}

function maneuverToModifier(maneuver: Maneuver) {
  let modifier = maneuver.modifier;

  switch (maneuver.type) {
    case "merge":
    case "fork":
    case "on ramp":
    case "off ramp":
    case "end of road":
      modifier = leftOrRight(modifier);
  }

  return modifier && camelCase(modifier);
}

export function directionIcon(type: string, modifier: string) {
  type = type.toLowerCase();
  if (modifier !== undefined) {
    modifier = modifier.toLowerCase();
  }
  switch (type) {
    case "continue":
      return "$arrowTop";
    case "head":
      return "$arrowTop";
    case "left":
      return "$arrowLeft";
    case "right":
      return "$arrowRight";
    case "roundabout":
      return "$roundabout";
    case "endofroad": {
      if (modifier == undefined) {
        return "";
      }
      if (modifier == "right") {
        return "$arrowRight";
      } else {
        return "$arrowLeft";
      }
    }
    case "sharpright":
      return "$arrowRight";
    case "sharpleft":
      return "$arrowLeft";
    case "slightright":
      return "$arrowTopRight";
    case "slightleft":
      return "$arrowTopLeft";
    case "waypointreached":
      return "$destination";
    case "destinationreached":
      return "$destination";
  }
}

export function convertRoute(responseRoute: Routes, lang: string) {
  const legNames = [],
    waypointIndices = [],
    legCount = responseRoute.legs.length,
    hasSteps = responseRoute.legs[0].steps.length > 0,
    result: OsrmInstruction = {
      name: "",
      coordinates: [],
      instructions: [],
      summary: {
        totalDistance: responseRoute.distance,
        totalTime: responseRoute.duration
      }
    };

  let index = 0;

  for (let i = 0; i < legCount; i++) {
    const leg = responseRoute.legs[i];
    legNames.push(
      leg.summary &&
        leg.summary.charAt(0).toUpperCase() + leg.summary.substring(1)
    );
    for (let j = 0; j < leg.steps.length; j++) {
      const step = leg.steps[j];
      const geometry = decodePolyline(step.geometry);
      const type = maneuverToInstructionType(step.maneuver, i === legCount - 1);
      const modifier = maneuverToModifier(step.maneuver);
      const text = compile(lang, step, { legCount: legCount, legIndex: i });

      result.coordinates.push(...geometry);
      if (type) {
        if (
          (i === 0 && step.maneuver.type === "depart") ||
          step.maneuver.type === "arrive"
        ) {
          waypointIndices.push(index);
        }

        result.instructions.push({
          type: type,
          distance: step.distance,
          time: step.duration,
          road: step.name,
          //direction: bearingToDirection(step.maneuver.bearing_after),
          direction: directionFromDegree(lang, step.maneuver.bearing_after),
          exit: step.maneuver.exit,
          index: index,
          mode: step.mode,
          modifier: modifier,
          text: text
        });
      }
      index += geometry.length;
    }
  }

  result.name = legNames.join(", ");
  if (!hasSteps) {
    result.coordinates = decodePolyline(responseRoute.geometry);
  } else {
    result.waypointIndices = waypointIndices;
  }

  return result;
}
