import React, {useState}  from "react";
import {Stack,Card,Button} from "react-bootstrap"
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
import * as CONST from "./components/constants"
import {ViewFramesButton} from "./components/ViewFramesButton"
import {CloseButton} from "./components/CloseButton"
import {JsonFrameViewer} from "./components/JsonFrameViewer"
import {ToggleJsonAndFormControl} from "./components/ToggleJsonAndFormControl"
import {ViewDocumentFrames} from "./components/ViewDocumentFrames"
import {CopyButton} from "./components/CopyButton"
import {RiDeleteBin7Line} from "react-icons/ri"
import {TraverseDocumentLinks, onTraverse} from "./components/TraverseDocumentLinks"
// we have to fix traversedocklinek
export const ViewDocumentComponent = ({type,getDocumentById,selectedDocument,frames,closeButtonClick,documentID,deleteDocument,editDocument}) => {
    const [view, setView] = useState(CONST.FORM_VIEW)
    const [clicked, setClicked]=useState(false)
    const [showFrames, setShowFrames] = useState(false)

    function handleTraverse (documentID) {
        onTraverse(documentID, setClicked)
    }

    return  <div className="w-100 d-flex">     
            {clicked && <TraverseDocumentLinks 
                    getDocumentById={getDocumentById} 
                    clicked={clicked} 
                    frames={frames}
                    show={clicked!==false} 
                    onHide={() => setClicked(false)}/>} 
            <Card className="mr-3 bg-dark flex-grow-1">
            <Card.Header className="justify-content-between d-flex w-100 text-break">
            <Stack direction="horizontal" gap={3} className="w-100">
            <div className="col-md-6"> 
                <strong className="text-success">
                    <span className="mr-1 h6 fst-italic">{CONST.VIEW_DOCUMENT}:</span> 
                    <span className="fw-bolder h6"> {documentID} </span>
                </strong>
                <CopyButton text={`${documentID}`} title={`Copy Document ID`}/>
             </div>
                <ViewFramesButton setShowFrames={setShowFrames}/>
                <ToggleJsonAndFormControl onClick={setView}/>
                <div className="d-flex">
                    <Button variant="light"  type="button"  title="Edit Document"  onClick={editDocument} className="btn-sm btn d-flex text-dark mr-2">
                        Edit
                    </Button>
                    <Button variant="danger" type="button" title="Delete Document" onClick={deleteDocument}className="btn-sm btn text-gray">
                        <RiDeleteBin7Line className=" mb-1"/>
                    </Button>
                </div>
                <CloseButton type={type} onClick={closeButtonClick}/>
            </Stack>
            </Card.Header>
            <Card.Body className="text-break">
            {view === CONST.JSON_VIEW && 
                 <JsonFrameViewer jsonData={selectedDocument} mode={CONST.VIEW_DOCUMENT}/>
            }
            {view === CONST.FORM_VIEW && 
            <FrameViewer frame={frames}
                    type={type}
                    mode={CONST.VIEW_DOCUMENT}
                    formData={selectedDocument}
                    hideSubmit={true}
                    onTraverse={handleTraverse}
            />
            }
            </Card.Body>
        </Card>
        {showFrames && 
        <ViewDocumentFrames
            type={type}
            documentFrame={frames[type] || {}}
            setShowFrames={setShowFrames}
       />}
    </div>
      
}