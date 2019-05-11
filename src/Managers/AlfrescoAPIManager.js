import HttpManager from '@managers/HttpManager';

import { encode as btoa } from 'base-64';
import { Buffer } from 'buffer'
import { FileSystem } from 'expo';

const TICKET_PARAM = "alf_ticket";
const TYPE_CONTENT = "cm:content";
const CONTENT_TYPE_JSON = "application/json";
const CONTENT_TYPE_OCTET_STREAM = "application/octet-stream";

let ALFRESCO_SERVER;

/**
 * Sets the Alfresco address
 */
const setAddress = (address) => {
	ALFRESCO_SERVER = address;
}

/**
 * Obtains an Alfresco ticket
 */
const login = async(username,password) => {
	const uri = _getAuthUri("/tickets");
	const headers = [
		{ name : "Content-Type", value : CONTENT_TYPE_JSON }
	];
	let body = {
    userId: username,
    password: password
	};
	return HttpManager.post(uri, _composeHeader(null,headers), JSON.stringify(body));
}

/**
 * Validates the supplied ticket
 */
const validateTicket = async(ticket) => {
	const uri = _getAuthUri("/tickets/-me-");
	return HttpManager.get(uri, _composeHeader(ticket));
}

/**
 * Creates a content node
 */
const createContentNode = async(name,ticket) => {
	const uri = _getCoreUri("/nodes/-my-/children");
	const body = {
	  name : name,
	  nodeType : TYPE_CONTENT
	};
	const headers = [
		{ name : "Content-Type", value : CONTENT_TYPE_JSON }
	];
	return HttpManager.post(uri, _composeHeader(ticket,headers), JSON.stringify(body));
}

/**
 * Uploads the content for supplied nodeId
 */
const uploadContentNode = async(nodeId, base64, ticket) => {
	const uri = _getCoreUri("/nodes/" + nodeId + "/content");
	const headers = [
		{ name : "Content-Type", value : CONTENT_TYPE_OCTET_STREAM },
	];
	const content = new Buffer.from( base64, 'base64');
	return HttpManager.put(uri, _composeHeader(ticket,headers), content);
}

/**
 * Builds the auth API uri
 */
_getAuthUri = (uri,ticket) => {
	return ALFRESCO_SERVER + "/alfresco/api/-default-/public/authentication/versions/1" + uri;
}

/**
 * Builds the core API uri
 */
_getCoreUri = (uri,ticket) => {
	return ALFRESCO_SERVER + "/alfresco/api/-default-/public/alfresco/versions/1" + uri;
}

/**
 * Builds the request headers
 */
_composeHeader = (ticket, headers) => {

	let finalHeaders = {};

	if (headers) {
		headers.forEach(header => {
		  finalHeaders[header.name] = header.value;
		});
	}

	if (ticket) {
		finalHeaders.Authorization =  "Basic " + btoa(ticket);
	}

	finalHeaders.Accept = CONTENT_TYPE_JSON;

	return finalHeaders;
}

export default {
	setAddress,
  login,
	validateTicket,
	createContentNode,
	uploadContentNode
}
