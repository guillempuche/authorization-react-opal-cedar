export type IQuote = {
	id: string;
	text: string;
	author: string;
	private: boolean;
	creator: string;
};

export type ICreator = {
	id: string;
	name: string;
	premium?: boolean;
};
