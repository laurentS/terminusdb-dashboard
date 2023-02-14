import React,{useState,useEffect} from "react";
import { DocumentsGraphqlList } from "./DocumentsGraphqlList";
import { DocumentWoqlTable } from "../components/DocumentsWoqlTable";
import {WOQLClientObj} from '../init-woql-client'
import { useParams } from "react-router-dom"
import { DocumentControlObj } from "../hooks/DocumentControlContext";

export const DocumentsPageList = () => {
    const {type} = useParams()
    const {woqlClient} = WOQLClientObj()
    const {documentTablesConfig, getGraphqlTableConfig,loading} = DocumentControlObj()
    if(!woqlClient) return ""

    const viewGraphql = documentTablesConfig && documentTablesConfig.objQuery[type].query

    useEffect(() => {
        if(documentTablesConfig === null) getGraphqlTableConfig()
    },[])

    if(loading) return <div>LOADING</div>
    if(viewGraphql) return <DocumentsGraphqlList/>
    return <DocumentWoqlTable/>
}