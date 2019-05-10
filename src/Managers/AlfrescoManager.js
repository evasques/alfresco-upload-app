import API from '@managers/AlfrescoAPIManager';

const path = require('path');

const getTicket = async(username,password) => {
	const apiResponse = await API.login(username,password);
	if(apiResponse.entry){
		return apiResponse.entry.id;
	}
	if(apiResponse.error){
		throw new Error(apiResponse.error.briefSummary);
	}
}

const isTicketValid = async(ticket) => {
	const apiResponse = await API.validateTicket(ticket);
	if(apiResponse.entry){
		return true;
	}
	return false;
}

const uploadToAlfresco = async(filePathUri,base64,ticket) => {
	const filename = path.basename(filePathUri);
	const createNodeResponse = await API.createContentNode(filename,ticket);
	if(createNodeResponse.entry){
		let nodeId = createNodeResponse.entry.id;
		const uploadNodeResponse = await API.uploadContentNode(nodeId,base64,ticket);

		if(uploadNodeResponse.entry){
			return createNodeResponse.entry.id;
		}
		if(uploadNodeResponse.error){
			throw new Error(createNodeResponse.error.briefSummary);
		}

	}
	if(createNodeResponse.error){
		throw new Error(createNodeResponse.error.briefSummary);
	}
}

export default {
  getTicket,
	isTicketValid,
	uploadToAlfresco
}
