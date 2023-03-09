/*import * as typeHelper from "./helpers/typeHelper"
import * as infoHelper from "./helpers/infoHelper"
import * as metaDataHelper from "./helpers/metaDataHelper"
import * as formatHelper from "./helpers/formatHelper"
import * as propertyHelper from "./helpers/propertyHelper"
import * as util from "./utils"
import * as dataProvider from "./helpers/formDataHelper"
import {generateUI} from "./helpers/uiHelper"*/
import * as CONST from "./constants"
import * as util from "./utils"
import { uiHelper } from "./helpers/uiHelper"
import { getPlaceholder } from "./helpers/placeholderHelper"
import { typeHelper } from "./helpers/typeHelper"

/**
 * 
 * @param {*} frame - frame of document
 * @param {*} item - property 
 * @param {*} uiFrame - custom UI to change appearance
 * @param {*} mode - mode in which FrameViewer is being called
 * @param {*} formData - filled data to be displayed in form 
 * @param {*} documentation - formData - filled data to be displayed in form 
 * @returns a data field 
 */
export function makeMandatoryFrames (args, property) {
    
  let { documentFrame, fullFrame } = args

    let placeholder=getPlaceholder(args.documentFrame[property]) 

    /** gather layout of property  */ 
    let layout = { 
			"type": typeHelper(documentFrame, property, fullFrame),
      "title": property,
      [CONST.PLACEHOLDER]: placeholder,
      //[CONST.METADATA]: util.fetchMetaData(documentFrame, property)
    } 

		let uiLayout = uiHelper(args, property)
   
    return { layout, uiLayout }
}
