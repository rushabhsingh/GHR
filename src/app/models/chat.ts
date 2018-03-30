export interface Chat {
	id?: string;
	username : string;
	message : string;
}

export interface Location {
	id?: string;
	accept?: string;
	latitude : Number;
	longitude : Number;
	victim? : string;
	you? : string;
	reject? : string;
}
