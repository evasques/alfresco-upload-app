const api = require('./AlfrescoAPIManager');
const path = require('path');

const getTicket = async(username,password) => {
	const apiResponse = await api.login(username,password);
	if(apiResponse.entry){
		return apiResponse.entry.id;
	}
	if(apiResponse.error){
		throw new Error(apiResponse.error.briefSummary);
	}
}

const isTicketValid = async(ticket) => {
	const apiResponse = api.validateTicket(ticket);
	if(apiResponse.entry){
		return true;
	}
	return false;
}

const uploadToAlfresco = async(ticket,filePathUri) => {
	const filename = path.basename(filePathUri);
	const apiResponse = api.createContentNode(filename,ticket);
	let nodeId = "";
	if(apiResponse.entry){
		nodeId = apiResponse.entry.id;
	}
	if(apiResponse.error){
		throw new Error(apiResponse.error.briefSummary);
	}
}

export default {
  getTicket,
	isTicketValid,
	uploadToAlfresco
}
