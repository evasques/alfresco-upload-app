const HttpManager = require('./HttpManager');
const btoa = require('btoa');
const fs = require('fs');

const TICKET_PARAM = "alf_ticket";
const TYPE_CONTENT = "cm:content";
const ALFRESCO_SERVER = "http://192.168.1.81:8080"
const CONTENT_TYPE_JSON = "application/json";
const CONTENT_TYPE_OCTET_STREAM = "application/octet-stream";


const login = async(username,password) => {
	const uri = _getAuthUri("/tickets");
	const header = {};
	let body = {
    userId: username,
    password: password
	};

	return HttpManager.post(uri, header, body);
}

const validateTicket = async(ticket) => {
	const uri = _getAuthUri("/tickets/-me-");
	return HttpManager.get(uri, _composeHeader(ticket));
}

const createContentNode = async(name,ticket) => {
	const uri = _getCoreUri("/nodes/-my-/children");
	const body = {
	  name : name,
	  nodeType : TYPE_CONTENT
	}
	const headers = [
		{ name : "Content-Type", value : CONTENT_TYPE_JSON }
	]
	return HttpManager.post(uri, _composeHeader(ticket,headers),body);
}

const uploadContentNode = async(nodeId,filePathUri,ticket) => {
	const uri = _getCoreUri("/nodes/" + nodeId + "/content");

	const stats = fs.statSync(filePathUri);
	const fileSize = stats.size;
	let readStream = fs.createReadStream(filePathUri);

	const headers = [
		{ name : "Content-Type", value : CONTENT_TYPE_OCTET_STREAM },
		{ name : "Content-length", value : fileSize },
	]
	return HttpManager.post(uri, _composeHeader(ticket,headers), readStream);
}


_getAuthUri = (uri,ticket) => {
	return ALFRESCO_SERVER + "/alfresco/api/-default-/public/authentication/versions/1" + uri;
}

_getCoreUri = (uri,ticket) => {
	return ALFRESCO_SERVER + "/alfresco/api/-default-/public/alfresco/versions/1" + uri;
}

_composeHeader = (ticket,headers) => {
	let finalHeaders = {};
	if(headers){
		headers.forEach(header => {
		  finalHeaders[header.name] = header.value;
		});
	}
	finalHeaders.Authorization =  "Basic " + btoa(ticket);
	return finalHeaders;
}

export default {
  login,
	validateTicket,
	createContentNode
}