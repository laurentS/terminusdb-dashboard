import React from "react"
import * as CONST from "../constants"

import * as display from "./displayHelper"


// NORMAL DATA TYPES
export function getUIDisplay (args, property, dataType) {

  function displayWidget (props) {
    // we pass ID at this point since we have sepratae IDs for normal dataTypes & for Sets/ List
    let id = props.idSchema["$id"]
    // normal data type inputa are being called here 
    // function expects input data and id of field into which user event occurs
    function handleChange(data) {
      if(props.onChange) props.onChange(data)
    }

    return display.displayDataTypesWidget(props, args, property, dataType, id, handleChange)
  }

  return { "ui:field": displayWidget }
}

// retrieves declaration for selected language
export function extractPropertyDocumentation(extractedDocumentation, selectedLanguage) {
  if(!Array.isArray(extractedDocumentation)) {
    throw new Error(`Expected extracted documentation to be an array, but instead got ${extractedDocumentation}`)
  }
  // includes multi lang support
  let filtered = extractedDocumentation.filter( arr => arr[CONST.SELECTED_LANGUAGE] === selectedLanguage)
  return filtered[0]
}

// SUBDOCUMENT UI
export function getSubDocumentUIDisplay (args, extracted, property, expanded) {

  // at this point extracted will have all of the extracted documents from linked_to
  function displaySubDocumentWidget(props) {
    return display.displaySubDocument(props, args, extracted, property, expanded)
  }
  
  return  { "ui:field": displaySubDocumentWidget }
}

// DOCUMENT LINKS UI  
export function getDocumentUIDisplay (args, extracted, property, linked_to) {
  
  function displayDocumentLinkWidget (props) {
    return display.displayDocumentLink(props, args, extracted, property, linked_to)
  }
  
  return  { "ui:field": displayDocumentLinkWidget }
}
  
// ENUM UI 
export function getEnumUIDisplay(args, property) {

  function displayEnumWidget(props) {
    return display.displayEnum(args, props, property) 
  }  

  return { "ui:field": displayEnumWidget }
}

// SYS:JSON 
export function getJSONUIDisplay(args, property) {
  
  function displayJSONWidget (props) {
    return display.displayJSON(props, args, property)
  }

  return { "ui:field": displayJSONWidget }
}

// Choice Sub documents
export function getChoiceSubDocumentUIDisplay(args, property) {
  function displayChoiceSubDocumentWidget (props) {
    return display.displayChoiceSubDocument(props, args, property)
  }

  return { "ui:field": displayChoiceSubDocumentWidget }
}
 