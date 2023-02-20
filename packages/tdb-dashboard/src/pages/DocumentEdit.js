import React, {useEffect, useState}  from "react";
import {WOQLClientObj} from '../init-woql-client'
import Card from "react-bootstrap/Card"
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
import * as CONST from "../components/constants"
import { useNavigate, useParams } from "react-router-dom";
import {EditHeader, SearchComponent, ErrorMessageReport} from "../components/DocumentComponents"
import {JsonFrameViewer} from "../components/JsonFrameViewer"
import {Loading} from "../components/Loading"
import {DocumentControlObj} from "../hooks/DocumentControlContext"
import {CreateChangeRequestModal} from "../components/CreateChangeRequestModal"
import {decodeUrl} from "../components/utils"

//__KITTY
/*const checkIfPrefix =(id)=>{
    if(id.indexOf(":")>-1){
        return id
    }
    return "@schema:"+id
}

const onSelect = async (inp, type) => {
    const { 
        woqlClient
    } = WOQLClientObj()

    let WOQL =  TerminusClient.WOQL
    var docType=checkIfPrefix(type)
    let q = WOQL.isa("v:Documents", docType)
    const results = await q.execute(woqlClient)
        .then((response) => {
            let options = []
            if(inp){
                response.bindings.map(thing => {
                    if(thing["Documents"].toUpperCase().includes(inp.toUpperCase())){
                        options.push({value: thing["Documents"], label: thing["Documents"]})
                    }
                })
            }
            else {
                response.bindings.map(thing => {
                    options.push({value: thing["Documents"], label: thing["Documents"]})
                })
            }
            return options
        })
        .catch((error) => {
            console.log("query run error", error)
        })
    return results
}*/

const DisplayDocumentBody = () => {
    const {
        view,
        jsonContent,
        frames,
        selectedDocument,
        setJsonContent,
        updateDocument,
        getDocument
    } = DocumentControlObj()

    const navigate = useNavigate()
    const {type, docid} = useParams()
    let documentID=decodeUrl(docid)
    
    // constants for extracted data 
   // const [extracted, setExtracted]=useState(false)
    // constants to store document data 
   // const [data, setData]=useState(false)

     const  callUpadateDocument = async (jsonDoc) =>{
        const docUp = await updateDocument(jsonDoc)
        if(docUp){
            getDocument(documentID)
            navigate(-1)
        }
   }

    /*useEffect(() => {
        if(jsonContent) setData(jsonContent)
    }, [jsonContent])*/
    // function which extracts data from document form 


    if(!selectedDocument || !frames) return  <Loading message={`Fetching ${documentID} ...`}/>

    // JSON View
    if(view === CONST.JSON_VIEW) {
        return <JsonFrameViewer jsonData={selectedDocument} setExtracted={callUpadateDocument} mode={CONST.EDIT_DOCUMENT}/>
    }

    // Form View
    return <FrameViewer frame={frames}
        type={type}
        mode={CONST.EDIT_DOCUMENT}
        onSubmit={callUpadateDocument}
        //onChange={handleChange}
        onSelect={<SearchComponent/>}   
        formData={selectedDocument}
        hideSubmit={false}
        //onTraverse={onTraverse}
    />
}

export const DocumentEdit = () => {   
    const { 
        setChangeRequestBranch, branch
    } = WOQLClientObj()

    const {type, docid:id} = useParams()
    let documentID=decodeUrl(id)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if(branch === "main"){
            setShowModal(true)
        }
	},[branch])
  

    const updateViewMode =(newBranchName, changeRequestId)=>{
        setChangeRequestBranch(newBranchName, changeRequestId)
    }
 
    return <main className="content w-100 document__interface__main">
        
        <ErrorMessageReport/>
        {showModal && <CreateChangeRequestModal showModal={showModal}
                type={type} 
                setShowModal={setShowModal} 
                updateViewMode={updateViewMode}/>}
        {branch !== "main" && <Card className="mr-3 bg-dark">
            <Card.Header className="justify-content-between d-flex w-100 text-break">
                <EditHeader mode={CONST.EDIT_DOCUMENT} id={documentID} type={type}/>
            </Card.Header>
            <Card.Body className="text-break">
                <DisplayDocumentBody/>
            </Card.Body>
        </Card>}
    </main>
}
